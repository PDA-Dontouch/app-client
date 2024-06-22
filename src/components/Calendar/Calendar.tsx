import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { CalendarStockPlanType } from '../../types/stocks_product';
import { CalendarP2PType } from '../../types/energy_product';

type CalendarProps = {
  startDate: number;
  datesCount: number;
  year: number;
  month: number;
  setDate: React.Dispatch<React.SetStateAction<number>> | null;
  stockPlans: CalendarStockPlanType[];
  energyPlans: CalendarP2PType[];
  estatePlans: CalendarP2PType[];
  openModal: () => void;
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
  type: '주식' | '에너지' | '부동산';
};

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
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
  ${tw`text-xs`}
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
    type === '주식'
      ? 'background-color: #E9F1D6;'
      : type === '부동산'
        ? 'background-color: #A4C3B2;'
        : 'background-color: #AFDBD1;'}
  ${tw`h-3`}
  width: 100%;
`;

export default function Calendar({
  startDate,
  datesCount,
  year,
  month,
  setDate,
  stockPlans,
  energyPlans,
  estatePlans,
  openModal,
}: CalendarProps) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const dates: Date[] = [];

  for (let i = 0; i < datesCount; i++) {
    const currentDate = new Date(year, month, startDate + i);
    dates.push(currentDate);
  }

  return (
    <CalendarContainer>
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
            onClick={
              date.getMonth() === month && setDate
                ? () => {
                    openModal();
                    setDate(date.getDate());
                  }
                : () => {}
            }
          >
            <DateText day={date.getDay()}>{date.getDate()}</DateText>
            {stockPlans.map((plan, i) => {
              const dividendDate = new Date(plan.dividendDate);
              if (
                dividendDate.getMonth() === date.getMonth() &&
                dividendDate.getDate() === date.getDate()
              )
                return <SalaryPlan key={i} type={'주식'}></SalaryPlan>;
            })}
            {energyPlans.map((plan, i) => {
              const dividendDate = new Date(plan.paymentDate);
              if (
                dividendDate.getMonth() === date.getMonth() &&
                dividendDate.getDate() === date.getDate()
              )
                return <SalaryPlan key={i} type={'에너지'}></SalaryPlan>;
            })}
            {estatePlans.map((plan, i) => {
              const dividendDate = new Date(plan.paymentDate);
              if (
                dividendDate.getMonth() === date.getMonth() &&
                dividendDate.getDate() === date.getDate()
              )
                return <SalaryPlan key={i} type={'부동산'}></SalaryPlan>;
            })}
          </DateCell>
        );
      })}
    </CalendarContainer>
  );
}
