import { ReactElement } from "react";
import tw, { css, styled } from "twin.macro";

import Close from '../../../assets/close.svg';

interface ModalProps {
  content: ReactElement;
  onClose: () => void;
}

const BackDrop = styled.div`
  ${tw`w-[100%] h-[100%] bg-black40 fixed left-0 top-0`}
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
  ${tw`flex flex-col w-[calc(100% - 40px)] h-fit px-5 py-4 gap-4 bg-gray-light fixed left-0 bottom-0 rounded-t-20 shadow-[2px_2px_12px_0_rgba(0,0,0,0.2)]`}
  transition: height 0.3s ease-in-out;
  animation: slideUp 0.5s ease-out forwards;
  ${slideUpAnimation}
`;

const ItemContainer = styled.div`
  ${tw`w-full flex justify-end`}
`;

const BottomUpModal = ({ onClose, content }: ModalProps) => {
  return (
    <>
      <BackDrop />
      <ModalContainer>
        <ItemContainer>
          <img src={Close} onClick={onClose} />
        </ItemContainer>
        <ItemContainer>
          {content}
        </ItemContainer>
      </ModalContainer>
    </>
  );
};

export default BottomUpModal;