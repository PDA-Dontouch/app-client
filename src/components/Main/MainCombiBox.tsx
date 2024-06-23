import tw, { styled } from 'twin.macro';
import MainStockContainer from './MainStockContainer';
import { CombinationPurchasedType } from '../../types/stocks_product';

const Wrapper = styled.div`
  ${tw`bg-gray-light px-5 py-5 w-full rounded-16 shadow-[4px_4px_6px_0_rgba(0,0,0,0.15)]`}
  box-sizing:border-box;
`;

const Container = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-5`}
`;

const MainText = styled.span`
  ${tw`text-base`}
`;

const Line = styled.hr`
  ${tw`w-full h-[3px] bg-gray30 border-none`}
`;

export default function MainCombiBox(combination: CombinationPurchasedType) {
  return (
    <>
      <Wrapper>
        <Container>
          <ItemContainer>
            <MainText>1•4•7•10월</MainText>
            <MainStockContainer stocks={combination.combination1} />
          </ItemContainer>
          <Line />
          <ItemContainer>
            <MainText>2•5•8•11월</MainText>
            <MainStockContainer stocks={combination.combination2} />
          </ItemContainer>
          <Line />
          <ItemContainer>
            <MainText>3•6•9•12월</MainText>
            <MainStockContainer stocks={combination.combination3} />
          </ItemContainer>
        </Container>
      </Wrapper>
    </>
  );
}
