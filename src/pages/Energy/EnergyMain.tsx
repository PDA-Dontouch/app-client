import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';

import { AppDispatch, RootState } from '../../store/store';
import {
  addLikeEnergy,
  addLikeEnergys,
  delLikeEnergys,
  getEnergyDatas,
  getLikeEnergys,
  removeLikeEnergy,
} from '../../store/reducers/energy/energy';

import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import SortButton from '../../components/common/SortButton';
import Product from '../../components/common/Product/Product';
import { EnergyList, energyDetail } from '../../types/energy_product';
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton';
import { getHoldingEnergy } from '../../store/reducers/energy/holding';

const Container = styled.div`
  ${tw`w-[calc(100% - 56px)] mt-14 mb-16 px-7 py-8 flex flex-col gap-5`}
`;

const BtnContainer = styled.div`
  ${tw`flex w-full h-fit justify-end gap-3`}
`;

const MainText = styled.div`
  ${tw`w-fit text-xl`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(82, 147, 208, 0.5);
    line-height: 26px;
  `} // ${tw`w-full bg-blue50 mt-14 px-4 pt-[120px] pb-8 text-white font-semibold text-xl`}
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

const EnergyMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const energyDatas = useSelector((state: RootState) => state.energy.datas);
  const [sortByProfit, setSortByProfit] = useState<boolean>(false);
  const [isSelect, setIsSelect] = useState(0);
  const [energyId, setEnergyId] = useState('');
  const isLoading = useSelector((state: RootState) => state.energy.loading);
  const likeArr = useSelector((state: RootState) => state.energy.energyLike);
  const userId = useSelector((state: RootState) => state.user.user.id);

  useEffect(() => {
    dispatch(getEnergyDatas());
    dispatch(getHoldingEnergy(userId));
    dispatch(getLikeEnergys(userId));
  }, []);

  const filterAndSortData = (data: EnergyList[], completed: boolean) => {
    const filteredData = data.filter((energy) =>
      completed
        ? energy.sumOfInvestmentAndReservation === energy.fundingAmount
        : energy.sumOfInvestmentAndReservation !== energy.fundingAmount,
    );
    return sortByProfit
      ? filteredData.sort((a, b) => b.earningRate - a.earningRate)
      : filteredData;
  };

  const handleLikeToggle = async (item: EnergyList) => {
    const data = {
      userId: userId,
      energyFundId: item.energyId,
    };

    const isLiked = likeArr.includes(item.energyId);

    if (isLiked) {
      dispatch(removeLikeEnergy(item.energyId));
      await dispatch(delLikeEnergys(data));
    } else {
      dispatch(addLikeEnergy(item.energyId));
      await dispatch(addLikeEnergys(data));
    }
  };

  const renderProducts = (data: EnergyList[]) => {
    return data.map((item) => (
      <div key={item.energyId}>
        <Product
          isEstates={false}
          data={item}
          isLike={likeArr.includes(item.energyId)}
          setIsLike={() => handleLikeToggle(item)}
        />
      </div>
    ));
  };

  const ongoingInvestments = filterAndSortData(energyDatas, false);
  const completedInvestments = filterAndSortData(energyDatas, true);

  return (
    <>
      <Navbar name="박유진" type="main" onClick={() => {}} />
      <Container>
        <MainText>신재생에너지</MainText>
        <BtnContainer>
          <SortButton
            isEstates={false}
            isSelect={!sortByProfit}
            title="등급순"
            onClick={() => setSortByProfit(false)}
          />
          <SortButton
            isEstates={false}
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

export default EnergyMain;
