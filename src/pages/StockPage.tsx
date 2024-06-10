import React from 'react';
import tw, { css, styled } from 'twin.macro';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RecommendBar from '../components/common/Stock/RecommendBar';
import CombiBox from '../components/common/Stock/CombiBox';
import Triangle from "../assets/triangle.svg";

const stockData = {
  combination1: {
    diviend_income: 0,
    stocks: [
      { code: "001", name: "삼성전자", price: 50000, amount: 100, total_price: 5000000, growth_score: 60, safe_score: 70, dividend_score: 80, personalized_score: 90 },
      { code: "002", name: "카카오", price: 150000, amount: 200, total_price: 30000000, growth_score: 65, safe_score: 75, dividend_score: 85, personalized_score: 95 }
    ]
  },
  combination2: {
    diviend_income: 0,
    stocks: [
      { code: "003", name: "네이버", price: 300000, amount: 70, total_price: 21000000, growth_score: 70, safe_score: 80, dividend_score: 90, personalized_score: 85 }
    ]
  },
  combination3: {
    diviend_income: 0,
    stocks: [
      { code: "004", name: "테슬라", price: 700000, amount: 100, total_price: 70000000, growth_score: 75, safe_score: 85, dividend_score: 95, personalized_score: 100 },
      { code: "005", name: "애플", price: 1500000, amount: 20, total_price: 30000000, growth_score: 80, safe_score: 90, dividend_score: 100, personalized_score: 95 }
    ]
  }
};

const MainContainer = styled.div`
  ${tw`flex flex-col min-h-screen overflow-y-auto`}
`;

const ContentContainer = styled.div`
  ${tw`flex-1 p-4 mt-15`}
`;


const TextContainer = styled.div`
  ${tw`flex justify-end mt-3 mr-4 gap-1`}
`;

const SectionHeader = styled.div`
  ${tw`flex gap-4 my-4 pl-2 mt-7`}
`;

const MainTab = styled.span`
  ${tw` text-lg`}
`;
const SubTab = styled(MainTab)`
  ${css`
    color: rgba(0, 0, 0, 0.4);
  `}
`;

const NextText = styled.span`
  ${tw`text-base`}
`;

const CombiBoxContainer = styled.div`
  ${tw`top-1 p-6 rounded-lg relative `}
`;

const NavImage = styled.img`
  ${tw`w-3 h-3 mt-1`}
`;

const StockPage: React.FC = () => {
  return (
    <MainContainer>
      <Navbar name="박유진" type="main" />
      <ContentContainer>
        <RecommendBar />
        <TextContainer>
          <NextText>갱신하기</NextText>
          <NavImage src={Triangle} />
        </TextContainer>
        <SectionHeader>
          <MainTab>추천 조합</MainTab>
          <SubTab>개별 종목</SubTab>
        </SectionHeader>
        <div className="flex flex-col space-y-4">
          <TextContainer>
            <NextText>바로 구매하기</NextText>
            <NavImage src={Triangle} />
          </TextContainer>
          <CombiBoxContainer>  
            <CombiBox data={stockData} />
          </CombiBoxContainer>
        </div>
      </ContentContainer>
      <Footer />
    </MainContainer>
  );
};

export default StockPage;
