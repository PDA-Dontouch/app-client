import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import SelectStock from '../../components/Stock/SelectStock';
import Button from '../../components/common/Button';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  purchasedCombination,
  removeCombiStocks,
} from '../../store/reducers/stocks/stocks';
import AlertModal from '../../components/common/Stock/AlertModal';

type ResponsePayload = {
  data: {
    success: boolean;
  };
};

const Container = styled.div`
  ${tw`mt-14 mb-22 px-5 py-6 flex flex-col gap-8`}
`;

const HeaderText = styled.span`
  ${tw`w-full flex text-xl mt-2 mb-2 items-center justify-center`}
`;

const Info = styled.div`
  ${tw`flex flex-row justify-between`}
`;

const SemiTitle = styled.span`
  ${tw`flex text-sm`}
`;

const ExpectedDividend = styled.span`
  ${tw`flex text-xs`}
  color: rgba(0, 0, 0, 0.6);
`;

const Divider = styled.div`
  ${tw`w-full h-1 bg-gray-light`}
`;

const StockCombination = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const ButtonContainer = styled.div`
  ${tw`bg-white w-full px-6 pt-2 pb-6 gap-4 box-border fixed left-0 right-0 bottom-0 flex justify-between items-start`}
`;

const BuyPrice = styled.span`
  ${tw`text-[1rem] text-right`}
`;

const StockCombiBuyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const combiStocks = useSelector((state: RootState) => state.stocks);
  const [alertOpen, setAlertOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const handleRemoveStock = (
    stockSymbol: string,
    currentCombination: number,
  ) => {
    const allStocks = [
      ...combiStocks.combination1.stocks,
      ...combiStocks.combination2.stocks,
      ...combiStocks.combination3.stocks,
    ];

    if (allStocks.length === 1) {
      setAlertOpen(true);
    } else {
      const combinationMap: {
        [key: number]: 'combination1' | 'combination2' | 'combination3';
      } = {
        1: 'combination1',
        2: 'combination2',
        3: 'combination3',
      };
      const combination = combinationMap[currentCombination];
      dispatch(removeCombiStocks({ combination: combination, stockSymbol }));
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const totalPrice = () => {
    let sum = 0;
    combiStocks.combination1.stocks.forEach((stock) => {
      sum = sum + stock.price * stock.quantity;
    });
    combiStocks.combination2.stocks.forEach((stock) => {
      sum = sum + stock.price * stock.quantity;
    });
    combiStocks.combination3.stocks.forEach((stock) => {
      sum = sum + stock.price * stock.quantity;
    });

    return sum.toLocaleString();
  };

  console.log(combiStocks);
  const submitCombi = () => {
    const stockList = [];
    combiStocks.combination1.stocks.map((item, idx) =>
      stockList.push({
        stockName: item.name,
        stockCode: item.symbol,
        amount: item.quantity,
        marketType: item.exchange,
      }),
    );
    combiStocks.combination2.stocks.map((item, idx) =>
      stockList.push({
        stockName: item.name,
        stockCode: item.symbol,
        amount: item.quantity,
        marketType: item.exchange,
      }),
    );
    combiStocks.combination3.stocks.map((item, idx) =>
      stockList.push({
        stockName: item.name,
        stockCode: item.symbol,
        amount: item.quantity,
        marketType: item.exchange,
      }),
    );

    const data = {
      userId: user.id,
      stockList: stockList,
    };
    dispatch(purchasedCombination(data)).then((res) => {
      if ((res.payload as ResponsePayload).data.success) {
        navigate('/result/buy');
      }
    });
  };

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
        <HeaderText>배당주 조합 결과</HeaderText>
        <StockCombination>
          <Info>
            <SemiTitle>1·4·7·10월 추천 배당주</SemiTitle>
            <ExpectedDividend>
              예상 월 배당금{' '}
              {combiStocks.combination1.totalDividend
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </ExpectedDividend>
          </Info>

          {combiStocks.combination1.stocks.map((stock, idx) => (
            <div key={idx}>
              <SelectStock
                name={stock.name}
                price={stock.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                amount={stock.quantity}
                symbol={stock.symbol}
                onDelete={() => handleRemoveStock(stock.symbol, 1)}
              />
            </div>
          ))}
        </StockCombination>
        <StockCombination>
          <Info>
            <SemiTitle>2·5·8·11월 추천 배당주</SemiTitle>
            <ExpectedDividend>
              예상 월 배당금{' '}
              {combiStocks.combination2.totalDividend
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </ExpectedDividend>
          </Info>

          {combiStocks.combination2.stocks.map((stock, idx) => (
            <div key={idx}>
              <SelectStock
                name={stock.name}
                price={stock.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                amount={stock.quantity}
                symbol={stock.symbol}
                onDelete={() => handleRemoveStock(stock.symbol, 2)}
              />
            </div>
          ))}
        </StockCombination>
        <StockCombination>
          <Info>
            <SemiTitle>3·6·9·12월 추천 배당주</SemiTitle>
            <ExpectedDividend>
              예상 월 배당금{' '}
              {combiStocks.combination3.totalDividend
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </ExpectedDividend>
          </Info>

          {combiStocks.combination3.stocks.map((stock, idx) => (
            <div key={idx}>
              <SelectStock
                name={stock.name}
                price={stock.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                amount={stock.quantity}
                symbol={stock.symbol}
                onDelete={() => handleRemoveStock(stock.symbol, 3)}
              />
            </div>
          ))}
        </StockCombination>
        <Divider />
        <BuyPrice>
          총 구매 금액 {totalPrice().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
        </BuyPrice>
      </Container>
      <ButtonContainer>
        <Button name="이전" status="plain" onClick={() => navigate(-1)} />
        <Button name="구매하기" status={'active'} onClick={submitCombi} />
      </ButtonContainer>
      {alertOpen && (
        <AlertModal
          type="full"
          onClose={handleAlertClose}
          message="적어도 한 종목은 조합에 있어야 합니다."
        ></AlertModal>
      )}
    </>
  );
};

export default StockCombiBuyPage;
