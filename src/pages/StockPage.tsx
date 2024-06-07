import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RecommendBar from '../components/common/Stock/RecommendBar';
import CombiBox from '../components/common/Stock/CombiBox';
import { ItemType } from '../components/common/Stock/StockContainer';

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

const StockPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name="박유진" type="main" />
      <div className="flex-1 p-4 mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32" style={{ marginTop: '90px' }}>
        <RecommendBar />
        <div className="flex justify-between items-center my-4">
          <h2 className="text-xl font-semibold">추천 조합</h2>
          <span className="text-xl font-semibold text-gray-600">개별 종목</span>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md relative">
            <span className="absolute top-4 right-4 text-sm font-semibold text-blue-600">바로 구매하기</span>
            <CombiBox data={stockData} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StockPage;
