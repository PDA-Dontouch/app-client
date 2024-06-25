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
  closePrice: number;
};

interface StockProps {
  data: StockType;
  isLike: boolean;
  setIsLike: () => void;
}

const Container = styled.div`
  ${tw`w-full flex items-center px-3 py-5 border mb-1 justify-between box-border`}
`;

const StockLogo = styled.img`
  ${tw`w-10 h-10 rounded-full`}
`;

const ItemContainer = styled.div`
  ${tw`w-[60%] flex flex-row ml-1 items-center`}
  overflow: hidden;
`;

const MainText = styled.span`
  ${tw`text-sm`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col content-between ml-3`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SubContainer = styled.div`
  ${tw`flex flex-row text-xs`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SubText = styled.span`
  ${tw`mt-1 mr-1`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PriceContainer = styled.div`
  ${tw`flex items-center`}
`;

const PriceItem = styled.div`
  ${tw`flex flex-col gap-1 items-end`}
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
        <PriceItem>
          <PriceText>
            {isKRStock(data.symbol)
              ? `${data.closePrice
                  .toFixed(0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`
              : `$${data.dividendMonth.toFixed(2)}`}
          </PriceText>
          <PriceText>({data.dividendYieldTtm.toFixed(4)}%)</PriceText>
        </PriceItem>
        <Heart src={isLike ? Fill : Empty} onClick={handleHeartClick} />
      </PriceContainer>
    </Container>
  );
};

export default StockCard;
