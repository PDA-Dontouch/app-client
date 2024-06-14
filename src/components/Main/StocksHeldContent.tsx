import GreenBtnSet from './GreenBtnSet';
import TotalPrice from './TotalPrice';

type StocksHeldContentProps = {
  leftOnClick?: () => void;
  rightOnClick?: () => void;
  totalPrice?: number;
};

export default function StocksHeldContent({
  leftOnClick,
  rightOnClick,
  totalPrice,
}: StocksHeldContentProps) {
  return (
    <>
      <GreenBtnSet
        leftColor="white"
        rightColor="green"
        leftText="보유한 주식 추가하기"
        rightText="조합 내역 보러가기"
        leftOnClick={leftOnClick}
        rightOnClick={rightOnClick}
      />
      <TotalPrice text="보유 상품 총액" price={totalPrice} />
    </>
  );
}
