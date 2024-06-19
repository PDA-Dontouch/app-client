import tw, { styled } from 'twin.macro';
import logoImg from '../../../assets/logo.svg';

interface ItemProps {
  name: string;
  amount: number;
  symbol: string;
}

const StockLogo = styled.img`
  ${tw`w-10 h-10 rounded-full`}
`;

const Container = styled.div`
  ${tw`flex justify-center items-center gap-2`}
`;

const Item = styled.div`
  ${tw`flex flex-col items-center gap-[2px]`}
`;

const MainText = styled.span`
  ${tw`text-sm`}
`;

const SubText = styled.span`
  ${tw`text-xs`}
`;

const Sub = styled.div`
  ${tw`flex flex-row gap-1`}
`;


const StockItem = ({ name, amount, symbol }: ItemProps) => {
  const isKr = !isNaN(Number(symbol));

  return (
    <Container>
      <StockLogo
        src={`https://file.alphasquare.co.kr/media/images/stock_logo/${isKr ? 'kr' : 'us'}/${symbol}.png`}
        onError={(e) => {
          e.currentTarget.src = logoImg;
        }}
      />
      <Item>
        <MainText>{name}</MainText>
        <Sub>
          <SubText>{symbol}</SubText>
          <SubText>{amount}주</SubText>
        </Sub>
      </Item>
    </Container>
  );
};

export default StockItem;
