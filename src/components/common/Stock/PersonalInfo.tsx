import tw, { css, styled } from 'twin.macro';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { investmentTypeToString } from '../../../utils/investmentType';
import { getUserAccountAmount } from '../../../api/auth';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeCombiStocks, setTotalInvestment } from '../../../store/reducers/stocks/stocks';


const PersonalContainer = styled.div`
  ${tw`w-full flex flex-col gap-3`}
`;
const TopContainer = styled.div`
  ${tw`flex flex-row justify-between`}
`;
const TypeContainer = styled.div`
  ${tw`flex flex-col gap-3`}
  width: 6rem;
`;
const MoneyContainer = styled.div`
  ${tw`flex flex-col gap-3`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 15rem;
`;
const BtnContainer = styled.div`
  ${tw`flex w-full gap-2 mt-2 justify-end`}
`;
const Title = styled.span`
  ${tw`text-sm ml-2`}
  ${css`
    color: rgba(0, 0, 0, 0.4);
  `}
`;
const PersonData = styled.span`
  ${tw`text-base`}
`;
const Btn = styled.button`
  ${tw`text-sm w-full`}
  ${({ color }) => {
    return color == 'green' ? tw`bg-green text-white` : tw`bg-white text-green`;
  }}
  border-radius: 12px;
  border: none;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.15);
`;
const PersonalInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as number | undefined;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const wantInvestmentPrice = useSelector((state:RootState)=> state.stocks.totalInvestment);

  const [accountAmount, setAccountAmount] = useState<number>(0);
  useEffect(() => {
    if (state) {
      setAccountAmount(state);
      dispatch(setTotalInvestment(state));
      dispatch(makeCombiStocks(state));
    } else {
      getUserAccountAmount({
        token: user.token,
        userId: user.user.id,
      }).then((response) => {
        setAccountAmount(response.data.response.cash);
        dispatch(setTotalInvestment(response.data.response.cash));
        dispatch(makeCombiStocks(response.data.response.cash));
      });
    }
  }, []);
  return (
    <PersonalContainer>
      <TopContainer>
        <TypeContainer>
          <Title>투자 성향</Title>
          <PersonData>
            {investmentTypeToString(user.user.investmentType)}
          </PersonData>
        </TypeContainer>
        <BtnContainer>
          <Btn
            onClick={() => {
              navigate('/typetest', { state: { nav: true } });
            }}
          >
            테스트 다시하기
          </Btn>
          <Btn
            color="green"
            onClick={() => {
              navigate('/asset/reset');
            }}
          >
            투자금액 변경
          </Btn>
        </BtnContainer>
      </TopContainer>
      <MoneyContainer>
        <Title>투자 금액</Title>
        <PersonData>{wantInvestmentPrice.toLocaleString()} 원</PersonData>
      </MoneyContainer>
    </PersonalContainer>
  );
};
export default PersonalInfo;
