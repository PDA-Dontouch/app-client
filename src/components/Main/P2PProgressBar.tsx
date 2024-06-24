import tw, { styled } from 'twin.macro';
import question from '../../assets/question.svg';
import { useState } from 'react';
import BottomUpModal from '../common/Modal/BottomUpModal';
import P2PLimitDescription from './P2PLimitDescription';

type P2PHeldContentProps = {
  totalPrice?: number;
};

type ProgressStatusProps = {
  percentage?: number;
};

const ProgressBar = styled.div`
  ${tw`flex flex-col items-end gap-1`}
`;

const QuestionMark = styled.img`
  ${tw`w-4 h-4`}
`;

const BarContainer = styled.div`
  ${tw`flex flex-row bg-gray w-full h-2`}
  border-radius: 12px;
`;

const ProgressStatus = styled.div<ProgressStatusProps>`
  ${tw`bg-green h-full`}
  border-radius:12px;
  width: ${({ percentage }) => `${percentage}%`};
`;

const ProgressTextConatiner = styled.div`
  ${tw`flex flex-row justify-between w-full text-xxs`}
  position: relative;
`;

export default function P2PProgressBar({ totalPrice }: P2PHeldContentProps) {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      {modal && (
        <BottomUpModal
          onClose={() => {
            setModal(false);
          }}
          content={<P2PLimitDescription />}
        ></BottomUpModal>
      )}
      <ProgressBar>
        <QuestionMark
          src={question}
          onClick={() => {
            setModal(true);
          }}
        />
        <BarContainer>
          <ProgressStatus percentage={(totalPrice / 40000000) * 100} />
        </BarContainer>
        <ProgressTextConatiner>
          <div>
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
          </div>
          <div>4000 만원</div>
        </ProgressTextConatiner>
      </ProgressBar>
    </>
  );
}
