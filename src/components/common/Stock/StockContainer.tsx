import tw, { styled } from 'twin.macro';
import StockItem from './StockItem';
import {InsertCombiStock} from '../../../types/stocks_product';

interface StockContainerProps {
  stocks: InsertCombiStock[];
}

const Container = styled.div`
  ${tw`flex flex-wrap justify-center gap-6`}
`;

const StockContainer = ({stocks}: StockContainerProps) => {

  return (
    <Container>
      {stocks.map((item, idx) => (
        <div key={item.stockId}>
          <StockItem name={item.name} amount={item.quantity} symbol={item.symbol}/>
        </div>
      ))}
    </Container>
  );
};

export default StockContainer;
