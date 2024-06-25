import React, { useCallback, useEffect, useState } from 'react';
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
  removeCombi1Stock,
  removeCombi2Stock,
  removeCombi3Stock,
  removeCombiStocks,
  setTotalDividend1,
  setTotalDividend2,
  setTotalDividend3,
} from '../../store/reducers/stocks/stocks';
import AlertModal from '../../components/common/Stock/AlertModal';
import { InsertCombiStock } from '../../types/stocks_product';
import { getHoldingStocks } from '../../api/stocks';
import { getUserTotalEnergy, getUserTotalEstate } from '../../api/holding';
import { getUserAccountAmount } from '../../api/auth';

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
  ${tw`text-[1.1rem] text-right text-green font-semibold`}
`;

const EmptyText = styled.span`
  ${tw`w-full py-4 text-[0.9rem] text-center text-gray`}
`;

const ColContainer = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const MyAccount = styled.div`
  ${tw`text-right text-[0.86rem]`}
`;

const StockCombiBuyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const combiStocks = useSelector((state: RootState) => state.stocks);
  const [alertOpen, setAlertOpen] = useState(false);
  const wantInvestmentPrice = useSelector(
    (state: RootState) => state.stocks.totalInvestment,
  );
  const [error, setError] = useState<boolean>(false);
  const [accountAmount, setAccountAmount] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user);

  const handleRemoveStock = (stock: InsertCombiStock, combiType: number) => {
    if (combiType === 1) {
      dispatch(removeCombi1Stock(stock));
      handleRecalculate(stock, 1);
    } else if (combiType === 2) {
      dispatch(removeCombi2Stock(stock));
      handleRecalculate(stock, 2);
    } else {
      dispatch(removeCombi3Stock(stock));
      handleRecalculate(stock, 3);
    }
  };

  const handleRecalculate = (stock: InsertCombiStock, combiType: number) => {
    if (combiType === 1) {
      const data = combiStocks.combination1.stocks.reduce((total, item) => {
        if (item.stockId !== stock.stockId) {
          return (
            total + (item.price * item.quantity * item.dividendYieldTtm) / 4
          );
        }
        return total;
      }, 0);
      dispatch(setTotalDividend1(data));
    } else if (combiType === 2) {
      const data = combiStocks.combination2.stocks.reduce((total, item) => {
        if (item.stockId !== stock.stockId) {
          return (
            total + (item.price * item.quantity * item.dividendYieldTtm) / 4
          );
        }
        return total;
      }, 0);
      dispatch(setTotalDividend2(data));
    } else {
      const data = combiStocks.combination3.stocks.reduce((total, item) => {
        if (item.stockId !== stock.stockId) {
          return (
            total + (item.price * item.quantity * item.dividendYieldTtm) / 4
          );
        }
        return total;
      }, 0);
      dispatch(setTotalDividend3(data));
    }
  };

  useEffect(() => {
    const data1 = combiStocks.combination1.stocks.reduce((total, item) => {
      return total + (item.price * item.quantity * item.dividendYieldTtm) / 4;
    }, 0);
    const data2 = combiStocks.combination2.stocks.reduce((total, item) => {
      return total + (item.price * item.quantity * item.dividendYieldTtm) / 4;
    }, 0);
    const data3 = combiStocks.combination3.stocks.reduce((total, item) => {
      return total + (item.price * item.quantity * item.dividendYieldTtm) / 4;
    }, 0);
    dispatch(setTotalDividend1(data1));
    dispatch(setTotalDividend2(data2));
    dispatch(setTotalDividend3(data3));
  }, [
    combiStocks.combination1.stocks,
    combiStocks.combination2.stocks,
    combiStocks.combination3.stocks,
    dispatch,
  ]);

  const handleAlertClose = () => {
    setAlertOpen(false);
    setError(false);
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

    return sum;
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

  const submitCombi = () => {
    if (totalPrice() > accountAmount) {
      setError(true);
    } else {
      const stockList = [];
      combiStocks.combination1.stocks.map((item, idx) =>
        stockList.push({
          stockName: item.name,
          stockCode: item.symbol,
          amount: item.quantity,
          marketType:
            item.exchange === 'KSC'
              ? 'KSC'
              : item.exchange === 'NASDAQ'
                ? 'BAQ'
                : 'BAY',
        }),
      );
      combiStocks.combination2.stocks.map((item, idx) =>
        stockList.push({
          stockName: item.name,
          stockCode: item.symbol,
          amount: item.quantity,
          marketType:
            item.exchange === 'KSC'
              ? 'KSC'
              : item.exchange === 'NASDAQ'
                ? 'BAQ'
                : 'BAY',
        }),
      );
      combiStocks.combination3.stocks.map((item, idx) =>
        stockList.push({
          stockName: item.name,
          stockCode: item.symbol,
          amount: item.quantity,
          marketType:
            item.exchange === 'KSC'
              ? 'KSC'
              : item.exchange === 'NASDAQ'
                ? 'BAQ'
                : 'BAY',
        }),
      );

      const data = {
        userId: user.user.id,
        stockList: stockList,
      };

      dispatch(purchasedCombination(data)).then((res) => {
        if ((res.payload as ResponsePayload).data.success) {
          navigate('/result/buy');
        }
      });
    }
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
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </ExpectedDividend>
          </Info>
          {combiStocks.combination1.stocks.length > 0 ? (
            combiStocks.combination1.stocks.map((stock, idx) => (
              <div key={idx}>
                <SelectStock
                  name={stock.name}
                  price={stock.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  amount={stock.quantity}
                  symbol={stock.symbol}
                  onDelete={() => handleRemoveStock(stock, 1)}
                  stock={stock}
                  combiType={1}
                />
              </div>
            ))
          ) : (
            <EmptyText>구매 종목이 없습니다.</EmptyText>
          )}
        </StockCombination>
        <StockCombination>
          <Info>
            <SemiTitle>2·5·8·11월 추천 배당주</SemiTitle>
            <ExpectedDividend>
              예상 월 배당금{' '}
              {combiStocks.combination2.totalDividend
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </ExpectedDividend>
          </Info>
          {combiStocks.combination2.stocks.length > 0 ? (
            combiStocks.combination2.stocks.map((stock, idx) => (
              <div key={idx}>
                <SelectStock
                  name={stock.name}
                  price={stock.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  amount={stock.quantity}
                  symbol={stock.symbol}
                  onDelete={() => handleRemoveStock(stock, 2)}
                  stock={stock}
                  combiType={2}
                />
              </div>
            ))
          ) : (
            <EmptyText>구매 종목이 없습니다.</EmptyText>
          )}
        </StockCombination>
        <StockCombination>
          <Info>
            <SemiTitle>3·6·9·12월 추천 배당주</SemiTitle>
            <ExpectedDividend>
              예상 월 배당금{' '}
              {combiStocks.combination3.totalDividend
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </ExpectedDividend>
          </Info>
          {combiStocks.combination3.stocks.length > 0 ? (
            combiStocks.combination3.stocks.map((stock, idx) => (
              <div key={idx}>
                <SelectStock
                  name={stock.name}
                  price={stock.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  amount={stock.quantity}
                  symbol={stock.symbol}
                  onDelete={() => handleRemoveStock(stock, 3)}
                  stock={stock}
                  combiType={3}
                />
              </div>
            ))
          ) : (
            <EmptyText>구매 종목이 없습니다.</EmptyText>
          )}
        </StockCombination>
        <Divider />
        <ColContainer>
          <BuyPrice>
            총 구매 금액{' '}
            {totalPrice()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            원
          </BuyPrice>
          <MyAccount>
            * 현재 나의 자산은{' '}
            {accountAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </MyAccount>
        </ColContainer>
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
      {error && (
        <AlertModal
          type="full"
          onClose={handleAlertClose}
          message="투자 가능 금액을 초과했습니다."
        ></AlertModal>
      )}
    </>
  );
};

export default StockCombiBuyPage;
