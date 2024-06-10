import React from 'react';
import tw, { styled } from 'twin.macro';
import { PlanDetailType } from './SalaryPlan';

type CalendarProps = {
  type: 'week' | 'month';
  year: number;
  month: number;
  date: number;
  setDate: React.Dispatch<React.SetStateAction<number>>;
  day: number;
  plans: PlanDetailType[];
  width: number;
  openModal: () => void;
};

type CalendarContainerProps = {
  width: number;
};

type DayProps = {
  day: string;
};

type DateCellProps = {
  inThisMonth: boolean;
};

type DateTextProps = {
  day: number;
};

type SalaryPlanProps = {
  type: '배당' | '에너지' | '부동산';
};

const CalendarContainer = styled.div<CalendarContainerProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ${({ width }) => `width: ${width}px;`}
`;

const Day = styled.div<DayProps>`W
  width: 100%;
  height: 20px;
  ${({ day }) =>
    day === '일' ? tw`text-red` : day === '토' ? tw`text-blue` : tw`text-black`}
  padding: 0px 5px;
  border-top-style: solid;
  border-top-width: 0.5px;
  border-bottom-style: solid;
  border-bottom-width: 0.5px;
  box-sizing: border-box;
  ${tw`border-black20`}
  ${tw`text-sm`}
  line-height: 20px;
`;

const DateCell = styled.div<DateCellProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120px;
  border-style: solid;
  border-width: 0.5px;
  box-sizing: border-box;
  ${tw`border-black10`}
  ${({ inThisMonth }) => (inThisMonth ? null : 'opacity: 0.3;')}
  ${tw`text-sm`}
`;

const DateText = styled.div<DateTextProps>`
  ${({ day }) =>
    day === 0 ? tw`text-red` : day === 6 ? tw`text-blue` : tw`text-black`}
  padding: 5px;
  box-sizing: border-box;
`;

const SalaryPlan = styled.div<SalaryPlanProps>`
  ${({ type }) =>
    type === '배당'
      ? 'background-color: #E9F1D6;'
      : type === '부동산'
        ? 'background-color: #A4C3B2;'
        : 'background-color: #AFDBD1;'}
  ${tw`h-3`}
  width: 100%;
`;

export default function Calendar({
  type,
  year,
  month,
  date,
  setDate,
  day,
  plans,
  width,
  openModal,
}: CalendarProps) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const startDate =
    type == 'month' ? 1 - new Date(year, month, 1).getDay() : date - day;

  const datesCount =
    type == 'month'
      ? new Date(year, month + 1, 0).getDate() +
        new Date(year, month, 1).getDay() +
        6 -
        new Date(year, month + 1, 0).getDay()
      : 7;

  const dates: Date[] = [];

  for (let i = 0; i < datesCount; i++) {
    const currentDate = new Date(year, month, startDate + i);
    dates.push(currentDate);
  }

  return (
    <CalendarContainer width={width}>
      {days.map((day, idx) => {
        return (
          <Day key={idx} day={day}>
            {day}
          </Day>
        );
      })}
      {dates.map((date, idx) => {
        return (
          <DateCell
            key={idx}
            inThisMonth={date.getMonth() === month ? true : false}
            onClick={() => {
              openModal();
              setDate(date.getDate());
            }}
          >
            <DateText day={date.getDay()}>{date.getDate()}</DateText>
            {plans.map((plan, i) => {
              return <SalaryPlan key={i} type={plan.type}></SalaryPlan>;
            })}
          </DateCell>
        );
      })}
    </CalendarContainer>
  );
}
