import tw, { styled } from "twin.macro";

interface ModalProps {
    onClose: () => void;
    message: string;
}

const BackGround = styled.div`
  ${tw`fixed rounded-20 inset-0 bg-black bg-opacity-30 flex items-center justify-center`}
`;

const Modal = styled.div`
  ${tw`bg-white p-5 rounded-20 shadow-lg flex flex-col items-center`}
 
`;

const Btn = styled.button`
  ${tw`mt-3 px-4 py-2 rounded-full`}
  background-color: #1aa76e66;
  border: none;
`;

const Message = styled.span`${tw`text-base items-center`}`;

const AlertModal = ({ onClose, message }: ModalProps) => {
  return (
    <>
      <BackGround>
      <Modal>
        <Message>{message}</Message>
        <Btn onClick={onClose}>
          닫기
        </Btn>
      </Modal>
    </BackGround>
    </>
  );
};

export default AlertModal;