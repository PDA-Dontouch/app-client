import tw, { styled } from 'twin.macro';
import StockContainer from './StockContainer';
import {InsertCombiStock} from '../../../types/stocks_product';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch,useSelector } from 'react-redux';
import { insertStock, makeCombiStocks, removeStock } from '../../../store/reducers/stocks/stocks';
import { useEffect } from 'react';

const Wrapper = styled.div`
  ${tw`bg-gray-light px-5 py-5 rounded-16 shadow-[4px_4px_6px_0_rgba(0,0,0,0.15)]`}
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

const CombiBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const combiStocks = useSelector((state:RootState)=> state.stocks);

  const handleAddStock = (combination: "combination1" | "combination2" | "combination3", newStock: InsertCombiStock) => {
    dispatch(insertStock({ combination, stock: newStock }));
  };

  const handleRemoveStock = (combination: "combination1" | "combination2" | "combination3", stockId: number) => {
    dispatch(removeStock({ combination, stockId }));
  };

  useEffect(() => {
    console.log(combiStocks);
  }, [combiStocks]);

  return (
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
  );
};

export default CombiBox;
