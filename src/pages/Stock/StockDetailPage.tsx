import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import SelectStock from '../../components/Stock/SelectStock';
import StockRecommend from '../../components/common/Stock/StockRecommend';
import Button from '../../components/common/Button';
import Navbar from '../../components/common/Navbar';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import StockOptions from '../../components/Stock/StockOptions';
import { useNavigate } from 'react-router-dom';

interface SemiStock {
  code: string;
  name: string;
  price: string;
  amount: number;
}

const Container = styled.div`
  ${tw`h-[calc(100% - 200px)] mt-14 mb-[84px] px-5 py-8 flex flex-col gap-3`}
`;

const Wrapper = styled.div`
  ${tw`w-full gap-4 overflow-y-auto`}
`;

const HeaderText = styled.span`
  ${tw`w-full flex text-lg mt-2 mb-2 items-center justify-center`}
`;

const AddStock = styled.div`
  ${tw`flex justify-center items-center text-xs text-black mt-2 cursor-pointer`}
`;

const ExpectedDividend = styled.div`
  ${tw`text-right text-base text-sm mb-2`}
`;

const Divider = styled.div`
  ${tw`w-full h-1 bg-gray-light my-3`}
`;

const ReasonTitle = styled.span`
  ${tw`text-lg ml-2 mb-2`}
`;

const StockContainer = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const AbsoluteButtonContainer = styled.div`
  ${tw`bg-white px-5 h-22 fixed left-0 right-0 bottom-0 flex justify-center items-start gap-7`}
`;

const StockDetailPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState<SemiStock[]>([
    { code: '005930', name: '삼성', price: '63000', amount: 200 },
    { code: '035720', name: '카카오', price: '43400', amount: 1 },
  ]);

  const handleDelete = (name: string) => {
    setSelectedStocks((prevStocks) =>
      prevStocks.filter((stock) => stock.name !== name),
    );
  };

  const handleAddStock = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNext = () => {
    if (currentMonth < 2) {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const handlePrev = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const handleBuyBtn = () => {
    // 조합 결과 구매하기
  };

  return (
    <>
      <Navbar name="" type="close" />
      <Container>
        <HeaderText>
          {currentMonth + 1}·{currentMonth + 3}·{currentMonth + 5}·
          {currentMonth + 7}월 추천 배당주
        </HeaderText>
        <StockContainer>
          {selectedStocks.map((stock) => (
            <SelectStock
              key={stock.name}
              name={stock.name}
              price={stock.price}
              amount={stock.amount}
              onDelete={() => handleDelete(stock.name)}
            />
          ))}
        </StockContainer>
        <AddStock onClick={handleAddStock}>+ 종목 추가하기</AddStock>
        <Divider />
        <ExpectedDividend>예상 월 배당금 360,000원</ExpectedDividend>
        <Wrapper>
          <ReasonTitle>추천 이유</ReasonTitle>
          <StockRecommend
            title="# 높은 안정성"
            description="안정형 투자성향을 가진 OOO님께 어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구"
          />
          <StockRecommend
            title="# 높은 안정성"
            description="안정형 투자성향을 가진 OOO님께 어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구"
          />
          <StockRecommend
            title="# 추후 api를 통해 받아올 수 있게"
            description="안정형 투자성향을 가진 OOO님께 추천을 어쩌구저쩌구저쩌구어쩌구..."
          />
        </Wrapper>
        {isModalOpen && (
          <BottomUpModal
            onClose={handleCloseModal}
            content={<StockOptions dividendMonth={currentMonth + 1}/>}
          />
        )}
      </Container>
      <AbsoluteButtonContainer>
        {currentMonth === 0 ? (
          <Button name="다음" status={'active'} onClick={handleNext} />
        ) : currentMonth === 2 ? (
          <>
            <Button name="이전" status="plain" onClick={handlePrev} />
            <Button name="구매하기" status={'active'} onClick={handleBuyBtn} />
          </>
        ) : (
          <>
            <Button name="이전" status="plain" onClick={handlePrev} />
            <Button name="다음" status={'active'} onClick={handleNext} />
          </>
        )}
      </AbsoluteButtonContainer>
    </>
  );
};

export default StockDetailPage;
