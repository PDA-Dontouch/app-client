import React from 'react';
import tw, { styled } from 'twin.macro';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RecommendBar from '../components/common/Stock/RecommendBar';
import CombiBox from '../components/common/Stock/CombiBox';

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
  ${tw`flex-1 p-4 `}
  margin-top: 15%;
`;

const SectionHeader = styled.div`
  ${tw`flex gap-4 my-4`}
  margin-top: 7%;
`;

const HeaderText = styled.span`
  ${tw` text-xl font-semibold`}
`;

const RelollText = styled.span`
  ${tw`text-xl font-semibold`}
`;

const RelollTextContainer = styled.div`
  ${tw`flex justify-end mt-4 mr-4`}
`;

const GrayText = styled(HeaderText)`
  ${tw`text-gray60`}
`;

const CombiBoxContainer = styled.div`
  ${tw`top-6 p-6 rounded-lg relative `}
`;

const PurchaseButton = styled.span`
  ${tw`text-xl absolute top-0 right-4 text-sm font-semibold`}
  margin-top: -24px;
`;

const StockPage: React.FC = () => {
  return (
    <MainContainer>
      <Navbar name="박유진" type="main" />
      <ContentContainer>
        <RecommendBar />
        <RelollTextContainer>
          <RelollText>갱신하기</RelollText>
        </RelollTextContainer>
        <SectionHeader>
          <HeaderText>추천 조합</HeaderText>
          <GrayText>개별 종목</GrayText>
        </SectionHeader>
        <div className="flex flex-col space-y-4">
          <CombiBoxContainer>
            <PurchaseButton>바로 구매하기</PurchaseButton>
            <CombiBox data={stockData} />
          </CombiBoxContainer>
        </div>
      </ContentContainer>
      <Footer />
    </MainContainer>
  );
};

export default StockPage;
