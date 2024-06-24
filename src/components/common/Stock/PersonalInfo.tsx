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
  ${tw`flex flex-col gap-2`}
`;

const MoneyContainer = styled.div`
  ${tw`flex flex-col gap-2`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Title = styled.span`
  ${tw`text-sm flex gap-1 items-end`}
  ${css`
    color: rgba(0, 0, 0, 0.4);
  `}
`;

const PersonData = styled.span`
  ${tw`text-xl`}
`;

const Img = styled.img`
  ${tw`w-[80px]`}
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
          <Title>투자 성향</Title>
          <PersonData>
            {investmentTypeToString(user.user.investmentType)}
          </PersonData>
        </TypeContainer>
        <MoneyContainer>
          <Title>
            투자 금액
            <Icon
              src={Edit}
              onClick={() => {
                navigate('/asset/reset');
              }}
            />
          </Title>
          <PersonData>{wantInvestmentPrice.toLocaleString()} 원</PersonData>
        </MoneyContainer>
      </ColContainer>
      <Img src={Chart} />
    </PersonalContainer>
  );
};
export default PersonalInfo;
