import tw, { css, styled } from 'twin.macro';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { investmentTypeToString } from '../../../utils/investmentType';
import { getUserAccountAmount } from '../../../api/auth';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  makeCombiStocks,
  setTotalInvestment,
} from '../../../store/reducers/stocks/stocks';
import Chart from '../../../assets/chartIcon.svg';
import Edit from '../../../assets/edit.svg';

const PersonalContainer = styled.div`
  ${tw`w-full flex px-3 py-4 justify-between items-end box-border`}
`;

const ColContainer = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const TypeContainer = styled.div`
  ${tw`flex gap-2 items-end`}
`;

const MoneyContainer = styled.div`
  ${tw`flex gap-2 items-end px-1`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Title = styled.span`
  ${tw`text-[1rem] flex gap-1 items-end`}
  ${css`
    color: rgba(0, 0, 0, 0.8);
  `}
`;

const PersonData = styled.span`
  ${tw`text-[1.3rem] px-1`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(82, 147, 208, 0.5);
    line-height: 28px;
  `}
`;

const Icon = styled.img`
  ${tw`w-4`}
`;

const PersonalInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as number | undefined;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const wantInvestmentPrice = useSelector(
    (state: RootState) => state.stocks.totalInvestment,
  );

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
      <ColContainer>
        <TypeContainer>
          <PersonData>
            {investmentTypeToString(user.user.investmentType)}
          </PersonData>
          <Title>인 당신이</Title>
        </TypeContainer>
        <MoneyContainer>
          <PersonData>{wantInvestmentPrice.toLocaleString()} 원</PersonData>
          <Icon
            src={Edit}
            onClick={() => {
              navigate('/asset/reset');
            }}
          />
          <Title>을 투자하면,</Title>
        </MoneyContainer>
      </ColContainer>
    </PersonalContainer>
  );
};
export default PersonalInfo;
