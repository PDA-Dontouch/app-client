import tw, { css, styled } from "twin.macro";

import Graph from '../../../assets/graph.svg';
import Button from "../Button";

interface ModalProps {
  type: string;
  onClose: () => void;
}

const BackDrop = styled.div`
  ${tw`w-[100%] h-[100%] bg-black40 fixed left-0 top-0`}
`;

const ModalContainer = styled.div`
  ${tw`w-[calc(100vw - 104px)] px-5 py-10 flex flex-col gap-10 fixed bg-gray-light rounded-20 shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]`}
  ${css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

const ItemContainer = styled.div`
  ${tw`w-full flex justify-center`}
`;

const TextContainer = styled.div`
  ${tw`w-full flex justify-center items-center gap-1`}
`;

const MainText = styled.span`${tw`text-xl`}`;

const BoldText = styled.span`${tw`text-2xl font-semibold`}`;

const PlainText = styled.span`${tw``}`;

const BasicModal = ({ type, onClose }: ModalProps) => {
  return (
    <>
      <BackDrop />
      <ModalContainer>
        <ItemContainer>
          <img src={Graph} onClick={onClose} />
        </ItemContainer>
        <TextContainer>
          <MainText>당신은</MainText>
          <BoldText>{type}형</BoldText>
          <MainText>투자자!</MainText>
        </TextContainer>
        <TextContainer>
          <PlainText>
            {type}형인 당신을 위해 어떤 추천이 기다리고 있을지 궁금하시다면 지금 바로!
          </PlainText>
        </TextContainer>
        <Button name="내 계좌 연동하기" status="active" onClick={onClose} />
      </ModalContainer>
    </>
  );
};

export default BasicModal;