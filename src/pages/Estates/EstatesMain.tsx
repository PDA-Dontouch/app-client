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
  getEstatesDatas,
  setClickEstates,
} from '../../store/reducers/estates/estates';
import useLike from '../../hooks/useLike';
import { EstatesList } from '../../types/estates_product';
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton';
import { getHoldingEstates } from '../../store/reducers/estates/holding';

const Container = styled.div`
  ${tw`w-[calc(100% - 56px)] mt-14 mb-16 px-7 py-8 flex flex-col gap-5`}
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
  const [isSelect, setIsSelect] = useState(0);
  const userId = useSelector((state: RootState) => state.user.user.id);
  const [estateId, setEstateId] = useState(0);

  useEffect(() => {
    dispatch(getEstatesDatas());
    dispatch(getHoldingEstates(userId));
  }, [dispatch]);

  const { EstatesLikeArr, setLikeEstates } = useLike({ fundId: estateId });

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
          isLike={EstatesLikeArr.includes(item.id)}
          setIsLike={() => setLikeEstates(item.id)}
        />
      </div>
    ));
  };

  const ongoingInvestments = filterAndSortData(estatesDatas, false);
  const completedInvestments = filterAndSortData(estatesDatas, true);

  return (
    <>
      <Navbar name="박유진" type="main" onClick={() => {}} />
      <Container>
        <MainText>부동산·법인·SCF</MainText>
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
            <SubText isSelect={isSelect === 0} onClick={() => setIsSelect(0)}>
              모집 중
            </SubText>
            <SubText isSelect={isSelect === 1} onClick={() => setIsSelect(1)}>
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
    </>
  );
};

export default EstatesMain;
