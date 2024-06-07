import tw, { styled } from "twin.macro";
import StockContainer, { ItemType } from "./StockContainer";

type StockType = {
  combination1: {
    diviend_income: number;
    stocks: ItemType[];
  },
  combination2: {
    diviend_income: number;
    stocks: ItemType[];
  },
  combination3: {
    diviend_income: number;
    stocks: ItemType[];
  }
};

interface StockProps {
  data: StockType;
}

const Wrapper = styled.div`
  ${tw`bg-gray-light px-5 py-5 rounded-16 shadow-[4px_4px_6px_0_rgba(0,0,0,0.15)]`}
`;

const Container = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-5`}
`;

const MainText = styled.span`${tw`text-base`}`;

const Line = styled.hr`
  ${tw`w-full h-[3px] bg-gray30 border-none`}
`;

const CombiBox = ({ data }: StockProps) => {
  return (
    <Wrapper>
      <Container>
        <ItemContainer>
          <MainText>1•4•7•10월</MainText>
          <StockContainer item={data.combination1.stocks} />
        </ItemContainer>
        <Line />
        <ItemContainer>
          <MainText>2•5•8•11월</MainText>
          <StockContainer item={data.combination2.stocks} />
        </ItemContainer>
        <Line />
        <ItemContainer>
          <MainText>3•6•9•12월</MainText>
          <StockContainer item={data.combination3.stocks} />
        </ItemContainer>
      </Container>
    </Wrapper>
  );
};

export default CombiBox;