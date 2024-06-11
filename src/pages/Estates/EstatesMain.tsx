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
  addLikeEstates,
  delEstatesLike,
  delLikeEstates,
  getEstatesDatas,
  setEstatesLike,
} from '../../store/reducers/estates/estates';
import useLike from '../../hooks/useLike';

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

const SubText = styled.span`
  ${tw`text-lg`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-8`}
`;

const EstatesMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const estatesDatas = useSelector((state: RootState) => state.estates.datas);
  const [sortByProfit, setSortByProfit] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEstatesDatas()).then(() => console.log(estatesDatas));
    console.log(estatesDatas);
  }, []);

  const sortDataByProfit = () => {
    setSortByProfit(!sortByProfit);
  };

  const sortedData = sortByProfit
    ? [...estatesDatas].sort((a, b) => b.earningRate - a.earningRate)
    : estatesDatas;

  const { likeArr, setLike } = useLike('estates');

  return (
    <>
      <Navbar name="박유진" type="main" onClick={() => {}} />
      <Container>
        <MainText>부동산·법인·SCF</MainText>
        <BtnContainer>
          <SortButton
            isEstates={true}
            isSelect={!sortByProfit}
            title="최신순"
            onClick={() => setSortByProfit(false)}
          />
          <SortButton
            isEstates={true}
            isSelect={sortByProfit}
            title="수익률순"
            onClick={sortDataByProfit}
          />
        </BtnContainer>
        <ItemContainer>
          <SubText>모집 중</SubText>
          {sortedData.map((item, idx) => (
            <div key={idx}>
              <Product
                idx={idx}
                isEstates={true}
                data={item}
                isLike={likeArr.includes(idx) ? true : false}
                setIsLike={() => setLike(idx)}
              />
            </div>
          ))}
        </ItemContainer>
      </Container>
      <Footer />
    </>
  );
};

export default EstatesMain;
