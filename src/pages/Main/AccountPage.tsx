import tw, { styled } from 'twin.macro';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import TotalPrice from '../../components/Main/TotalPrice';
import GreenBtnSet from '../../components/Main/GreenBtnSet';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import { useEffect, useRef, useState } from 'react';
import WithdrawDeposit from '../../components/Main/WithdrawDeposit';
import { getUserAccountAmount } from '../../api/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getUserAccountLog } from '../../api/holding';
import { AccountLogType } from '../../types/user_product';

type LogType = 'deposit' | 'withdrawal';

type LogProps = {
  log: number;
};

const AccountPageContainer = styled.div`
  ${tw`flex flex-col gap-8 px-5 pt-22 w-full`}
  box-sizing: border-box;
  overflow: hidden;
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
  ${tw`flex flex-col gap-4`}
  overflow-y: scroll;
  height: calc(100vh - 400px);
`;

const Log = styled.div`
  ${tw`flex flex-row justify-between py-3 px-2`}
`;

const LogDateContainer = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const LogTypeComponent = styled.div<LogProps>`
  ${tw`text-sm`}
  ${({ log }) => {
    return log === 1 ? tw`text-red` : tw`text-green`;
  }}
`;

const DateContainer = styled.div`
  ${tw`text-black40 text-sm`}
  box-sizing: border-box;
`;

const LogRightSection = styled.div`
  ${tw`flex flex-col gap-1 items-end`}
`;

const LogTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 40vw;
`;

const NoLog = styled.div`
  ${tw`w-full text-center text-black40`}
`;

export default function AccountPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<LogType>('deposit');
  const [accountAmount, setAccountAmount] = useState<number>(0);
  const [logData, setLogData] = useState<AccountLogType[]>([]);
  const [page, setPage] = useState<number>(0);
  const stdRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [isLast, setIsLast] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  function onClickDeposit() {
    setModal(true);
    setModalType('deposit');
  }

  function onClickWithdraw() {
    setModal(true);
    setModalType('withdrawal');
  }

  function getUserAccountLogAxios(page: number, reset: boolean) {
    getUserAccountLog({
      userId: user.user.id,
      token: user.token,
      page: page,
      size: 8,
    }).then((data) => {
      if (data.data.success) {
        if (reset) {
          setPage(1);
          setLogData(data.data.response);
        } else {
          setPage(page + 1);
          setLogData([...logData, ...data.data.response]);
        }
      } else {
        setLogData([...logData]);
        setIsLast(true);
      }
    });
  }

  function onScroll() {
    if (!isLast) {
      if (logRef.current && stdRef.current) {
        const std = stdRef.current.getBoundingClientRect();
        const sRef = logRef.current.getBoundingClientRect();
        if (std.bottom <= sRef.bottom + 20) {
          getUserAccountLogAxios(page, false);
        }
      }
    }
  }

  useEffect(() => {
    getUserAccountAmount({
      userId: user.user.id,
      token: user.token,
    }).then((data) => {
      if (data.data.response.cash) {
        setAccountAmount(data.data.response.cash);
      }
    });
    getUserAccountLogAxios(0, true);
    setIsLast(false);
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [modal]);

  return (
    <>
      {modal && (
        <BottomUpModal
          isOpen={modal}
          onClose={() => setModal(false)}
          content={<WithdrawDeposit type={modalType} setModal={setModal} />}
        />
      )}
      <Navbar
        type="back"
        name="back"
        onClick={() => {
          navigate('/main');
        }}
      />
      <AccountPageContainer>
        <AccountDetailSection>
          <GreenBarTitle text="입출금" />
          <AccountDetail>
            <TotalPrice text="출금 가능 금액" price={accountAmount} />
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
          <Logs ref={logRef} onScroll={onScroll}>
            {logData.length === 0 ? (
              <NoLog>입출금 내역이 없습니다.</NoLog>
            ) : (
              logData.map((log, idx) => {
                return (
                  <Log key={idx}>
                    <LogDateContainer>
                      <LogTypeComponent log={log.inOutType}>
                        {log.inOutType === 1 ? '입금' : '출금'}
                      </LogTypeComponent>
                      <DateContainer>
                        {new Date(log.inOutTime)
                          .toISOString()
                          .replace('T', ' ')
                          .replace('.000Z', '')}
                      </DateContainer>
                    </LogDateContainer>
                    <LogRightSection>
                      <div>{log.inOutCash.toLocaleString()}원</div>
                      <LogTitle>{log.inOutTitle}</LogTitle>
                    </LogRightSection>
                  </Log>
                );
              })
            )}
            <div ref={stdRef}></div>
          </Logs>
        </LogSection>
      </AccountPageContainer>
      <Footer />
    </>
  );
}
