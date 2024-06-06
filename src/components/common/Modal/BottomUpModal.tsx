import { ReactElement } from "react";
import tw, { styled } from "twin.macro";

import Close from '../../../assets/close.svg';

interface ModalProps {
  content: ReactElement;
  onClose: () => void;
}


const BackDrop = styled.div`
  ${tw`w-[100%] h-[100%] bg-black40 fixed left-0 top-0`}
`;

const ModalContainer = styled.div`
  ${tw`w-[calc(100% - 40px)] px-5 py-4 gap-4 bg-gray-light fixed left-0 bottom-0 rounded-t-20 shadow-[2px_2px_12px_0_rgba(0,0,0,0.2)]`}
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