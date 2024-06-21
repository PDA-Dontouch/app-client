import tw, { styled } from 'twin.macro';
import Calendar from '../components/Calendar/Calendar';
import { useCallback, useEffect, useState } from 'react';
import BottomUpModal from '../components/common/Modal/BottomUpModal';
import SelectYearMonth from '../components/Calendar/SelectYearMonth';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SalaryPlan from '../components/Calendar/SalaryPlan';
import { calendarStockPlans, getExchangeRate } from '../api/stocks';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CalendarStockPlanType } from '../types/stocks_product';

type ModalType = 'date' | 'plan';

const CalendarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${tw`gap-10`};
  padding-top: 80px;
  padding-bottom: 80px;
`;

const CalendarTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  ${tw`px-6`};
  box-sizing: border-box;
`;

const GreenBar = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  ${tw`h-1/2`};
  background-color: #1aa76e66;
`;

const YearMonth = styled.div`
  ${tw`text-3xl`}
`;

const SalaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: flex-end;
  ${tw`gap-2`};
`;

const SalaryText = styled.div`
  ${tw`text-sm`}
  ${tw`leading-7`}
`;

const Salary = styled.div`
  ${tw`text-xl`}
  ${tw`leading-7`}
`;

export default function CalendarPage() {
  const [modal, setModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>('date');
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());
  const [date, setDate] = useState<number>(today.getDate());
  const user = useSelector((state: RootState) => state.user);
  const [stockPlans, setStockPlans] = useState<CalendarStockPlanType[]>([]);
  const [totalSalary, setTotalSalary] = useState<number>(0);
  const startDate = 1 - new Date(year, month, 1).getDay();
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const datesCount =
    new Date(year, month + 1, 0).getDate() +
    new Date(year, month, 1).getDay() +
    6 -
    new Date(year, month + 1, 0).getDay();

  function onOpenModal(type: ModalType) {
    if (type == 'date') {
      setModalType('date');
    } else {
      setModalType('plan');
    }

    setModal(true);
  }

  const getPlans = useCallback(() => {
    calendarStockPlans({
      userId: user.user.id,
      token: user.token,
      startDate: new Date(year, month, startDate + 1),
      endDate: new Date(year, month, startDate + datesCount + 1),
    }).then((data) => {
      const totalStockSalary = data.data.response.reduce(
        (accumulator, stock) => {
          if (new Date(stock.dividendDate).getMonth() === month) {
            if (
              'A' <= stock.symbol.charAt(0) &&
              stock.symbol.charAt(0) <= 'Z'
            ) {
              return accumulator + stock.dividend * exchangeRate;
            } else {
              return accumulator + stock.dividend;
            }
          } else {
            return accumulator;
          }
        },
        0,
      );
      setStockPlans(data.data.response);

      setTotalSalary(totalStockSalary);
    });
  }, [year, month, exchangeRate]);

  const expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + 60 * 60 * 1000);

  useEffect(() => {
    getPlans();
    getExchangeRate().then((data) => {
      setExchangeRate(data.data.response.selling);
    });
  }, [year, month, exchangeRate]);

  return (
    <>
      {modal && (
        <BottomUpModal
          onClose={() => setModal(false)}
          content={
            modalType === 'date' ? (
              <SelectYearMonth
                year={year}
                setYear={setYear}
                month={month}
                setMonth={setMonth}
                setModal={setModal}
              />
            ) : (
              <SalaryPlan date={new Date(year, month, date)} />
            )
          }
        />
      )}
      <CalendarPageContainer>
        <Navbar name="박유진" type="main" onClick={() => {}} />
        <CalendarTitle>
          <YearMonth
            onClick={() => {
              onOpenModal('date');
            }}
          >
            {year}.{month + 1 < 10 ? '0' + (month + 1).toString() : month + 1}
          </YearMonth>
          <SalaryContainer>
            <GreenBar></GreenBar>
            <SalaryText>이번달 월급</SalaryText>
            <Salary>{Math.floor(totalSalary).toLocaleString()} 원</Salary>
          </SalaryContainer>
        </CalendarTitle>

        <Calendar
          startDate={startDate}
          datesCount={datesCount}
          year={year}
          month={month}
          setDate={setDate}
          stockPlans={stockPlans}
          openModal={() => {
            onOpenModal('plan');
          }}
        />
        <Footer />
      </CalendarPageContainer>
    </>
  );
}
