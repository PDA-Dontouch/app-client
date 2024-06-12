import React,{useState, useEffect} from 'react';
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import tw, { styled } from 'twin.macro';
import SearchBar from '../common/Stock/SearchBar';
import { getStocksDatas } from "../../store/reducers/stocks/stocks";

interface Stock {
  code: string;
  name: string;
  market: string;
  price: number;
  dividend_rate: number;
  image: string;
}

// interface StockOptionsProps {
//   onStockSelect: (stock: Stock) => void;
//   closeModal: () => void;
// }

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

const initialStockList: Stock[]= [
  {
    code: '005930',
    name: '삼성전자',
    market: 'KSC',
    image:
      'https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png',
    price: 63000,
    dividend_rate: 3.64,
  },
  {
    code: '035420',
    name: '네이버',
    market: 'KSC',
    image:
      'https://file.alphasquare.co.kr/media/images/stock_logo/kr/035420.png',
    price: 171300,
    dividend_rate: 3.64,
  },
  {
    code: 'AAPL',
    name: '애플',
    market: 'NASDAQ',
    image: 'https://file.alphasquare.co.kr/media/images/stock_logo/us/AAPL.png',
    price: 196.88,
    dividend_rate: 3.64,
  },
  {
    code: 'TSLA',
    name: '테슬라',
    market: 'NASDAQ',
    image: 'https://file.alphasquare.co.kr/media/images/stock_logo/us/TSLA.png',
    price: 177.42,
    dividend_rate: 3.64,
  },
  {
    code: '035720',
    name: '카카오',
    market: 'KSC',
    image:
      'https://file.alphasquare.co.kr/media/images/stock_logo/kr/035720.png',
    price: 43400,
    dividend_rate: 3.64,
  },
  {
    code: '000660',
    name: 'SK하이닉스',
    market: 'KSC',
    image:
      'https://file.alphasquare.co.kr/media/images/stock_logo/kr/000660.png',
    price: 208000,
    dividend_rate: 3.64,
  },{
    code: '005930',
    name: '삼성전자',
    market: 'KSC',
    image:
      'https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png',
    price: 63000,
    dividend_rate: 3.64,
  },
  {
    code: '035420',
    name: '네이버',
    market: 'KSC',
    image:
      'https://file.alphasquare.co.kr/media/images/stock_logo/kr/035420.png',
    price: 171300,
    dividend_rate: 3.64,
  },
  {
    code: 'AAPL',
    name: '애플',
    market: 'NASDAQ',
    image: 'https://file.alphasquare.co.kr/media/images/stock_logo/us/AAPL.png',
    price: 196.88,
    dividend_rate: 3.64,
  },
  {
    code: 'TSLA',
    name: '테슬라',
    market: 'NASDAQ',
    image: 'https://file.alphasquare.co.kr/media/images/stock_logo/us/TSLA.png',
    price: 177.42,
    dividend_rate: 3.64,
  }
];

const StockOptions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [stockList, setStockList] = useState<Stock[]>(initialStockList);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(getStocksDatas());
  }, [])

  // const handleSelect = (stock:Stock) => {
  //   onStockSelect(stock);
  // };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
      const filteredList = initialStockList.filter(stock =>
        stock.name.toLowerCase().includes(term.toLowerCase()) || 
        stock.code.toLowerCase().includes(term.toLowerCase())
      );
      setStockList(filteredList);
    
  };

  return (
    <Container>
      <SearchBar onSearch={handleSearch} modal={true}/>
      <StockItems>
        {initialStockList.map((stock) => (
          <StockInfo key={stock.code} >
            <ItemContainer>
              <StockLogo src={stock.image} />
              <InfoContainer>
                <MainText>{stock.name}</MainText>
                <SubContainer>
                  <SubText>{stock.code}</SubText>
                  <SubText>{stock.market}</SubText>
                </SubContainer>
              </InfoContainer>
            </ItemContainer>

            <PriceContainer>
              <PriceText>
                {stock.price
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                원 (
                {stock.dividend_rate
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                %)
              </PriceText>
            </PriceContainer>
          </StockInfo>
        ))}
      </StockItems>
    </Container>
  );
};

export default StockOptions;