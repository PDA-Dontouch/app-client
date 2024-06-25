import { ReactElement, useEffect } from 'react';
import tw, { css, styled } from 'twin.macro';

import Close from '../../../assets/close.svg';
import Button from '../Button';

interface ModalProps {
  content: ReactElement;
  onClose: () => void;
  isOpen: boolean;
}

const BackDrop = styled.div`
  ${tw`w-[100%] h-[100%] bg-black40 fixed left-0 top-0 z-[99]`}
`;

const ModalContainer = styled.div`
  ${tw`z-[100] w-[calc(100vw - 104px)] px-5 py-5 flex flex-col gap-6 fixed bg-gray-light rounded-20 shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]`}
  ${css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

const ItemContainer = styled.div`
  ${tw`w-full flex justify-end`}
`;

const TextContainer = styled.div`
  ${tw`w-full flex justify-center items-end gap-1`}
`;

const BasicModal2 = ({ content, onClose, isOpen }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <BackDrop />
          <ModalContainer>
            <ItemContainer>
              <img src={Close} onClick={onClose} />
            </ItemContainer>
            <TextContainer>{content}</TextContainer>
          </ModalContainer>
        </>
      )}
    </>
  );
};

export default BasicModal2;
