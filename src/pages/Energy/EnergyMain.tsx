import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';

import { AppDispatch, RootState } from '../../store/store';
import useLike from '../../hooks/useLike';
import { getEnergyDatas } from '../../store/reducers/energy/energy';

import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import SortButton from '../../components/common/SortButton';
import Product from '../../components/common/Product/Product';

const Container = styled.div`
  ${tw`w-[calc(100% - 56px)] mt-14 mb-16 px-7 py-8 flex flex-col gap-5`}
`;

const BtnContainer = styled.div`
  ${tw`flex w-full h-fit justify-end gap-3`}
`;

const MainText = styled.span`
  ${tw`w-fit text-xl`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(82, 147, 208, 0.5);
    line-height: 26px;
  `}
`;

const SubText = styled.span`
  ${tw`text-lg`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-8`}
`;

const EnergyMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const energyDatas = useSelector((state: RootState) => state.energy.datas);
  const [sortByProfit, setSortByProfit] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEnergyDatas());
  }, []);

  const sortDataByProfit = () => {
    setSortByProfit(!sortByProfit);
  };

  const sortedData = sortByProfit
    ? [...energyDatas].sort((a, b) => b.earningRate - a.earningRate)
    : energyDatas;

  const { EstatesLikeArr, setLikeEstates, EnergyLikeArr, setLikeEnergy } =
    useLike();

  return (
    <>
      <Navbar name="박유진" type="main" onClick={() => {}} />
      <Container>
        <MainText>신재생에너지</MainText>
        <BtnContainer>
          <SortButton
            isEstates={false}
            isSelect={!sortByProfit}
            title="최신순"
            onClick={() => setSortByProfit(false)}
          />
          <SortButton
            isEstates={false}
            isSelect={sortByProfit}
            title="수익률순"
            onClick={sortDataByProfit}
          />
        </BtnContainer>
        <ItemContainer>
          <SubText>모집 중</SubText>
          {sortedData.map((item, idx) => (
            <div key={item.energyId}>
              <Product
                isEstates={false}
                data={item}
                isLike={EnergyLikeArr.includes(item.energyId) ? true : false}
                setIsLike={() => setLikeEnergy(item.energyId)}
              />
            </div>
          ))}
        </ItemContainer>
      </Container>
      <Footer />
    </>
  );
};

export default EnergyMain;
