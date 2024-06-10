import tw, { styled } from 'twin.macro';

import Empty from '../../../assets/line-heart.svg';
import Fill from '../../../assets/fill-heart.svg';
import { useNavigate } from 'react-router-dom';

type StockType = {
  code: string;
  name: string;
  market: string;
  image: string;
  price: number;
  dividend_rate: number;
};

interface StockProps {
  data: StockType;
  isLike: boolean;
  setIsLike: () => void;
}

const Container = styled.div`
  ${tw`flex items-center p-5 border rounded-lg shadow-md mb-1 justify-between`}
`;

const StockLogo = styled.img`
  ${tw`w-12 h-12 rounded-full`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-row ml-1 justify-between`}
`;

const MainText = styled.span`
  ${tw`text-base`}
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col content-between ml-3`}
`;

const SubContainer = styled.div`
  ${tw`flex flex-row text-sm`}
`;
const SubText = styled.span`
  ${tw`mt-1 mr-1`}
`;

const PriceContainer = styled.div`
  ${tw`flex items-center`}
`;
const PriceText = styled.span`
  ${tw`text-sm`}
`;

const Heart = styled.img`
  ${tw`ml-3 w-6 h-6 cursor-pointer`}
`;

const StockCard = ({ data, isLike, setIsLike }: StockProps) => {
  const navigate = useNavigate();
  const navigateDetail = () => {
    navigate(`/stocks/${data.code}`);
  };

  const handleHeartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLike();
  };

  return (
    <Container onClick={navigateDetail}>
      <ItemContainer >
        <StockLogo src={data.image} />
        <InfoContainer>
          <MainText>{data.name}</MainText>
          <SubContainer>
            <SubText>{data.code}</SubText>
            <SubText>{data.market}</SubText>
          </SubContainer>
        </InfoContainer>
      </ItemContainer>

      <PriceContainer>
        <PriceText>
          {data.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원 
          ({data.dividend_rate.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}%)
        </PriceText>
        <Heart src={isLike ? Fill : Empty} onClick={handleHeartClick} />
      </PriceContainer>
    </Container>
  );
};

export default StockCard;
