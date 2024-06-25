import tw, { styled } from 'twin.macro';
import { CalendarStockPlanType } from '../../types/stocks_product';
import { useEffect, useState } from 'react';
import { calendarStockPlans, getExchangeRate } from '../../api/stocks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  getHoldingEnergyCalendar,
  getHoldingEstateCalendar,
} from '../../api/holding';
import { CalendarP2PType } from '../../types/energy_product';
import Nothing from '../Main/Nothing';

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
  ${tw`w-full flex flex-col gap-3 py-2`}
  overflow: scroll;
  height: 260px;
  box-sizing: border-box;
`;

const Plan = styled.div`
  ${tw`w-full flex flex-row gap-3 px-3 py-4 bg-[white] text-sm`}
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.05);
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
  const [energyPlans, setEnergyPlans] = useState<CalendarP2PType[]>([]);
  const [estatePlans, setEstatePlans] = useState<CalendarP2PType[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
  );
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  useEffect(() => {
    calendarStockPlans({
      token: user.token,
      userId: user.user.id,
      endDate: newDate,
      startDate: newDate,
    }).then((data) => {
      if (data.data.success) setStockPlans(data.data.response);
    });

    getHoldingEnergyCalendar({
      token: user.token,
      endDate: newDate,
      startDate: newDate,
    }).then((data) => {
      if (data.data.success) setEnergyPlans(data.data.response);
    });

    getHoldingEstateCalendar({
      token: user.token,
      endDate: newDate,
      startDate: newDate,
    }).then((data) => {
      if (data.data.success) setEstatePlans(data.data.response);
    });

    getExchangeRate().then((data) => {
      if (data.data.success) setExchangeRate(data.data.response.selling);
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
          {stockPlans.length == 0 &&
          energyPlans.length == 0 &&
          estatePlans.length == 0 ? (
            <Nothing />
          ) : (
            stockPlans.map((plan, idx) => {
              return (
                <Plan key={idx}>
                  <PlanType>주식</PlanType>
                  <PlanDetail>
                    <PlanName>{plan.name}</PlanName>
                    <PlanPrice>
                      {Math.floor(
                        plan.dividend,
                      ).toLocaleString()}
                      원
                    </PlanPrice>
                  </PlanDetail>
                </Plan>
              );
            })
          )}
          {energyPlans.map((plan, idx) => {
            return (
              <Plan key={idx}>
                <PlanType>에너지</PlanType>
                <PlanDetail>
                  <PlanName>{plan.title}</PlanName>
                  <PlanPrice>
                    {Math.floor(plan.dividendPrice).toLocaleString()}원
                  </PlanPrice>
                </PlanDetail>
              </Plan>
            );
          })}
          {estatePlans.map((plan, idx) => {
            return (
              <Plan key={idx}>
                <PlanType>부동산</PlanType>
                <PlanDetail>
                  <PlanName>{plan.title}</PlanName>
                  <PlanPrice>
                    {Math.floor(plan.dividendPrice).toLocaleString()}원
                  </PlanPrice>
                </PlanDetail>
              </Plan>
            );
          })}
        </Plans>
        <TotalPrice>
          {'총 '}
          {Math.floor(
            stockPlans.reduce((accumulator, stock) => {
                return accumulator + stock.dividend;
              
            }, 0) +
              energyPlans.reduce((accumulator, stock) => {
                return accumulator + stock.dividendPrice;
              }, 0) +
              estatePlans.reduce((accumulator, stock) => {
                return accumulator + stock.dividendPrice;
              }, 0),
          ).toLocaleString()}
          {' 원'}
        </TotalPrice>
      </PlanContainer>
    </>
  );
}
