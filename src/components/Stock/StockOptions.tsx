import React, { useState, useEffect, useRef } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import SearchBar from '../common/Stock/SearchBar';
import { stocksDatas } from '../../api/stocks';
import logoImg from '../../assets/logo.svg';
import { StockDataResultType } from '../../types/stocks_product';
import {
  addCombi1Stock,
  addCombi2Stock,
  addCombi3Stock,
  addCombiStocks,
} from '../../store/reducers/stocks/stocks';
import AlertModal from '../common/Stock/AlertModal';

const Container = styled.div`
  ${tw`w-full h-[450px] flex flex-col items-center py-3 gap-3`}
`;
const StockItems = styled.div`
  ${tw`w-full flex-col flex flex-1 overflow-y-auto gap-2`}
`;
const StockInfo = styled.div`
  ${tw`flex h-10 items-center justify-between p-3`}
`;

const StockLogo = styled.img`
  ${tw`w-10 h-10 rounded-full`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-row justify-between items-center`}
`;

const MainText = styled.span`
  ${tw`text-sm`}
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col content-between ml-3`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 9rem;
`;

const SubContainer = styled.div`
  ${tw`flex flex-row text-xs`}
`;
const SubText = styled.span`
  ${tw`mt-1 mr-1`}
`;

const PriceContainer = styled.div`
  ${tw`flex items-center`}
`;

const PriceText = styled.span`
  ${tw`text-sm`}
`;

interface StockOptionsProps {
  dividendMonth: number;
  onClose: () => void;
}

const StockOptions: React.FC<StockOptionsProps> = ({
  dividendMonth,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const combiStocks = useSelector((state: RootState) => state.stocks);

  const currentCombination = `combination${dividendMonth}` as
    | 'combination1'
    | 'combination2'
    | 'combination3';

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stockList, setStockList] = useState<StockDataResultType[]>([]);

  const [alertOpen, setAlertOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const stdRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setPage(0);
    setStockList([]);
    fetchStocks(0);
  }, [searchTerm]);

  useEffect(() => {
    const handleOnScroll = () => {
      if (ref.current && stdRef.current) {
        const item = ref.current.getBoundingClientRect();
        const container = stdRef.current.getBoundingClientRect();

        if (item.bottom - 180 <= container.bottom) {
          fetchStocks(page);
        }
      }
    };

    const scrollElement = stdRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleOnScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleOnScroll);
      }
    };
  }, [page, searchTerm]);

  const fetchStocks = (pageNum: number) => {
    stocksDatas({
      searchWord: searchTerm,
      userId: user.user.id,
      dividendMonth: null,
      page: pageNum,
      size: 10,
    }).then((response) => {
      const newStocks = response.data.response;
      const uniqueStocks = Array.from(new Set([...stockList, ...newStocks].map(stock => stock.id)))
        .map(id => [...stockList, ...newStocks].find(stock => stock.id === id)!);

      setPage(pageNum + 1);
      setStockList(uniqueStocks);
    });
  };

  const handleUpdateCombination = (stock: StockDataResultType) => {
    const data = {
      stockId: stock.id,
      name: stock.name,
      symbol: stock.symbol,
      price: stock.closePrice,
      quantity: 1,
      dividend: stock.dividendMonth,
      exchange: stock.exchange,
      dividendYieldTtm: stock.dividendYieldTtm,
    };
    if (dividendMonth === 1) {
      dispatch(addCombi1Stock(data));
      onClose();
    } else if (dividendMonth === 2) {
      dispatch(addCombi2Stock(data));
      onClose();
    } else {
      dispatch(addCombi3Stock(data));
      onClose();
    }
  };

  const isKRStock = (symbol: string): boolean => {
    // 모든 문자가 숫자인지 확인
    return /^[0-9]+$/.test(symbol);
  };

  const getImageUrl = (symbol: string) => {
    const krStock = isKRStock(symbol);
    return `https://file.alphasquare.co.kr/media/images/stock_logo/${krStock ? 'kr' : 'us'}/${symbol}.png`;
  };

  return (
    <Container>
      <SearchBar setSearchTerm={setSearchTerm} modal={false} />
      <StockItems ref={stdRef}>
        {stockList.map((stock) => {
          return (
            <StockInfo
              key={stock.id}
              onClick={() => {
                handleUpdateCombination(stock);
              }}
            >
              <ItemContainer>
                <StockLogo
                  src={getImageUrl(stock.symbol)}
                  onError={(e) => {
                    e.currentTarget.src = logoImg;
                  }}
                />
                <InfoContainer>
                  <MainText>{stock.name}</MainText>
                  <SubContainer>
                    <SubText>{stock.symbol}</SubText>
                    <SubText>{stock.exchange}</SubText>
                  </SubContainer>
                </InfoContainer>
                <div ref={ref}></div>
              </ItemContainer>
              <PriceContainer>
                <PriceText>
                  배당률 {stock.dividendYieldTtm.toFixed(2)}%
                </PriceText>
              </PriceContainer>
            </StockInfo>
          );
        })}
      </StockItems>
    </Container>
  );
};

export default StockOptions;
