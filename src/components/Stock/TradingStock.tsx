import tw, { css, styled } from 'twin.macro';
import PriceItem from './PriceItem';
import SellBuyStock from './SellBuyStock';

import Close from '../../assets/close.svg';

interface TradingProps {
  isSell: boolean;
  onClose: () => void;
}

const SellItem = () => {
  const handlePriceSelect = (price: string) => {
    //
  };

  return (
    <PriceItem
      price={'20000'}
      nowPrice={'100000'}
      isSelected={false}
      onPriceSelect={handlePriceSelect}
      backgroundColor="#E7F0FD"
      textColor="#015FFF"
      amount={200}
    />
  );
};

const PurchaseItem = () => {
  const handlePriceSelect = (price: string) => {
    //
  };

  return (
    <PriceItem
      price={'20000'}
      nowPrice={'100000'}
      isSelected={false}
      onPriceSelect={handlePriceSelect}
      backgroundColor="#FDE8E7"
      textColor="red"
      amount={200}
    />
  );
};

const Container = styled.div`
  ${tw`flex justify-between`}
`;

const ItemBox = styled.div`
  ${tw`flex flex-col`}
`;

const BackDrop = styled.div`
  ${tw`z-[100] w-[100%] h-[100%] bg-black40 fixed left-0 top-0`}
`;

const slideUpAnimation = css`
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalContainer = styled.div`
  ${tw`z-[100] flex flex-col w-[100%] h-fit py-4 gap-4 bg-gray-light fixed left-0 bottom-0 rounded-t-20 shadow-[2px_2px_12px_0_rgba(0,0,0,0.2)]`}
  transition: height 0.3s ease-in-out;
  box-sizing: border-box;
  animation: slideUp 0.5s ease-out forwards;
  ${slideUpAnimation}
`;

const ItemContainer = styled.div`
  ${tw`px-5 flex justify-end`}
`;

const TradingStock = ({ isSell, onClose }: TradingProps) => {
  return (
    <>
      <BackDrop />
      <ModalContainer>
        <ItemContainer>
          <img src={Close} onClick={onClose} />
        </ItemContainer>
        <Container>
          <ItemBox>
            <SellItem />
            <SellItem />
            <SellItem />
            <SellItem />
            <SellItem />
            <SellItem />
            <SellItem />
            <PurchaseItem />
            <PurchaseItem />
            <PurchaseItem />
            <PurchaseItem />
            <PurchaseItem />
            <PurchaseItem />
            <PurchaseItem />
          </ItemBox>
          <SellBuyStock isSell={isSell} />
        </Container>
      </ModalContainer>
    </>
  );
};

export default TradingStock;
