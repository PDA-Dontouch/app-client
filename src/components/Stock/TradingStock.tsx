import tw, { css, styled } from 'twin.macro';
import PriceItem from './PriceItem';
import SellBuyStock from './SellBuyStock';

import Close from '../../assets/close.svg';
import { useState } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';

interface TradingProps {
  isSell: boolean;
  onClose: () => void;
}

interface ItemProps {
  handlePriceSelect: (price: string) => void;
}

const SellItem = ({ handlePriceSelect }: ItemProps) => {
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

const PurchaseItem = ({ handlePriceSelect }: ItemProps) => {
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
  const [clickPrice, setClickPrice] = useState<string>('');
  const handlePriceSelect = (price: string) => {
    setClickPrice(price);
  };

  const { nowPrice, askPrice } = useWebSocket();
  console.log(askPrice);

  return (
    <>
      <BackDrop />
      <ModalContainer>
        <ItemContainer>
          <img src={Close} onClick={onClose} />
        </ItemContainer>
        <Container>
          <ItemBox>
            <SellItem handlePriceSelect={handlePriceSelect} />
            <SellItem handlePriceSelect={handlePriceSelect} />
            <SellItem handlePriceSelect={handlePriceSelect} />
            <SellItem handlePriceSelect={handlePriceSelect} />
            <SellItem handlePriceSelect={handlePriceSelect} />
            <SellItem handlePriceSelect={handlePriceSelect} />
            <SellItem handlePriceSelect={handlePriceSelect} />
            <PurchaseItem handlePriceSelect={handlePriceSelect} />
            <PurchaseItem handlePriceSelect={handlePriceSelect} />
            <PurchaseItem handlePriceSelect={handlePriceSelect} />
            <PurchaseItem handlePriceSelect={handlePriceSelect} />
            <PurchaseItem handlePriceSelect={handlePriceSelect} />
            <PurchaseItem handlePriceSelect={handlePriceSelect} />
            <PurchaseItem handlePriceSelect={handlePriceSelect} />
          </ItemBox>
          <SellBuyStock isSell={isSell} clickPrice={clickPrice} />
        </Container>
      </ModalContainer>
    </>
  );
};

export default TradingStock;
