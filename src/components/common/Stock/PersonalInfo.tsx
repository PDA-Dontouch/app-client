import tw, { css, styled } from 'twin.macro';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch,useSelector } from 'react-redux';
import { investmentTypeToString } from '../../../utils/investmentType';
import { getUserAccountAmount } from '../../../api/auth';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeCombiStocks } from '../../../store/reducers/stocks/stocks';

import { useDispatch, useSelector } from 'react-redux';
import { investmentTypeToString } from '../../../utils/investmentType';
import { getUserAccountAmount } from '../../../api/auth';
import { useEffect, useState } from 'react';

const PersonalContainer = styled.div`
  ${tw`w-full flex flex-col gap-3`}
`;

const TopContainer = styled.div`
  ${tw`flex flex-row justify-between`}
  ${tw`w-full flex flex-row gap-20`}
  ${css`
    height: 40vw;
  `}
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

const TextContainer = styled.div`
  ${tw`flex flex-col gap-3 m-2 ml-4`}
  ${css`
    height: 90%;
  `}
`;
const IconContainer = styled.div`
  ${tw`flex items-center justify-center mt-5 mb-5`}
  ${css`
    height: 70%;
    aspect-ratio: 1;
  `}
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

  const [accountAmount, setAccountAmount] = useState<number>(0);

  useEffect(() => {
    if (state) {
      setAccountAmount(state);
      dispatch(makeCombiStocks(state));
    } else {
      getUserAccountAmount({
        token: user.token,
        userId: user.user.id,
      }).then((response) => {
        setAccountAmount(response.data.response.cash);
        dispatch(makeCombiStocks(response.data.response.cash));
      });
    }
  }, []);
  const user = useSelector((state: RootState) => state.user);
  const [accountAmount, serAccountAmount] = useState<number>(0);

  useEffect(() => {
    getUserAccountAmount({
      token: user.token,
      userId: user.user.id,
    }).then((response) => {
      console.log(response);
      serAccountAmount(response.data.response.cash);
    });
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
      <TextContainer>
        <Title>투자 성향</Title>
        <PersonData>
          {investmentTypeToString(user.user.investmentType)}
        </PersonData>
        <Title>투자 금액</Title>
        <PersonData>{accountAmount.toLocaleString()} 원</PersonData>
      </MoneyContainer>
        <PersonData>{accountAmount} 만원</PersonData>
      </TextContainer>
      <IconContainer>
        <Icon src={charIcon} />
      </IconContainer>
    </PersonalContainer>
  );
};

export default PersonalInfo;
