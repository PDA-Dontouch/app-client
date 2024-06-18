import tw, { styled } from 'twin.macro';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import TotalPrice from '../../components/Main/TotalPrice';
import GreenBtnSet from '../../components/Main/GreenBtnSet';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import { useEffect, useState } from 'react';
import WithdrawDeposit from '../../components/Main/WithdrawDeposit';

type LogType = 'deposit' | 'withdraw';

type LogProps = {
  log: LogType;
};

const AccountPageContainer = styled.div`
  ${tw`flex flex-col gap-8 px-5 py-18 w-full`}
  box-sizing: border-box;
`;

const AccountDetailSection = styled.div`
  ${tw`flex flex-col gap-6`}
`;

const AccountDetail = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const LogSection = styled.div`
  ${tw`flex flex-col gap-5`}
`;

const InOutTitle = styled.div`
  ${tw`text-lg`}
`;

const Logs = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const Log = styled.div`
  ${tw`flex flex-row justify-between p-3`}
`;

const LogTypeComponent = styled.div<LogProps>`
  ${({ log }) => {
    return log === 'deposit' ? tw`text-red` : tw`text-blue`;
  }}
`;

const NoLog = styled.div`
  ${tw`w-full text-center text-black40`}
`;

type LogDateType = {
  type: LogType;
  price: number;
};

const logData: LogDateType[] = [
  { type: 'deposit', price: 50000 },
  { type: 'withdraw', price: 300000 },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<LogType>('deposit');
  const [accountAmount, setAccountAmount] = useState<number>(0);

  function onClickDeposit() {
    setModal(true);
    setModalType('deposit');
  }

  function onClickWithdraw() {
    setModal(true);
    setModalType('withdraw');
  }

  function getAccountAmount() {}

  useEffect(() => {}, []);

  return (
    <>
      {modal && (
        <BottomUpModal
          onClose={() => setModal(false)}
          content={<WithdrawDeposit type={modalType} setModal={setModal} />}
        />
      )}
      <Navbar
        type="back"
        name="back"
        onClick={() => {
          navigate('/');
        }}
      />
      <AccountPageContainer>
        <AccountDetailSection>
          <GreenBarTitle text="입출금" />
          <AccountDetail>
            <TotalPrice text="출금 가능 금액" price={6045200} />
            <GreenBtnSet
              leftColor="green"
              rightColor="white"
              leftText="입금"
              rightText="출금"
              leftOnClick={onClickDeposit}
              rightOnClick={onClickWithdraw}
            />
          </AccountDetail>
        </AccountDetailSection>
        <LogSection>
          <InOutTitle>입출금 내역</InOutTitle>
          <Logs>
            {logData.length === 0 ? (
              <NoLog>입출금 내역이 없습니다.</NoLog>
            ) : (
              logData.map((log, idx) => {
                return (
                  <Log key={idx}>
                    <LogTypeComponent log={log.type}>
                      {log.type === 'deposit' ? '입금' : '출금'}
                    </LogTypeComponent>
                    <div>{log.price.toLocaleString()} 원</div>
                  </Log>
                );
              })
            )}
          </Logs>
        </LogSection>
      </AccountPageContainer>
      <Footer />
    </>
  );
}
