import tw, { styled } from "twin.macro";

interface ItemProps {
  name: string;
  amount: number;
  symbol: string;
}

const Container = styled.div`
  ${tw`flex justify-center items-center gap-2`}
`;

const Item = styled.div`
  ${tw`flex flex-col items-center gap-[2px]`}
`;

const MainText = styled.span`${tw`text-sm`}`;

const SubText = styled.span`${tw`text-xs`}`;

const StockItem = ({ name, amount, symbol}: ItemProps) => {
  const isKr = !isNaN(Number(symbol));
  const imageUrl = isKr 
    ? `https://file.alphasquare.co.kr/media/images/stock_logo/${isKr ? 'kr' : 'us'}/${symbol}.png`
    : `https://file.alphasquare.co.kr/media/images/stock_logo/${isKr ? 'kr' : 'us'}/${symbol}.png`;

  return (
    <Container>
      <img src={imageUrl} alt={`${name} logo`}/>
      <Item>
        <MainText>{name}</MainText>
        <SubText>{amount}주</SubText>
      </Item>
    </Container>
  );
};

export default StockItem;