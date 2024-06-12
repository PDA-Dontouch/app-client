import tw, { styled } from 'twin.macro';
import ProgressBar from './Progressbar';

import Empty from '../../../assets/empty-heart.svg';
import Fill from '../../../assets/fill-heart.svg';
import { useNavigate } from 'react-router-dom';
import { Products } from '../../../store/reducers/estates/estates';

interface ProductProps {
  isEstates: boolean;
  data: Products;
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
  ${tw`text-sm`}
`;

const SubContainer = styled.div`
  ${tw`flex gap-2`}
`;

const SubText = styled.span`
  ${tw`text-base`}
`;

const MiniText = styled.span`
  ${tw`text-xs`}
`;

const Product = ({ isEstates, data, isLike, setIsLike }: ProductProps) => {
  const navigate = useNavigate();
  const percentage =
    (data.sumOfInvestmentAndReservation / data.totalAmountInvestments) * 100;

  const navigateDetail = () => {
    if (isEstates) {
      navigate(`/estates/${data.id}`);
    } else {
      navigate(`/energy/${data.id}`);
    }
  };

  return (
    <Container>
      <ImgContainer>
        <Img src={data.titleMainImageUrl} />
        {isLike ? (
          <Heart src={Fill} onClick={setIsLike} />
        ) : (
          <Heart src={Empty} onClick={setIsLike} />
        )}
      </ImgContainer>
      <ItemContainer onClick={navigateDetail}>
        <MainText>{data.title}</MainText>
        <SubContainer>
          <SubText>{data.earningRate}%</SubText>
          <SubText>{data.length}개월</SubText>
        </SubContainer>
        <ProgressBar isEstates={isEstates} percentage={percentage} />
        <MiniText>
          {data.sumOfInvestmentAndReservation
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          원 /{' '}
          {data.totalAmountInvestments
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          원
        </MiniText>
        {/* <Tag tags={data.tags} /> */}
      </ItemContainer>
    </Container>
  );
};

export default Product;
