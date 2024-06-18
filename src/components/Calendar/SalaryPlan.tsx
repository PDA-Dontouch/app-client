import tw, { styled } from 'twin.macro';
import { CalendarStockPlanType } from '../../types/stocks_product';
import { useEffect, useState } from 'react';
import { calendarStockPlans } from '../../api/stocks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type SalaryPlanProps = {
  date: Date;
};

const PlanContainer = styled.div`
  ${tw`w-full flex flex-col gap-5`}
  box-sizing: border-box;
`;

const Today = styled.div`
  ${tw`w-full text-lg text-gray-dark`}
  text-align: center;
`;

const Plans = styled.div`
  ${tw`w-full flex flex-col gap-3 p-2`}
  overflow: scroll;
  height: 260px;
  box-sizing: border-box;
`;

const Plan = styled.div`
  ${tw`w-full flex flex-row gap-3 px-3 py-4 bg-[white] text-sm`}
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
`;

const PlanType = styled.div`
  width: 50px;
  text-align: center;
`;

const PlanDetail = styled.div`
  ${tw`w-full flex flex-row justify-between`}
`;

const PlanName = styled.div`
  ${tw`w-4/5`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10rem;
`;

const PlanPrice = styled.div``;

const TotalPrice = styled.div`
  ${tw`w-full text-green-dark`}
  text-align:right
`;

export default function SalaryPlan({ date }: SalaryPlanProps) {
  const [stockPlans, setStockPlans] = useState<CalendarStockPlanType[]>([]);
  const token = useSelector((state: RootState) => state.user.token);
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
  );
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + 60 * 60 * 1000);

  useEffect(() => {
    calendarStockPlans({
      token: token,
      endDate: newDate,
      startDate: newDate,
    }).then((data) => {
      setStockPlans(data.data.response);
    });
  }, []);

  return (
    <>
      <PlanContainer>
        <Today>
          {date.getFullYear()}.{date.getMonth() < 9 && '0'}
          {date.getMonth() + 1}.{date.getDate() < 10 && '0'}
          {date.getDate()}
        </Today>
        <Plans>
          {stockPlans.map((plan, idx) => {
            return (
              <Plan key={idx}>
                <PlanType>주식</PlanType>
                <PlanDetail>
                  <PlanName>{plan.name}</PlanName>
                  <PlanPrice>
                    {'A' <= plan.symbol.charAt(0) &&
                    plan.symbol.charAt(0) <= 'Z'
                      ? (plan.dividend * exchangeRate).toLocaleString()
                      : plan.dividend.toLocaleString()}
                    원
                  </PlanPrice>
                </PlanDetail>
              </Plan>
            );
          })}
        </Plans>
        <TotalPrice>
          {'총 '}
          {stockPlans
            .reduce((accumulator, stock) => {
              if (
                'A' <= stock.symbol.charAt(0) &&
                stock.symbol.charAt(0) <= 'Z'
              ) {
                return accumulator + stock.dividend * exchangeRate;
              } else {
                return accumulator + stock.dividend;
              }
            }, 0)
            .toLocaleString()}
          {' 원'}
        </TotalPrice>
      </PlanContainer>
    </>
  );
}
