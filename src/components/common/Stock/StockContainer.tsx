import tw, { styled } from 'twin.macro';
import StockItem from './StockItem';

export type ItemType = {
  id: number;
  code: string;
  name: string;
  price: number;
  amount: number;
  total_price: number;
  growth_score: number;
  safe_score: number;
  dividend_score: number;
  personalized_score: number;
};

interface ItemProps {
  item: ItemType[];
}

const Container = styled.div`
  ${tw`flex flex-wrap justify-center gap-6`}
`;

const StockContainer = ({ item }: ItemProps) => {
  return (
    <Container>
      {item.map((item, idx) => (
        <div key={item.code}>
          <StockItem name={item.name} amount={item.amount} />
        </div>
      ))}
    </Container>
  );
};

export default StockContainer;
