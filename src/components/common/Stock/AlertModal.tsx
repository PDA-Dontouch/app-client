import tw, { styled } from 'twin.macro';

interface ModalProps {
  onClose: () => void;
  message: string;
  type: 'modal' | 'full';
}

const BackGround = styled.div<{ round?: boolean }>`
  ${({ round }) => round && tw`rounded-t-20`};
  ${tw`fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center`}
  z-index: 50
`;

const Modal = styled.div`
  ${tw`bg-white px-8 py-6 rounded-12 shadow-lg flex flex-col items-center gap-4`}
`;

const Btn = styled.button`
  ${tw`px-4 py-2 rounded-full text-white`}
  background-color: #457BC3;
  border: none;
`;

const Message = styled.span`
  ${tw`text-base items-center`}
`;

const AlertModal = ({ onClose, message, type }: ModalProps) => {
  return (
    <>
      <BackGround round={type === 'modal'}>
        <Modal>
          <Message>{message}</Message>
          <Btn onClick={onClose}>닫기</Btn>
        </Modal>
      </BackGround>
    </>
  );
};

export default AlertModal;
