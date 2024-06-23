import { useDispatch, useSelector } from 'react-redux';
import tw, { css, styled } from 'twin.macro';

import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import SortButton from '../../components/common/SortButton';
import Product from '../../components/common/Product/Product';

import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addLikeEstate,
  addLikeEstates,
  delLikeEstates,
  getEstatesDatas,
  getLikeEstates,
  removeLikeEstate,
  setClickEstates,
} from '../../store/reducers/estates/estates';
import { EstatesList } from '../../types/estates_product';
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton';
import { getHoldingEstates } from '../../store/reducers/estates/holding';
import Question from '../../assets/question.svg';
import BasicModal2 from '../../components/common/Modal/BasicModal2';
import InvestmentDescription from '../../components/common/InvestmentDescription';

const Container = styled.div`
  ${tw`w-[calc(100% - 56px)] mt-14 mb-16 px-7 py-8 flex flex-col gap-5`}
`;

const TopContainer = styled.div`
  ${tw`flex items-start gap-2`}
`;

const BtnContainer = styled.div`
  ${tw`flex w-full h-fit justify-end gap-3`}
`;

const MainText = styled.span`
  ${tw`w-fit text-xl`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(230, 182, 55, 0.5);
    line-height: 26px;
  `}
`;

const SubText = styled.span<{ isSelect: boolean }>`
  ${tw`text-lg`}
  ${({ isSelect }) => (isSelect ? tw`text-black` : tw`text-gray70`)}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-8`}
`;

const SelectContainer = styled.div`
  ${tw`flex gap-3`}
`;

const EstatesMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const estatesDatas = useSelector((state: RootState) => state.estates.datas);
  const isLoading = useSelector((state: RootState) => state.estates.loading);
  const [sortByProfit, setSortByProfit] = useState(false);
  const [isSelect, setIsSelect] = useState<number>(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') === '1' ? 1 : 0;
  });
  const user = useSelector((state: RootState) => state.user.user);
  const likeArr = useSelector((state: RootState) => state.estates.estatesLike);
  const [estateId, setEstateId] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEstatesDatas());
    dispatch(getHoldingEstates(user.id));
    dispatch(getLikeEstates(user.id));
  }, [dispatch]);

  const filterAndSortData = (data: EstatesList[], completed: boolean) => {
    const filteredData = data.filter((estate) =>
      completed
        ? estate.currentInvest === estate.totalAmountInvestments
        : estate.currentInvest !== estate.totalAmountInvestments,
    );
    return sortByProfit
      ? filteredData.sort((a, b) => b.earningRate - a.earningRate)
      : filteredData;
  };

  const clickEstates = (data: EstatesList) => {
    dispatch(setClickEstates(data));
  };

  const handleLikeToggle = async (item: EstatesList) => {
    const data = {
      userId: user.id,
      estateFundId: item.id,
    };

    const isLiked = likeArr.includes(item.id);

    if (isLiked) {
      dispatch(removeLikeEstate(item.id));
      await dispatch(delLikeEstates(data));
    } else {
      dispatch(addLikeEstate(item.id));
      await dispatch(addLikeEstates(data));
    }
  };

  const renderProducts = (data: EstatesList[]) => {
    return data.map((item) => (
      <div
        key={item.id}
        onClick={() => {
          clickEstates(item);
          setEstateId(item.id);
        }}
      >
        <Product
          isEstates={true}
          data={item}
          isLike={likeArr.includes(item.id)}
          setIsLike={() => handleLikeToggle(item)}
        />
      </div>
    ));
  };

  const ongoingInvestments = filterAndSortData(estatesDatas, false);
  const completedInvestments = filterAndSortData(estatesDatas, true);

  const handleTabClick = (tabIndex: number) => {
    setIsSelect(tabIndex);
    navigate(`?tab=${tabIndex}`);
  };

  return (
    <>
      <Navbar name={user.nickname} type="main" onClick={() => {}} />
      <Container>
        <TopContainer>
          <MainText>부동산·법인·SCF</MainText>
          <img src={Question} onClick={() => setIsOpen(true)} />
        </TopContainer>
        <BtnContainer>
          <SortButton
            isEstates={true}
            isSelect={!sortByProfit}
            title="등급순"
            onClick={() => setSortByProfit(false)}
          />
          <SortButton
            isEstates={true}
            isSelect={sortByProfit}
            title="수익률순"
            onClick={() => setSortByProfit(true)}
          />
        </BtnContainer>
        <ItemContainer>
          <SelectContainer>
            <SubText
              isSelect={isSelect === 0}
              onClick={() => handleTabClick(0)}
            >
              모집 중
            </SubText>
            <SubText
              isSelect={isSelect === 1}
              onClick={() => handleTabClick(1)}
            >
              모집 완료
            </SubText>
          </SelectContainer>
          {isLoading
            ? [...Array(5)].map((_, index) => (
                <div key={index}>
                  <ProductSkeleton />
                </div>
              ))
            : isSelect === 0
              ? renderProducts(ongoingInvestments)
              : renderProducts(completedInvestments)}
        </ItemContainer>
      </Container>
      <Footer />
      {isOpen && (
        <BasicModal2
          content={<InvestmentDescription isEstates={true} />}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default EstatesMain;
