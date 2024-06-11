import tw, { styled } from 'twin.macro';
import Calendar from '../components/Calendar/Calendar';
import { useState } from 'react';
import BottomUpModal from '../components/common/Modal/BottomUpModal';
import SelectYearMonth from '../components/Calendar/SelectYearMonth';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SalaryPlan, { PlanDetailType } from '../components/Calendar/SalaryPlan';

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
  ${tw`h-3`};
  background-color: #1aa76e66;
`;

const YYMM = styled.div`
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

export const salaryData: PlanDetailType[] = [
  {
    type: '배당',
    name: '삼성전자',
    price: 1200,
  },
  {
    type: '에너지',
    name: '삼성전자',
    price: 21955,
  },
  {
    type: '부동산',
    name: '울산 행복아파트',
    price: 40560,
  },
  {
    type: '배당',
    name: '삼성전자',
    price: 1200,
  },
  {
    type: '에너지',
    name: '삼성전자',
    price: 21955,
  },
];

export default function CalendarPage() {
  const [modal, setModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>('date');
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());
  const [date, setDate] = useState<number>(today.getDate());
  const day = today.getDay();

  function onOpenModal(type: ModalType) {
    if (type == 'date') {
      setModalType('date');
    } else {
      setModalType('plan');
    }

    setModal(true);
  }

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
              <SalaryPlan
                date={new Date(year, month, date)}
                plans={salaryData}
              />
            )
          }
        />
      )}
      <CalendarPageContainer>
        <Navbar name="박유진" type="main" onClick={() => {}} />
        <CalendarTitle>
          <YYMM
            onClick={() => {
              onOpenModal('date');
            }}
          >
            {year}.{month + 1 < 10 ? '0' + (month + 1).toString() : month + 1}
          </YYMM>
          <SalaryContainer>
            <GreenBar></GreenBar>
            <SalaryText>이번달 월급</SalaryText>
            <Salary>402,000 원</Salary>
          </SalaryContainer>
        </CalendarTitle>
        <Calendar
          type="month"
          year={year}
          month={month}
          setMonth={setMonth}
          date={date}
          setDate={setDate}
          day={day}
          plans={salaryData}
          openModal={() => {
            onOpenModal('plan');
          }}
        />
        <Footer />
      </CalendarPageContainer>
    </>
  );
}
