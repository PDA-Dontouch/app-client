import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CombiBox from '../../components/common/Stock/CombiBox';
import StockCard from '../../components/common/Stock/StockCard';
import SearchBar from '../../components/common/Stock/SearchBar';
// import NextBtn from '../../components/common/Stock/NextBtn';
// import PersonalInfo from '../../components/common/Stock/PersonalInfo';

import {
  addLikeStocks,
  delStocksLike,
  delLikeStocks,
  getStocksDatas,
  setStocksLike,
} from '../../store/reducers/stocks/stocks';

const stockData = {
  combination1: {
    diviend_income: 0,
    stocks: [
      {
        id: 4,
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
        id: 6,
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
        id: 5,
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
        id: 1,
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
        id: 2,
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

const MainContainer = styled.div`
  ${tw`flex flex-col min-h-screen`}
`;

const ContentContainer = styled.div`
  ${tw`h-[calc(100% - 200px)] flex-1 p-4 mt-15 mb-17`}
`;

const SectionHeader = styled.div`
  ${tw`flex gap-4 my-4 pl-2 mt-6`}
`;

const MainTab = styled.span`
  ${tw` text-lg cursor-pointer`}
`;
const SubTab = styled(MainTab)`
  ${css`
    color: rgba(0, 0, 0, 0.4);
  `}
`;

const CombiBoxContainer = styled.div`
  ${tw`mt-3 p-2`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const SortType = styled.span`
  ${tw`text-sm mt-5 mb-5 text-right block`}
`;

const StockMainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stockList = useSelector((state: RootState) => state.stocks.datas);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/stocks/detail');
  };
  const [activeTab, setActiveTab] = useState<'recommend' | 'individual'>(
    'recommend',
  );
  const [likeStocks, setLikeStocks] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [page, setPage] = useState(0);

  const requestData = {
    userInvestmentType: 0,
    safeScore: 80,
    dividendScore: 5,
    growthScore: 15,
    dividendMonth: null,
    page: page,
    size: 24,
  };

  useEffect(() => {
    dispatch(getStocksDatas(requestData));
  }, []);

  console.log(stockList);

  const filteredList = stockList.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleTabClick = (tab: 'recommend' | 'individual') => {
    setActiveTab(tab);
  };

  const setLike = (stocks_id: number) => {
    if (likeStocks.includes(stocks_id)) {
      setLikeStocks(likeStocks.filter((id) => id !== stocks_id));
      dispatch(delStocksLike(stocks_id));
    } else {
      setLikeStocks([...likeStocks, stocks_id]);
      dispatch(setStocksLike(stocks_id));
    }
  };

  return (
    <MainContainer>
      <Navbar name="박유진" type="main" onClick={() => {}} />
      <ContentContainer>
        <PersonalInfo />
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
            <NextBtn content="바로 구매하기" />
            <CombiBoxContainer onClick={handleClick}>
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
            <SearchBar setSearchTerm={setSearchTerm} modal={false} />
            <SortType>추천 종목순</SortType>
            <ItemContainer>
              {filteredList.map((item, idx) => (
                <div key={idx}>
                  <StockCard
                    data={item}
                    isLike={likeStocks.includes(item.id) ? true : false}
                    setIsLike={() => setLike(item.id)}
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
