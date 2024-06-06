import tw, { styled } from "twin.macro";
import StockItem from "./StockItem";

const Container = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const MainText = styled.span`${tw`text-base`}`;

const StockContainer = () => {
  return (
    <Container>
      <ItemContainer>
        <MainText>1•4•7•10월</MainText>
        <StockItem />
      </ItemContainer>
      <ItemContainer>
        <MainText>2•5•8•11월</MainText>
        <StockItem />
      </ItemContainer>
      <ItemContainer>
        <MainText>3•6•9•12월</MainText>
        <StockItem />
      </ItemContainer>
    </Container>
  );
};

export default StockContainer;