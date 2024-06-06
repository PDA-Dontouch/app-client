import tw, { styled } from "twin.macro";

import Graph from '../../../assets/graph.svg';
import Button from "../Button";

const ModalWrap = styled.div`
  ${tw`w-[calc(100vw-64px)] h-[100vh] fixed left-0 top-0 px-8`}
`;

const BackDrop = styled.div`
  ${tw`w-[100%] h-[100vh] bg-black40 absolute left-0 top-0`}
`;

const ModalContainer = styled.div`
  ${tw`w-[calc(100vw - 104px)] px-5 py-10 flex flex-col gap-10 absolute bg-gray-light rounded-20 shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]`}
`;

const ItemContainer = styled.div`
  ${tw`w-full flex justify-center`}
`;

const TextContainer = styled.div`
  ${tw`w-full flex justify-center items-center gap-1`}
`;

const MainText = styled.span`${tw`text-xl`}`;

const BoldText = styled.span`${tw`text-2xl font-semibold`}`;

const PlainText = styled.span`${tw``}`

interface ModalProps {
  onClose: () => void;
}

const BasicModal = ({ onClose }: ModalProps) => {
  return (
    <ModalWrap>
      <BackDrop />
      <ModalContainer>
        <ItemContainer>
          <img src={Graph} onClick={onClose} />
        </ItemContainer>
        <TextContainer>
          <MainText>당신은</MainText>
          <BoldText>OOOO형</BoldText>
          <MainText>투자자!</MainText>
        </TextContainer>
        <TextContainer>
          <PlainText>
            OOOO형인 당신을 위해 어떤 추천이 기다리고 있을지 궁금하시다면 지금 바로!
          </PlainText>
        </TextContainer>
        <Button name="내 계좌 연동하기" status="active" onClick={() => {}} />
      </ModalContainer>
    </ModalWrap>
  );
};

export default BasicModal;