import tw, { styled } from "twin.macro";

import Close from '../../../assets/close.svg';

const ModalWrap = styled.div`
  ${tw`w-[100vw] h-[100vh]`}
`;

const BackDrop = styled.div`
  ${tw`w-[100%] h-[100vh] bg-black40 absolute left-0 bottom-0`}
`

const ModalContainer = styled.div`
  ${tw`w-[calc(100% - 40px)] px-5 py-4 bg-gray-light absolute left-0 bottom-0 rounded-t-20`}
`

const ItemContainer = styled.div`
  ${tw`w-full flex justify-end`}
`

interface ModalProps {
  onClose: () => void;
}

const BottomUpModal = ({ onClose }: ModalProps) => {
  return (
    <ModalWrap>
      <BackDrop />
      <ModalContainer>
        <ItemContainer>
          <img src={Close} onClick={onClose} />
        </ItemContainer>
      </ModalContainer>
    </ModalWrap>
  );
};

export default BottomUpModal;