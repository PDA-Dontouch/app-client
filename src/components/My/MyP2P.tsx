import tw, { styled } from 'twin.macro';
import MyP2PProduct, { MyP2PProductType } from './MyP2PProduct';
import question from '../../assets/question.svg';
import { useState } from 'react';
import BottomUpModal from '../common/Modal/BottomUpModal';
import P2PLimitDescription from './P2PLimitDescription';

type MyP2PProps = {
  type: 'held' | 'like';
  energyData: MyP2PProductType[];
  estateData: MyP2PProductType[];
};

type ProgressStatusProps = {
  status: number;
};

const MyP2PContainer = styled.div`
  ${tw`flex flex-col gap-5 w-full`}
`;

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
  ${({ status }) => {
    return `width:calc(${status} * 100% / 4000);`;
  }}
`;

const ProgressTextConatiner = styled.div`
  ${tw`flex flex-row justify-between w-full text-xxs`}
  position: relative;
`;

const P2P = styled.div`
  ${tw`flex flex-col gap-4 w-full`}
`;

const P2PType = styled.div`
  ${tw`text-xs`}
`;

export default function MyP2P({ type, energyData, estateData }: MyP2PProps) {
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

      <MyP2PContainer>
        {type == 'held' && (
          <ProgressBar>
            <QuestionMark
              src={question}
              onClick={() => {
                setModal(true);
              }}
            />
            <BarContainer>
              <ProgressStatus status={2000} />
            </BarContainer>
            <ProgressTextConatiner>
              <div>0 만원</div>
              <div>4000 만원</div>
            </ProgressTextConatiner>
          </ProgressBar>
        )}
        <P2P>
          <P2PType>부동산</P2PType>
          {estateData.map((estate, idx) => {
            return (
              <div key={idx}>
                <MyP2PProduct
                  img={estate.img}
                  name={estate.name}
                  monthlyDividend={estate.monthlyDividend}
                  annualRate={estate.annualRate}
                  openDate={estate.openDate}
                />
              </div>
            );
          })}
        </P2P>
        <P2P>
          <P2PType>에너지</P2PType>
          {energyData.map((energy, idx) => {
            return (
              <div key={idx}>
                <MyP2PProduct
                  img={energy.img}
                  name={energy.name}
                  monthlyDividend={energy.monthlyDividend}
                  annualRate={energy.annualRate}
                  openDate={energy.openDate}
                />
              </div>
            );
          })}
        </P2P>
      </MyP2PContainer>
    </>
  );
}
