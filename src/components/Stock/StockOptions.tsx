import React, { useState, useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import SearchBar from '../common/Stock/SearchBar';
import { stocksDatas } from '../../api/stocks';
import logoImg from '../../assets/logo.svg';
import { StockDataResultType } from '../../types/stocks_product';
import { addCombiStocks } from '../../store/reducers/stocks/stocks';
import AlertModal from '../common/Stock/AlertModal';

const Container = styled.div`
  ${tw`w-full h-[450px] flex flex-col items-center p-3 gap-3`}
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
  ${tw`flex flex-row justify-between`}
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
}

const StockOptions: React.FC<StockOptionsProps> = ({ dividendMonth }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const combiStocks = useSelector((state: RootState) => state.stocks);
  
  const currentCombination = `combination${dividendMonth}` as "combination1" | "combination2" | "combination3";

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stockList, setStockList] = useState<StockDataResultType[]>([]);

  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    stocksDatas({
      searchWord: searchTerm,
      safeScore: user.user.safeScore,
      dividendScore: user.user.dividendScore,
      growthScore: user.user.growthScore,
      dividendMonth: dividendMonth,
      page: page,
      size: 24,
    }).then((response)=>{
      setStockList(response.data.response);
    });
  }, [page, searchTerm]);

  const handleUpdateCombination = (stockId:number, exchange:string):void =>{
    if(combiStocks[currentCombination].stocks.length >= 2){
      setAlertOpen(true);
    }
    else {
      dispatch(addCombiStocks({combination:currentCombination,stockId:stockId,exchange:exchange}));
      
    }
  } 

  const handleAlertClose = () => {
    setAlertOpen(false);
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
      <StockItems>
        {stockList.map((stock) => {
          return (
            <StockInfo key={stock.id} onClick={() => {handleUpdateCombination(stock.id, stock.exchange)}}>
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
      {alertOpen && <AlertModal onClose={handleAlertClose} message='최대 2개의 종목을 추가할 수 있습니다.' />}
    </Container>
  );
};

export default StockOptions;
