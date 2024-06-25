import P2PProgressBar from './P2PProgressBar';
import TotalPrice from './TotalPrice';

type P2PHeldContentProps = {
  totalPrice?: number;
};

export default function P2PHeldContent({ totalPrice }: P2PHeldContentProps) {
  return (
    <>
      <P2PProgressBar totalPrice={totalPrice} />
      <TotalPrice text="보유 상품 총액" price={totalPrice} />
    </>
  );
}
