import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import tw, { css, styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import RecommendBar from '../../components/common/Stock/RecommendBar';
import CombiBox from '../../components/common/Stock/CombiBox';
import StockCard from '../../components/common/Stock/StockCard';
import Triangle from '../../assets/triangle.svg';
import SearchImg from '../../assets/search.svg';

import {
  delStocksLike,
  getStocksDatas,
  setStocksLike,
} from '../../store/reducers/stocks/stocks';
import { setSelectCode } from '../../store/reducers/stocks/trading';
import { useNavigate } from 'react-router-dom';
import { leaveRoom } from '../../store/webSocket/nowPrice';

const stockData = {
  combination1: {
    diviend_income: 0,
    stocks: [
      {
        code: '001',
        name: '삼성전자',
        price: 50000,
        amount: 100,
        total_price: 5000000,
        growth_score: 60,
        safe_score: 70,
        dividend_score: 80,
        personalized_score: 90,
      },
      {
        code: '002',
        name: '카카오',
        price: 150000,
        amount: 200,
        total_price: 30000000,
        growth_score: 65,
        safe_score: 75,
        dividend_score: 85,
        personalized_score: 95,
      },
    ],
  },
  combination2: {
    diviend_income: 0,
    stocks: [
      {
        code: '003',
        name: '네이버',
        price: 300000,
        amount: 70,
        total_price: 21000000,
        growth_score: 70,
        safe_score: 80,
        dividend_score: 90,
        personalized_score: 85,
      },
    ],
  },
  combination3: {
    diviend_income: 0,
    stocks: [
      {
        code: '004',
        name: '테슬라',
        price: 700000,
        amount: 100,
        total_price: 70000000,
        growth_score: 75,
        safe_score: 85,
        dividend_score: 95,
        personalized_score: 100,
      },
      {
        code: '005',
        name: '애플',
        price: 1500000,
        amount: 20,
        total_price: 30000000,
        growth_score: 80,
        safe_score: 90,
        dividend_score: 100,
        personalized_score: 95,
      },
    ],
  },
};

const stockList = [
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
    name: '애플',
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
];

const MainContainer = styled.div`
  ${tw`flex flex-col min-h-screen overflow-y-auto`}
`;

const ContentContainer = styled.div`
  ${tw`flex-1 p-4 mt-15`}
`;

const TextContainer = styled.div`
  ${tw`flex justify-end mt-3 mr-4 gap-1`}
`;

const SectionHeader = styled.div`
  ${tw`flex gap-4 my-4 pl-2 mt-7`}
`;

const MainTab = styled.span`
  ${tw` text-lg cursor-pointer`}
`;
const SubTab = styled(MainTab)`
  ${css`
    color: rgba(0, 0, 0, 0.4);
  `}
`;

const NextText = styled.span`
  ${tw`text-base`}
`;

const CombiBoxContainer = styled.div`
  ${tw`top-1 p-6 rounded-lg relative `}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const NavImage = styled.img`
  ${tw`w-3 h-3 mt-1`}
`;

const SearchContainer = styled.div`
  ${tw`flex justify-end mt-2 mb-2 gap-1`}
`;

const SearchImage = styled.img`
  ${tw`w-6 h-6`}
`;

const StockMainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'recommend' | 'individual'>(
    'recommend',
  );
  const [stockItems, setStockItems] = useState(stockList);
  const [likeStocks, setLikeStocks] = useState<string[]>([]);
  const selectCode = useSelector(
    (state: RootState) => state.trading.selectCode,
  );

  useEffect(() => {
    dispatch(getStocksDatas());
  }, []);

  const handleTabClick = (tab: 'recommend' | 'individual') => {
    setActiveTab(tab);
  };

  const setLike = (stocks_id: string) => {
    if (likeStocks.includes(stocks_id)) {
      setLikeStocks(likeStocks.filter((id) => id !== stocks_id));
      dispatch(delStocksLike(stocks_id));
    } else {
      setLikeStocks([...likeStocks, stocks_id]);
      dispatch(setStocksLike(stocks_id));
    }
  };

  useEffect(() => {
    leaveRoom(selectCode);
  }, []);

  return (
    <MainContainer>
      <Navbar name="박유진" type="main" onClick={() => {}} />
      <ContentContainer>
        <RecommendBar />
        <TextContainer>
          <NextText>갱신하기</NextText>
          <NavImage src={Triangle} />
        </TextContainer>
        {activeTab === 'recommend' ? (
          <div className="flex flex-col space-y-4">
            <SectionHeader>
              <MainTab onClick={() => handleTabClick('recommend')}>
                추천 조합
              </MainTab>
              <SubTab onClick={() => handleTabClick('individual')}>
                개별 종목
              </SubTab>
            </SectionHeader>
            <TextContainer>
              <NextText>바로 구매하기</NextText>
              <NavImage src={Triangle} />
            </TextContainer>
            <CombiBoxContainer>
              <CombiBox data={stockData} />
            </CombiBoxContainer>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <SectionHeader>
              <SubTab onClick={() => handleTabClick('recommend')}>
                추천 조합
              </SubTab>
              <MainTab onClick={() => handleTabClick('individual')}>
                개별 종목
              </MainTab>
            </SectionHeader>
            <SearchContainer>
              <SearchImage src={SearchImg} />
            </SearchContainer>
            <ItemContainer>
              {stockItems.map((item, idx) => (
                <div
                  key={item.code}
                  onClick={() => {
                    dispatch(setSelectCode(item.code));
                    navigate(`/stocks/${item.code}`);
                  }}
                >
                  <StockCard
                    data={item}
                    isLike={likeStocks.includes(item.code) ? true : false}
                    setIsLike={() => setLike(item.code)}
                  />
                </div>
              ))}
            </ItemContainer>
          </div>
        )}
      </ContentContainer>
      <Footer />
    </MainContainer>
  );
};

export default StockMainPage;
