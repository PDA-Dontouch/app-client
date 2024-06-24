import tw, { styled } from 'twin.macro';
import logoImg from '../../../assets/logo.svg';

interface ItemProps {
  name: string;
  amount: number;
  symbol: string;
}

const StockLogo = styled.img`
  ${tw`w-9 h-9 rounded-full`}
`;

const Container = styled.div`
  ${tw`flex justify-center items-center gap-2 w-full box-border`}
`;

const Item = styled.div`
  ${tw`flex flex-col gap-[2px]`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MainText = styled.span`
  ${tw`text-sm`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SubText = styled.span`
  ${tw`text-xs`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
