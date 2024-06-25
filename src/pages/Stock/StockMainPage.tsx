import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import {
  setSelectCode,
  setSelectExchange,
} from '../../store/reducers/stocks/trading';
import { joinRoom } from '../../store/webSocket/nowPrice';
import {
  addLikeStock,
  addLikeStocks,
  delLikeStocks,
  getLikeStocks,
  removeLikeStock,
} from '../../store/reducers/stocks/stocks';
import ScrollToTop from '../../hooks/ScrollToTop';
import Loading from '../../assets/loading.gif';

const MainContainer = styled.div`
  ${tw`flex flex-col min-h-screen`}
`;

const ContentContainer = styled.div`
  ${tw`h-[calc(100% - 200px)] flex-1 p-4 mt-15 mb-17`}
`;

const SectionHeader = styled.div`
  ${tw`flex gap-4 pl-2 mt-6 mb-4`}
`;

const MainTab = styled.span`
  ${tw` text-[1rem] cursor-pointer`}
`;
const SubTab = styled(MainTab)`
  ${css`
    color: rgba(0, 0, 0, 0.4);
  `}
`;

const CombiBoxContainer = styled.div`
  ${tw`mt-2 p-2`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const SortType = styled.span`
  ${tw`text-sm my-5 mx-2 text-right block`}
`;

const LoadingContainer = styled.div`
  ${tw`flex flex-col h-[100vh] w-full items-center justify-center`}
`;

const LoadingImg = styled.img`
  ${tw`h-[5.6rem]`}
`;

const LoadingText = styled.span`
  ${tw`text-[1.1rem]`}
`;

const StockMainPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'recommend' | 'individual'>(
    'recommend',
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(0);
  const [stockList, setStockList] = useState<StockDataResultType[]>([]);
  const userId = useSelector((state: RootState) => state.user.user.id);
  const likeArr = useSelector((state: RootState) => state.stocks.stocksLike);
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    if (tab === 'individual') {
      setActiveTab('individual');
    } else {
      setActiveTab('recommend');
    }
  }, [location.search]);

  useEffect(() => {
    stocksDatas({
      searchWord: searchTerm,
      userId: user.user.id,
      dividendMonth: null,
      page: page,
      size: 24,
    }).then((response) => {
      setStockList(response.data.response);
    });
    dispatch(getLikeStocks(userId));
  }, [searchTerm]);

  const handleTabClick = (tab: 'recommend' | 'individual') => {
    setActiveTab(tab);
    navigate(`?tab=${tab}`);
  };

  const handleLikeToggle = async (item: StockDataResultType) => {
    const data = {
      userId: userId,
      exchange: item.exchange,
      stockId: item.id,
    };

    const isLiked = likeArr.some((el) => el.stockId === item.id);

    const checked = {
      exchange: item.exchange,
      stockId: item.id,
    };
    if (isLiked) {
      dispatch(removeLikeStock(checked));
      await dispatch(delLikeStocks(data));
    } else {
      dispatch(addLikeStock(checked));
      await dispatch(addLikeStocks(data));
    }
  };

  return loading && activeTab === 'recommend' && time === false ? (
    <LoadingContainer>
      <LoadingImg src={Loading} alt="Loading" />
      <LoadingText>추천 조합 생성 중</LoadingText>
    </LoadingContainer>
  ) : (
    <MainContainer>
      <Navbar
        name={user.user.nickname}
        type="main"
        onClick={() => navigate('/')}
      />
      <ScrollToTop />

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
              onClick={() => {
                navigate('/stocks/buy');
                setTime(true);
              }}
            />
            <CombiBoxContainer
              onClick={() => {
                navigate('/stocks/detail');
                setTime(true);
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
                    dispatch(setSelectExchange(item.exchange));
                    if (item.exchange === 'KSC') {
                      joinRoom(item.symbol);
                    }
                    navigate(`/stocks/${item.id}`);
                  }}
                >
                  <StockCard
                    data={item}
                    isLike={likeArr.some((el) => el.stockId === item.id)}
                    setIsLike={() => handleLikeToggle(item)}
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
