import tw, { styled } from 'twin.macro';
import StockContainer from './StockContainer';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  ${tw`px-5 py-5 rounded-16 shadow-[2px_2px_4px_0_rgba(0, 0, 0, 0.05)]`}
  border: 0.8px solid rgba(0, 0, 0, 0.05)
`;

const Container = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-6`}
`;

const MainText = styled.span`
  ${tw`text-base`}
`;

const Line = styled.hr`
  ${tw`w-full h-[1px] bg-gray30 border-none`}
`;

const InfoText = styled.div`
  ${tw`text-sm text-green ps-2`}
`;

const CombiBox: React.FC = () => {
  const combiStocks = useSelector((state: RootState) => state.stocks);

  const areAllCombinationsFilled =
    combiStocks.combination1.stocks.length > 0 &&
    combiStocks.combination2.stocks.length > 0 &&
    combiStocks.combination3.stocks.length > 0;

  return (
    <>
      <Wrapper>
        <Container>
          <ItemContainer>
            <MainText>1•4•7•10월</MainText>
            <StockContainer stocks={combiStocks.combination1.stocks} />
          </ItemContainer>
          <Line />
          <ItemContainer>
            <MainText>2•5•8•11월</MainText>
            <StockContainer stocks={combiStocks.combination2.stocks} />
          </ItemContainer>
          <Line />
          <ItemContainer>
            <MainText>3•6•9•12월</MainText>
            <StockContainer stocks={combiStocks.combination3.stocks} />
          </ItemContainer>
        </Container>
      </Wrapper>
      <br></br>
      {areAllCombinationsFilled && (
        <InfoText>* 12개월 모두 받을 수 있는 배당 조합입니다.</InfoText>
      )}
    </>
  );
};

export default CombiBox;
