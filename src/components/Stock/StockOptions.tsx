import React, { useState, useEffect, useCallback } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import SearchBar from '../common/Stock/SearchBar';
import { getStocksDatas } from '../../store/reducers/stocks/stocks';
import logoImg from '../../assets/logo.svg';

const Container = styled.div`
  ${tw`w-full h-[450px] flex flex-col items-center p-3`}
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
  const stockList = useSelector((state: RootState) => state.stocks.datas);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadMoreStocks = useCallback(async () => {
    if (isLoading || !hasMore) return;

    const requestData = {
      userInvestmentType: 0,
      safeScore: 33,
      dividendScore: 33,
      growthScore: 33,
      dividendMonth: dividendMonth,
      page: page,
      size: 24,
    };
    setIsLoading(true);

    try {
      const resultAction = await dispatch(getStocksDatas(requestData)).unwrap();
  
      if (resultAction.data.response.length === 0) {
        setHasMore(false);
      } else {
        console.log(page);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, isLoading, hasMore, page,dividendMonth]);

  useEffect(() => {
    loadMoreStocks();
  }, []);

  // const handleSelect = (stock:Stock) => {
  //   onStockSelect(stock);
  // };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
    
  const filteredList = stockList.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <SearchBar onSearch={handleSearch} modal={true} />
      <StockItems>
        {filteredList.map((stock) => {
          const isKRStock = stock.symbol.slice(-3) === '.ks';
          const displaySymbol = isKRStock ? stock.symbol.slice(0, -3) : stock.symbol;
          return (
            <StockInfo key={stock.id}>
              <ItemContainer>
              <StockLogo
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/${isKRStock ? 'kr' : 'us'}/${stock.symbol}.png`}
                  onError={(e) => {
                    e.currentTarget.src = logoImg;
                  }}
                />
                <InfoContainer>
                  <MainText>{stock.name}</MainText>
                  <SubContainer>
                    <SubText>{displaySymbol}</SubText>
                    <SubText>{stock.exchange}</SubText>
                  </SubContainer>
                </InfoContainer>
              </ItemContainer>
              <PriceContainer>
                <PriceText>
                  {isKRStock
                    ? `${stock.dividendYieldTtm.toFixed(2)} 원`
                    : `$${stock.dividendYieldTtm.toFixed(2)}`}
                  ({stock.dividendYieldTtm.toFixed(2)}%)
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
