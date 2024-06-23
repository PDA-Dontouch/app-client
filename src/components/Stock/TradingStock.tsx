import tw, { css, styled } from 'twin.macro';
import SellBuyStock from './trading/SellBuyStock';

import Close from '../../assets/close.svg';
import { useState } from 'react';
import PriceBook from './trading/PriceBook';
import { PriceType, SocketType } from '../../types/socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface TradingProps {
  isSell: boolean;
  onClose: () => void;
  nowPrice: PriceType;
  askPrice: SocketType;
  selectExchange: string;
}

const Container = styled.div`
  ${tw`flex justify-between`}
`;

const ItemBox = styled.div`
  ${tw`flex flex-col h-[600px]`}
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

const TradingStock = ({
  isSell,
  onClose,
  nowPrice,
  askPrice,
  selectExchange,
}: TradingProps) => {
  const [clickPrice, setClickPrice] = useState<string>('');
  const handlePriceSelect = (price: string) => {
    setClickPrice(price);
  };

  return (
    <>
      <BackDrop />
      <ModalContainer>
        <ItemContainer>
          <img src={Close} onClick={onClose} />
        </ItemContainer>
        <Container>
          <ItemBox>
            <PriceBook
              nowPrice={nowPrice}
              askPrice={askPrice}
              isKorea={selectExchange === 'KSC'}
            />
          </ItemBox>
          <SellBuyStock isSell={isSell} isKorea={selectExchange === 'KSC'} />
        </Container>
      </ModalContainer>
    </>
  );
};

export default TradingStock;
