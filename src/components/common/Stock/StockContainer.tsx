import tw, { styled } from 'twin.macro';
import StockItem from './StockItem';
import { InsertCombiStock } from '../../../types/stocks_product';

interface StockContainerProps {
  stocks: InsertCombiStock[];
}

const Container = styled.div`
  ${tw`flex flex-wrap justify-center gap-6 w-full`}
`;

const Box = styled.div`
  ${tw`w-[42%]`}
`;

const Text = styled.span`
  ${tw`text-[0.9rem] text-gray-dark py-5`}
`;

const StockContainer = ({ stocks }: StockContainerProps) => {
  return (
    <Container>
      {stocks.length > 0 ? (
        stocks.map((item, idx) => (
          <Box key={item.stockId}>
            <StockItem
              name={item.name}
              amount={item.quantity}
              symbol={item.symbol}
            />
          </Box>
        ))
      ) : (
        <Text>추천 조합이 없습니다.</Text>
      )}
    </Container>
  );
};

export default StockContainer;
