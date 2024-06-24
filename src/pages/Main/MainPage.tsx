import tw, { css, styled } from 'twin.macro';
import arrowImg from '../../assets/arrow.svg';
import Calendar from '../../components/Calendar/Calendar';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import darkRedHeartImg from '../../assets/dark-red-heart.svg';
import testBlueImg from '../../assets/test-blue.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CalendarStockPlanType } from '../../types/stocks_product';
import SalaryPlan from '../../components/Calendar/SalaryPlan';
import {
  calendarStockPlans,
  getExchangeRate,
  getHoldingStocks,
} from '../../api/stocks';
import { investmentTypeToString } from '../../utils/investmentType';
import { getUserAccountAmount } from '../../api/auth';
import {
  getHoldingEnergyCalendar,
  getHoldingEstateCalendar,
  getUserTotalEnergy,
  getUserTotalEstate,
} from '../../api/holding';
import { CalendarP2PType } from '../../types/energy_product';
import ScrollToTop from '../../hooks/ScrollToTop';

type TitleNameProps = {
  type: 'name' | 'nim';
};

type AssetDetailCommonProps = {
  type: string;
  price: number;
  onClick: () => void;
};

const MyPageContainer = styled.div`
  ${tw`flex flex-col gap-8 px-5 pt-22 pb-22 w-full`}
  box-sizing: border-box;
`;

const TitleNameContainer = styled.div`
  ${tw`flex flex-row items-end ps-[0.2rem] w-full`}
  box-sizing: border-box;
`;

const TitleName = styled.div<TitleNameProps>`
  ${({ type }) => (type === 'name' ? tw`text-[1.2rem]` : tw`text-[1rem]`)}
  ${tw`flex flex-col h-full`}
`;

const TitleInvestmentType = styled.div`
  ${tw`text-[1.2rem]`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(82, 147, 208, 0.5);
  `}
`;

const ThisMonthSalaryContainer = styled.div`
  ${tw`bg-green text-white flex flex-col gap-3 w-full`}
  border-radius: 12px;
  padding: 26px 20px;
  box-sizing: border-box;
`;

const ThisMonthSalaryTitle = styled.div`
  ${tw`text-[0.8rem]`}
`;

const ThisMonthSalaryNumber = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;

const CalendarContainer = styled.div`
  ${tw`gap-3 w-full flex flex-col px-1 box-border`}
`;

const CalendarGoToThisMonth = styled.div`
  ${tw`flex flex-row gap-2 items-center`}
`;

const CalendarGoToThisMonthText = styled.div`
  ${tw`text-sm`}
`;

const TotalAssetSection = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const TotalAssetTitle = styled.div`
  ${tw`flex flex-row items-end gap-2 ps-2`}
`;

const TotalAssetTitleText = styled.div`
  ${tw`text-sm`}
`;

const TotalAssetTitleNumber = styled.div`
  ${tw`text-2xl`}
  font-weight: 500;
`;

const AssetDetailSection = styled.div`
  ${tw`flex flex-col gap-3 w-full`}
`;

const AssetDetail = styled.div`
  ${tw`flex flex-row justify-between items-center px-3 py-4 bg-gray-light`}
  border-radius : 12px;
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.05);
`;

const AssetDetailInfo = styled.div`
  ${tw`flex flex-row justify-between px-1 w-full`}
`;

const AssetDetailArrow = styled.img`
  ${tw`w-3 h-3`}
`;

const AdditionalFunctionContainer = styled.div`
  ${tw`flex flex-row gap-3`}
`;

const AdditionalFunction = styled.div`
  ${tw`flex flex-col gap-1 p-3 w-full items-center`}
  background-color: rgba(0, 0, 0, 0.013);
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
`;

const AdditionalFunctionImg = styled.img`
  ${tw`w-6 h-6`}
`;

const AdditionalFunctionText = styled.div`
  ${tw`text-xs`}
`;

const AdditionalFont = styled.span`
  ${tw`text-[0.9rem]`}
`;

function AssetDetailCommon({ type, price, onClick }: AssetDetailCommonProps) {
  return (
    <AssetDetail onClick={onClick}>
      <AssetDetailInfo>
        <AdditionalFont>{type}</AdditionalFont>
        <AdditionalFont>{price.toLocaleString()} 원</AdditionalFont>
      </AssetDetailInfo>
      <AssetDetailArrow src={arrowImg} />
    </AssetDetail>
  );
}

export default function MainPage() {
  const today: Date = new Date();
  const [date, setDate] = useState<number>(today.getDate());
  const [modal, setModal] = useState<boolean>(false);
  const [stockPlans, setStockPlans] = useState<CalendarStockPlanType[]>([]);
  const [energyPlans, setEnergyPlans] = useState<CalendarP2PType[]>([]);
  const [estatePlans, setEstatePlans] = useState<CalendarP2PType[]>([]);
  const [totalSalary, setTotalSalary] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [accountAmount, setAccountAmount] = useState<number>(0);
  const [energyTotalAmount, setEnergyTotalAmount] = useState<number>(0);
  const [estateTotalAmount, setEstateTotalAmount] = useState<number>(0);
  const [koreaStockTotalPrice, setKoreaStockTotalPrice] = useState<number>(0);
  const [usaStockTotalPrice, setUsaStockTotalPrice] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const startDate = today.getDate() - today.getDay();

  const getPlans = useCallback(() => {
    calendarStockPlans({
      userId: user.user.id,
      token: user.token,
      startDate: new Date(today.getFullYear(), today.getMonth(), 1),
      endDate: new Date(today.getFullYear(), today.getMonth() + 1, 1),
    }).then((data) => {
      let total = 0;
      if (data.data.success) {
        total = data.data.response.reduce((accumulator, stock) => {
          if (new Date(stock.dividendDate).getMonth() === today.getMonth()) {
            if (
              'A' <= stock.symbol.charAt(0) &&
              stock.symbol.charAt(0) <= 'Z'
            ) {
              return accumulator + stock.dividend * exchangeRate;
            } else {
              return accumulator + stock.dividend;
            }
          } else {
            return accumulator;
          }
        }, 0);

        setStockPlans(data.data.response);
      }

      getEnergyPlans(total);
    });
  }, [exchangeRate]);

  const getEnergyPlans = useCallback((total: number) => {
    getHoldingEnergyCalendar({
      token: user.token,
      startDate: new Date(today.getFullYear(), today.getMonth(), 1),
      endDate: new Date(today.getFullYear(), today.getMonth() + 1, 1),
    }).then((data) => {
      let totalSalary = 0;
      if (data.data.success) {
        setEnergyPlans(data.data.response);
        totalSalary = data.data.response.reduce((accumulator, product) => {
          if (new Date(product.paymentDate).getMonth() === today.getMonth()) {
            return accumulator + product.dividendPrice;
          } else {
            return accumulator;
          }
        }, 0);
      }

      getEstatePlans(total + totalSalary);
    });
  }, []);

  const getEstatePlans = useCallback((total: number) => {
    getHoldingEstateCalendar({
      token: user.token,
      startDate: new Date(today.getFullYear(), today.getMonth(), 1),
      endDate: new Date(today.getFullYear(), today.getMonth() + 1, 1),
    }).then((data) => {
      let totalSalary = 0;
      if (data.data.success) {
        totalSalary = data.data.response.reduce((accumulator, product) => {
          if (new Date(product.paymentDate).getMonth() === today.getMonth()) {
            return accumulator + product.dividendPrice;
          } else {
            return accumulator;
          }
        }, 0);
        setEstatePlans(data.data.response);
      }
      setTotalSalary(total + totalSalary);
    });
  }, []);

  const getAccountAmount = useCallback(() => {
    getUserAccountAmount({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success && data.data.response.cash) {
          setAccountAmount(data.data.response.cash);
        }
      },
    );
  }, []);

  const getUserTotalEnergyPrice = useCallback(() => {
    getUserTotalEnergy({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success && data.data.response) {
          setEnergyTotalAmount(data.data.response);
        }
      },
    );
  }, []);

  const getUserTotalEstatePrice = useCallback(() => {
    getUserTotalEstate({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success && data.data.response) {
          setEstateTotalAmount(data.data.response);
        }
      },
    );
  }, []);

  function getStocksDataProps() {
    getHoldingStocks({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success) {
          setKoreaStockTotalPrice(data.data.response.krTotalPurchase);
          setUsaStockTotalPrice(data.data.response.usTotalPurchase);
        }
      },
    );
  }

  useEffect(() => {
    calendarStockPlans({
      userId: user.user.id,
      token: user.token,
      startDate: new Date(today.getFullYear(), today.getMonth(), startDate + 1),
      endDate: new Date(today.getFullYear(), today.getMonth(), startDate + 8),
    }).then((data) => {
      if (data.data.success) setStockPlans(data.data.response);
    });

    getAccountAmount();
    getPlans();
    getExchangeRate().then((data) => {
      setExchangeRate(data.data.response.selling);
    });
    getUserTotalEnergyPrice();
    getUserTotalEstatePrice();
    getStocksDataProps();
  }, [exchangeRate]);

  return (
    <>
      <Navbar name={user.user.nickname} type="main" onClick={() => {}}></Navbar>
      {modal && (
        <BottomUpModal
          onClose={() => setModal(false)}
          content={
            <SalaryPlan
              date={new Date(today.getFullYear(), today.getMonth(), date)}
            />
          }
        ></BottomUpModal>
      )}
      <ScrollToTop />
      <MyPageContainer>
        <TitleNameContainer>
          <TitleName type="name">{user.user.nickname}</TitleName>
          <TitleInvestmentType>
            ({investmentTypeToString(user.user.investmentType)})
          </TitleInvestmentType>
          <TitleName type="nim">님</TitleName>
        </TitleNameContainer>
        <ThisMonthSalaryContainer>
          <ThisMonthSalaryTitle>이번달 보너스 월급은?</ThisMonthSalaryTitle>
          <ThisMonthSalaryNumber>
            {Math.floor(totalSalary).toLocaleString()}원
          </ThisMonthSalaryNumber>
        </ThisMonthSalaryContainer>

        <CalendarContainer>
          <CalendarGoToThisMonth>
            <CalendarGoToThisMonthText
              onClick={() => {
                navigate('/calendar');
              }}
            >
              이번달 배당 일정 보러가기
            </CalendarGoToThisMonthText>
            <img src={arrowImg} />
          </CalendarGoToThisMonth>
          <Calendar
            startDate={startDate}
            datesCount={7}
            year={today.getFullYear()}
            month={today.getMonth()}
            setDate={setDate}
            stockPlans={stockPlans}
            estatePlans={estatePlans}
            energyPlans={energyPlans}
            openModal={() => setModal(true)}
          ></Calendar>
        </CalendarContainer>
        <TotalAssetSection>
          <TotalAssetTitle>
            <TotalAssetTitleText>총자산</TotalAssetTitleText>
            <TotalAssetTitleNumber>
              {(
                accountAmount +
                usaStockTotalPrice +
                koreaStockTotalPrice +
                energyTotalAmount +
                estateTotalAmount
              ).toLocaleString()}
              원
            </TotalAssetTitleNumber>
          </TotalAssetTitle>
          <AssetDetailSection>
            <AssetDetailCommon
              type="입출금"
              price={accountAmount}
              onClick={() => {
                navigate('/account');
              }}
            />
            <AssetDetailCommon
              type="주식"
              price={koreaStockTotalPrice + usaStockTotalPrice}
              onClick={() => {
                navigate('/products/held', { state: { initialActive: true } });
              }}
            />
            <AssetDetailCommon
              type="P2P"
              price={energyTotalAmount + estateTotalAmount}
              onClick={() => {
                navigate('/products/held', { state: { initialActive: false } });
              }}
            />
          </AssetDetailSection>
        </TotalAssetSection>
        <AdditionalFunctionContainer>
          <AdditionalFunction
            onClick={() => {
              navigate('/products/like', { state: { initialActive: true } });
            }}
          >
            <AdditionalFunctionImg src={darkRedHeartImg} />
            <AdditionalFunctionText>관심 종목 보러가기</AdditionalFunctionText>
          </AdditionalFunction>
          <AdditionalFunction
            onClick={() => {
              navigate('/typetest', { state: { nav: true } });
            }}
          >
            <AdditionalFunctionImg src={testBlueImg} />
            <AdditionalFunctionText>
              투자 성향 테스트 다시하기
            </AdditionalFunctionText>
          </AdditionalFunction>
        </AdditionalFunctionContainer>
      </MyPageContainer>
      <Footer />
    </>
  );
}
