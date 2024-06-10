import tw, { styled } from 'twin.macro';

type SalaryPlanProps = {
  date: Date;
  plans: PlanDetailType[];
};

export type PlanDetailType = {
  type: '배당' | '에너지' | '부동산';
  name: string;
  price: number;
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

const PlanName = styled.div``;

const PlanPrice = styled.div``;

const TotalPrice = styled.div`
  ${tw`w-full text-green-dark`}
  text-align:right
`;

export default function SalaryPlan({ date, plans }: SalaryPlanProps) {
  return (
    <>
      <PlanContainer>
        <Today>
          {date.getFullYear()}.{date.getMonth() < 9 && '0'}
          {date.getMonth() + 1}.{date.getDate() < 10 && '0'}
          {date.getDate()}
        </Today>
        <Plans>
          {plans.map((plan, idx) => {
            return (
              <Plan key={idx}>
                <PlanType>{plan.type}</PlanType>
                <PlanDetail>
                  <PlanName>{plan.name}</PlanName>
                  <PlanPrice>{plan.price.toLocaleString()}원</PlanPrice>
                </PlanDetail>
              </Plan>
            );
          })}
        </Plans>
        <TotalPrice>
          {'총 '}
          {plans
            .reduce((accumulator, currentValue) => {
              return accumulator + currentValue.price;
            }, 0)
            .toLocaleString()}
          {' 원'}
        </TotalPrice>
      </PlanContainer>
    </>
  );
}
