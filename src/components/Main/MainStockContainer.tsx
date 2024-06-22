import tw, { styled } from 'twin.macro';
import MainStockItem from './MainStockItem';
import { CombinationPurChasedProductType } from '../../types/stocks_product';
import Nothing from './Nothing';

const Container = styled.div`
  ${tw`flex flex-wrap justify-center gap-6`}
`;

export default function MainStockContainer({
  stocks,
}: {
  stocks: CombinationPurChasedProductType[];
}) {
  return (
    <Container>
      {stocks.map((item, key) => (
        <div key={key}>
          <MainStockItem
            name={item.name}
            amount={item.quantity}
            symbol={item.symbol}
          />
        </div>
      ))}
      {stocks.length == 0 && <Nothing text="구매 조합이 없습니다." />}
    </Container>
  );
}
