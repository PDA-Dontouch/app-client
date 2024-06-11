import tw, { styled } from 'twin.macro';
import coinImg from '../assets/coin.svg';
import arrowImg from '../assets/arrow.svg';
import Calendar from '../components/Calendar/Calendar';
import { salaryData } from './CalendarPage';
import BottomUpModal from '../components/common/Modal/BottomUpModal';
import SalaryPlan from '../components/Calendar/SalaryPlan';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rd3 from 'react-d3-graph';
import * as d3 from 'd3';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

type TitleNameProps = {
  type: 'name' | 'nim';
};

const MyPageContainer = styled.div`
  ${tw`flex flex-col gap-8 px-5 py-18 w-full`}
  box-sizing: border-box;
`;

const InfoSection = styled.div`
  ${tw`flex flex-col w-full gap-2`}
  box-sizing: border-box;
`;

const TitleNameContainer = styled.div`
  ${tw`flex flex-row items-end px-2 w-full`}
  box-sizing: border-box;
`;

const TitleName = styled.div<TitleNameProps>`
  ${({ type }) => (type === 'name' ? tw`text-3xl` : tw`text-base`)}
  ${tw`flex flex-col h-full`}
`;

const TotalAssetContainer = styled.div`
  ${tw`flex flex-row justify-end items-center px-1 gap-2 w-full`}
  box-sizing: border-box;
`;

const TotalAssetText = styled.div`
  ${tw`text-lg`}
`;

const TotalAssetMoneyContainer = styled.div`
  ${tw`flex flex-row gap-1`}
`;

const TotalAssetMoneyImg = styled.img`
  width: 25px;
  height: 25px;
`;

const TotalAssetMoneyNumber = styled.div`
  ${tw`text-2xl text-green-dark`}
  font-weight: 600;
`;

const ThisMonthSalaryContainer = styled.div`
  ${tw`bg-green text-white flex flex-col gap-3 w-full`}
  border-radius: 12px;
  padding: 26px 20px;
  box-sizing: border-box;
`;

const ThisMonthSalaryTitle = styled.div`
  ${tw`text-sm`}
`;

const ThisMonthSalaryNumber = styled.div`
  font-size: 26px;
  font-weight: 500;
`;

const CalendarContainer = styled.div`
  ${tw`gap-3 w-full flex flex-col `}
`;

const CalendarGoToThisMonth = styled.div`
  ${tw`flex flex-row gap-2 items-center`}
`;

const CalendarGoToThisMonthText = styled.div`
  ${tw`text-sm`}
`;

const SalaryRatioContainer = styled.div`
  ${tw`flex flex-col gap-3 justify-center items-center`}
`;

const SalaryRatioTitle = styled.div``;

const SalaryRatioVisualization = styled.svg``;

const SalaryRatioTop3 = styled.div``;

type BubbleStockData = {
  name: string;
  price: number;
  code: string;
};

type BubbleEnergyData = {
  name: string;
  img: string;
  price: number;
};

const dummyData: BubbleStockData[] = [
  { name: '삼성전자', price: 5000, code: '005930' },
  { name: '테슬라', price: 2000, code: 'TSLA ' },
  { name: '카카오', price: 3000, code: '035720' },
];

const dummyData1: BubbleEnergyData[] = [
  { name: '에너지', img: '', price: 1000 },
];

export default function MainPage() {
  const today: Date = new Date();
  const [date, setDate] = useState<number>(today.getDate());
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const bubbleRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <>
      <Navbar name="박유진" type="main" onClick={() => {}}></Navbar>
      {modal && (
        <BottomUpModal
          onClose={() => setModal(false)}
          content={
            <SalaryPlan
              date={new Date(today.getFullYear(), today.getMonth(), date)}
              plans={salaryData}
            />
          }
        ></BottomUpModal>
      )}
      <MyPageContainer>
        <InfoSection>
          <TitleNameContainer>
            <TitleName type="name">박유진</TitleName>
            <TitleName type="nim">님</TitleName>
          </TitleNameContainer>
          <TotalAssetContainer>
            <TotalAssetText>총자산</TotalAssetText>
            <TotalAssetMoneyContainer>
              <TotalAssetMoneyImg src={coinImg}></TotalAssetMoneyImg>
              <TotalAssetMoneyNumber>
                {(6045200).toLocaleString()}원
              </TotalAssetMoneyNumber>
            </TotalAssetMoneyContainer>
          </TotalAssetContainer>
          <ThisMonthSalaryContainer>
            <ThisMonthSalaryTitle>이번달 보너스 월급은?</ThisMonthSalaryTitle>
            <ThisMonthSalaryNumber>
              {(406000).toLocaleString()}원
            </ThisMonthSalaryNumber>
          </ThisMonthSalaryContainer>
        </InfoSection>
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
            type="week"
            year={today.getFullYear()}
            setMonth={null}
            month={today.getMonth()}
            date={today.getDate()}
            setDate={setDate}
            day={today.getDay()}
            plans={salaryData}
            openModal={() => setModal(true)}
          ></Calendar>
        </CalendarContainer>
        <SalaryRatioContainer>
          <SalaryRatioTitle>이번달 수익 비중</SalaryRatioTitle>
          <SalaryRatioVisualization ref={bubbleRef}></SalaryRatioVisualization>
          <SalaryRatioTop3></SalaryRatioTop3>
        </SalaryRatioContainer>
      </MyPageContainer>
      <Footer />
    </>
  );
}
