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
import NextBtn from '../../components/common/Stock/NextBtn';
import PersonalInfo from '../../components/common/Stock/PersonalInfo';
import {
  stocksDatas,
  stocksData,
  stocksLike,
  stocksDisLike,
} from '../../api/stocks';
import {
  StockCombiType,
  StockDataResultType,
  InsertCombiStock,
} from '../../types/stocks_product';
import { dispatch } from 'd3';
import { setSelectCode } from '../../store/reducers/stocks/trading';
import { joinRoom } from '../../store/webSocket/nowPrice';

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
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'recommend' | 'individual'>(
    'recommend',
  );
  const [likeStocks, setLikeStocks] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(0);
  const [stockList, setStockList] = useState<StockDataResultType[]>([]);

  useEffect(() => {
    stocksDatas({
      searchWord: searchTerm,
      safeScore: user.user.safeScore,
      dividendScore: user.user.dividendScore,
      growthScore: user.user.growthScore,
      dividendMonth: null,
      page: page,
      size: 24,
    }).then((response) => {
      setStockList(response.data.response);
    });
  }, []);

  const handleTabClick = (tab: 'recommend' | 'individual') => {
    setActiveTab(tab);
  };

  return (
    <MainContainer>
      <Navbar name={user.user.nickname} type="main" onClick={() => {}} />
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
            <NextBtn
              content="바로 구매하기"
              onClick={() => navigate('/stocks/buy')}
            />
            <CombiBoxContainer
              onClick={() => {
                navigate('/stocks/detail');
              }}
            >
              <CombiBox />
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
              {stockList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    dispatch(setSelectCode(item.symbol));
                    joinRoom(item.symbol);
                    navigate(`/stocks/${item.id}`);
                  }}
                >
                  <StockCard
                    data={item}
                    isLike={likeStocks.includes(item.id) ? true : false}
                    setIsLike={() => stocksLike(item)}
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
