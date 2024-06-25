import React, { useCallback, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import SelectStock from '../../components/Stock/SelectStock';
import StockRecommend from '../../components/common/Stock/StockRecommend';
import Button from '../../components/common/Button';
import Navbar from '../../components/common/Navbar';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import StockOptions from '../../components/Stock/StockOptions';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  removeCombi1Stock,
  removeCombi2Stock,
  removeCombi3Stock,
  removeCombiStocks,
  setTotalDividend1,
  setTotalDividend2,
  setTotalDividend3,
} from '../../store/reducers/stocks/stocks';
import { InsertCombiStock } from '../../types/stocks_product';
import { getUserAccountAmount } from '../../api/auth';

const Container = styled.div`
  ${tw`h-[100vh] px-5 py-22 flex flex-col gap-3 box-border`}
`;

const Wrapper = styled.div`
  ${tw`flex flex-col justify-between`}
`;

const HeaderText = styled.span`
  ${tw`w-full flex text-lg mt-2 mb-2 items-center justify-center`}
`;

const AddStock = styled.div`
  ${tw`flex justify-center items-center text-[0.8rem] text-black mt-2 cursor-pointer`}
`;

const ExpectedDividend = styled.div`
  ${tw`text-right text-[1rem] mb-2 text-green-dark`}
`;

const MyAccount = styled.div`
  ${tw`text-right text-[0.86rem] mb-2`}
`;

const Divider = styled.div`
  ${tw`w-full h-1 bg-gray-light my-3`}
`;

const StockCombination = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const AbsoluteButtonContainer = styled.div`
  ${tw`bg-white w-full px-6 pb-6 gap-4 box-border fixed left-0 right-0 bottom-0 flex justify-between items-start`}
`;

const StockDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const combiStocks = useSelector((state: RootState) => state.stocks);
  const [accountAmount, setAccountAmount] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user);

  const currentCombination = `combination${currentMonth + 1}` as
    | 'combination1'
    | 'combination2'
    | 'combination3';
  const selectedStocks = combiStocks[currentCombination];

  const handleRemoveStock = (stock: InsertCombiStock) => {
    if (currentMonth === 0) {
      dispatch(removeCombi1Stock(stock));
    } else if (currentMonth === 1) {
      dispatch(removeCombi2Stock(stock));
    } else {
      dispatch(removeCombi3Stock(stock));
    }
  };

  const handleOpenModal = () => {
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
    navigate('/stocks/buy');
  };

  const getAccountAmount = useCallback(() => {
    getUserAccountAmount({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success && data.data.response.cash) {
          setAccountAmount(data.data.response.cash);
        }
      },
    );
  }, []);

  useEffect(() => {
    getAccountAmount();
  }, []);

  useEffect(() => {
    const data = selectedStocks.stocks.reduce((total, item) => {
      return total + (item.price * item.quantity * item.dividendYieldTtm) / 4;
    }, 0);
    if (currentMonth === 0) {
      dispatch(setTotalDividend1(data));
    } else if (currentMonth === 1) {
      dispatch(setTotalDividend2(data));
    } else {
      dispatch(setTotalDividend3(data));
    }
  }, [selectedStocks, currentMonth, dispatch]);

  return (
    <>
      <Navbar
        name=""
        type="close"
        onClick={() => {
          navigate('/stocks');
        }}
      />
      <Container>
        <HeaderText>
          {currentMonth + 1}·{currentMonth + 4}·{currentMonth + 7}·
          {currentMonth + 10}월 추천 배당주
        </HeaderText>
        <StockCombination>
          {selectedStocks.stocks.map((stock, idx) => (
            <div key={idx}>
              <SelectStock
                name={stock.name}
                price={stock.price.toString()}
                amount={stock.quantity}
                symbol={stock.symbol}
                onDelete={() => handleRemoveStock(stock)}
                stock={stock}
                combiType={currentMonth + 1}
              />
            </div>
          ))}
        </StockCombination>
        <AddStock onClick={handleOpenModal}>+ 종목 추가하기</AddStock>
        <Divider />
        <ExpectedDividend>
          예상 월 배당금 🪙
          {selectedStocks.totalDividend
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </ExpectedDividend>
        <MyAccount>
          * 현재 나의 자산은{' '}
          {accountAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
        </MyAccount>
        {isModalOpen && (
          <BottomUpModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            content={
              <StockOptions
                dividendMonth={currentMonth + 1}
                onClose={handleCloseModal}
              />
            }
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
