import tw, { styled } from 'twin.macro';

import Empty from '../../../assets/line-heart.svg';
import Fill from '../../../assets/fill-heart.svg';
import logoImg from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

type StockType = {
  id:number;
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  dividendMonth: number;
  dividendYieldTtm: number;
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
    navigate(`/stocks/${data.id}`);
  };
  const handleHeartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLike();
  };

  const isKRStock = data.symbol.slice(-3) === '.ks';
  const displaySymbol = isKRStock ? data.symbol.slice(0, -3) : data.symbol;

  return (
    <Container onClick={navigateDetail}>
      <ItemContainer >
        <StockLogo src={`https://file.alphasquare.co.kr/media/images/stock_logo/${isKRStock ? 'kr' : 'us'}/${data.symbol}.png`}
                  onError={(e) => {
                    e.currentTarget.src = logoImg;
                  }} />
        <InfoContainer>
          <MainText>{data.name}</MainText>
          <SubContainer>
            <SubText>{displaySymbol}</SubText>
            <SubText>{data.exchange}</SubText>
          </SubContainer>
        </InfoContainer>
      </ItemContainer>

      <PriceContainer>
        <PriceText>
        {isKRStock
                    ? `${data.dividendMonth.toFixed(2)} 원`
                    : `$${data.dividendMonth.toFixed(2)}`}
                  ({data.dividendYieldTtm.toFixed(2)}%)
        </PriceText>
        <Heart src={isLike ? Fill : Empty} onClick={handleHeartClick} />
      </PriceContainer>
    </Container>
  );
};

export default StockCard;
