import tw, { styled } from 'twin.macro';
import ProgressBar from './Progressbar';

import Empty from '../../../assets/empty-heart.svg';
import Fill from '../../../assets/fill-heart.svg';
import { useNavigate } from 'react-router-dom';
import { EstatesList } from '../../../types/estates_product';
import { EnergyList } from '../../../types/energy_product';

interface ProductProps {
  isEstates: boolean;
  data: EstatesList | EnergyList;
  isLike: boolean;
  setIsLike: () => void;
}

const Container = styled.div`
  ${tw`flex gap-4 items-center`}
`;

const ImgContainer = styled.div`
  ${tw`relative w-fit h-[100px]`}
`;

const Img = styled.img`
  ${tw`w-[76px] h-[100px] rounded-8`}
`;

const Heart = styled.img`
  ${tw`absolute top-1 left-1`}
`;

const ItemContainer = styled.div`
  ${tw`min-w-[234px] w-full flex flex-col gap-2`}
`;

const MainText = styled.span`
  ${tw`text-base`}
`;

const SubContainer = styled.div`
  ${tw`flex gap-2`}
`;

const SubText = styled.span<{ isGrade: boolean }>`
  ${tw`text-base`}
  ${({ isGrade }) => (isGrade ? tw`text-[#DE8705]` : tw``)}
`;

const MiniText = styled.span`
  ${tw`text-xs`}
`;

const Product = ({ isEstates, data, isLike, setIsLike }: ProductProps) => {
  const navigate = useNavigate();
  const percentage = (): number => {
    if (isEstates) {
      const estatesData = data as EstatesList;
      return (
        (estatesData.currentInvest / estatesData.totalAmountInvestments) * 100
      );
    } else {
      const energyData = data as EnergyList;
      return (
        (energyData.sumOfInvestmentAndReservation /
          (energyData.fundingAmount * 100000000)) *
        100
      );
    }
  };

  const navigateDetail = () => {
    if (isEstates) {
      const estatesData = data as EstatesList;
      navigate(`/estates/${estatesData.id}`);
    } else {
      const energyData = data as EnergyList;
      navigate(`/energy/${energyData.energyId}`);
    }
  };

  return (
    <Container>
      <ImgContainer>
        <Img
          src={
            isEstates
              ? (data as EstatesList).titleMainImageUrl
              : (data as EnergyList).titleImageUrl
          }
        />
        {isLike ? (
          <Heart src={Fill} onClick={setIsLike} />
        ) : (
          <Heart src={Empty} onClick={setIsLike} />
        )}
      </ImgContainer>
      <ItemContainer onClick={navigateDetail}>
        <MainText>{data.title}</MainText>
        <SubContainer>
          <SubText isGrade={false}>{data.earningRate}%</SubText>
          <SubText isGrade={false}>
            {isEstates
              ? (data as EstatesList).length
              : (data as EnergyList).investment_period}
            개월
          </SubText>
          <SubText isGrade={true}>
            {(data as EstatesList).eightCreditGrade + '등급'}
          </SubText>
        </SubContainer>
        <ProgressBar isEstates={isEstates} percentage={percentage()} />
        <MiniText>
          {(data as EstatesList).currentInvest
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          원 /{' '}
          {isEstates
            ? (data as EstatesList).totalAmountInvestments
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
            : Math.ceil((data as EnergyList).fundingAmount * 100000000)
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          원
        </MiniText>
      </ItemContainer>
    </Container>
  );
};

export default Product;
