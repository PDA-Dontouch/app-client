import tw, { css, styled } from 'twin.macro';
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
import { CalendarP2PType } from '../types/energy_product';
import {
  getHoldingEnergyCalendar,
  getHoldingEstateCalendar,
} from '../api/holding';
import DropDown from '../assets/drop-down.svg';
import ScrollToTop from '../hooks/ScrollToTop';

type ModalType = 'date' | 'plan';

const CalendarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${tw`gap-2 pt-[57px] pb-[68px]`};
`;

const CalendarTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  ${tw`px-6 py-8`};
  box-sizing: border-box;
`;

const YearMonth = styled.div`
  ${tw`text-[1.3rem] flex gap-2 items-center`}
`;

const SalaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: flex-end;
`;

const SalaryText = styled.div`
  ${tw`text-[0.9rem]`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(82, 147, 208, 0.5);
    line-height: 26px;
  `}
`;

const Salary = styled.div`
  ${tw`text-[1.2rem] leading-7`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(82, 147, 208, 0.5);
    line-height: 26px;
  `}
`;

const Img = styled.img`
  ${tw``}
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
  const [energyPlans, setEnergyPlans] = useState<CalendarP2PType[]>([]);
  const [estatePlans, setEstatePlans] = useState<CalendarP2PType[]>([]);
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
      startDate: new Date(year, month, startDate),
      endDate: new Date(year, month, startDate + datesCount),
    }).then((data) => {
      let total = 0;
      if (data.data.success) {
        total = data.data.response.reduce((accumulator, stock) => {
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
        }, 0);
        setStockPlans(data.data.response);
      }

      getEnergyPlans(total);
    });
  }, [year, month, exchangeRate]);

  const getEnergyPlans = useCallback(
    (total: number) => {
      getHoldingEnergyCalendar({
        token: user.token,
        startDate: new Date(year, month, startDate),
        endDate: new Date(year, month, startDate + datesCount),
      }).then((data) => {
        let totalSalary = 0;
        if (data.data.success) {
          setEnergyPlans(data.data.response);
          totalSalary = data.data.response.reduce((accumulator, product) => {
            if (new Date(product.paymentDate).getMonth() === month) {
              return accumulator + product.dividendPrice;
            } else {
              return accumulator;
            }
          }, 0);
        }
        getEstatePlans(total + totalSalary);
      });
    },
    [year, month, exchangeRate],
  );

  const getEstatePlans = useCallback(
    (total: number) => {
      getHoldingEstateCalendar({
        token: user.token,
        startDate: new Date(year, month, startDate),
        endDate: new Date(year, month, startDate + datesCount),
      }).then((data) => {
        let totalSalary = 0;
        if (data.data.success) {
          totalSalary = data.data.response.reduce((accumulator, product) => {
            if (new Date(product.paymentDate).getMonth() === month) {
              return accumulator + product.dividendPrice;
            } else {
              return accumulator;
            }
          }, 0);
          setEstatePlans(data.data.response);
        }
        setTotalSalary(total + totalSalary);
      });
    },
    [year, month, exchangeRate],
  );

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
          isOpen={modal}
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
      <Navbar name={user.user.nickname} type="main" onClick={() => {}} />
      <ScrollToTop />
      <CalendarPageContainer>
        <CalendarTitle>
          <YearMonth
            onClick={() => {
              onOpenModal('date');
            }}
          >
            {year}.{month + 1 < 10 ? '0' + (month + 1).toString() : month + 1}
            <Img src={DropDown} />
          </YearMonth>
          <SalaryContainer>
            <SalaryText>이번달 월급 &nbsp;</SalaryText>
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
          energyPlans={energyPlans}
          estatePlans={estatePlans}
          openModal={() => {
            onOpenModal('plan');
          }}
        />
      </CalendarPageContainer>
      <Footer />
    </>
  );
}
