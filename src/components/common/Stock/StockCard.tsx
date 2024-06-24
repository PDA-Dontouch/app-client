import tw, { styled } from 'twin.macro';

import Empty from '../../../assets/line-heart.svg';
import Fill from '../../../assets/fill-heart.svg';
import logoImg from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

type StockType = {
  id: number;
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
  ${tw`flex items-center p-3 border rounded-lg shadow-md mb-1 justify-between`}
  height: 60px
`;

const StockLogo = styled.img`
  ${tw`w-10 h-10 rounded-full`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-row ml-1 justify-between items-center`}
`;

const MainText = styled.span`
  ${tw`text-sm`}
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col content-between ml-3`}
`;

const SubContainer = styled.div`
  ${tw`flex flex-row text-xs`}
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
  ${tw`ml-2 w-6 h-6 cursor-pointer`}
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

  const isKRStock = (symbol: string): boolean => {
    // 모든 문자가 숫자인지 확인
    return /^[0-9]+$/.test(symbol);
  };

  return (
    <Container onClick={navigateDetail}>
      <ItemContainer>
        <StockLogo
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/${isKRStock(data.symbol) ? 'kr' : 'us'}/${data.symbol}.png`}
          onError={(e) => {
            e.currentTarget.src = logoImg;
          }}
        />
        <InfoContainer>
          <MainText>{data.name}</MainText>
          <SubContainer>
            <SubText>{data.symbol}</SubText>
            <SubText>{data.exchange}</SubText>
          </SubContainer>
        </InfoContainer>
      </ItemContainer>

      <PriceContainer>
        <PriceText>
          {isKRStock(data.symbol)
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
