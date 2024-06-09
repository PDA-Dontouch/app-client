import tw, { styled } from 'twin.macro';
import Calendar from '../components/Calendar/Calendar';
import { useEffect, useState } from 'react';

const CalendarMainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${tw`gap-10`};
`;

const CalendarMainTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  ${tw`px-7`};
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

export default function CalendarMainPage() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());
  const [date, setDate] = useState<number>(today.getDate());
  const [day, setDay] = useState<number>(today.getDay());

  useEffect(() => {}, []);

  return (
    <CalendarMainPageContainer>
      <CalendarMainTitle>
        <YYMM>
          {year}.{month < 10 ? '0' + month.toString() : month}
        </YYMM>
        <SalaryContainer>
          <GreenBar></GreenBar>
          <SalaryText>이번달 월급</SalaryText>
          <Salary>402,000 원</Salary>
        </SalaryContainer>
      </CalendarMainTitle>
      <Calendar
        type="month"
        year={year}
        month={month}
        date={date}
        day={day}
        width={document.body.clientWidth}
      />
    </CalendarMainPageContainer>
  );
}
