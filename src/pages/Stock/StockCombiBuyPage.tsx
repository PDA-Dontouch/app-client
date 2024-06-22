import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import SelectStock from '../../components/Stock/SelectStock';
import Button from '../../components/common/Button';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { removeCombiStocks } from '../../store/reducers/stocks/stocks';
import AlertModal from '../../components/common/Stock/AlertModal';

const Container = styled.div`
  ${tw`h-[calc(100% - 190px)] mt-14 mb-[84px] px-5 py-6 flex flex-col gap-6`}
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
  ${tw`flex text-sm`}
  color: rgba(0, 0, 0, 0.4);
`;

const Divider = styled.div`
  ${tw`w-full h-1 bg-gray-light my-3`}
`;

const StockCombination = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const ButtonContainer = styled.div`
  ${tw`bg-white px-5 h-22 fixed left-0 right-0 bottom-0 flex justify-center items-start gap-7`}
`;

const BuyPrice = styled.span`
  ${tw`text-base text-right`}
`;

const StockCombiBuyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const combiStocks = useSelector((state: RootState) => state.stocks);
  const [alertOpen, setAlertOpen] = useState(false);

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
              예상 월 배당금 {combiStocks.combination1.totalDividend}원
            </ExpectedDividend>
          </Info>

          {combiStocks.combination1.stocks.map((stock, idx) => (
            <div key={idx}>
              <SelectStock
                name={stock.name}
                price={stock.price}
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
              예상 월 배당금 {combiStocks.combination2.totalDividend}원
            </ExpectedDividend>
          </Info>

          {combiStocks.combination2.stocks.map((stock, idx) => (
            <div key={idx}>
              <SelectStock
                name={stock.name}
                price={stock.price}
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
              예상 월 배당금 {combiStocks.combination3.totalDividend}원
            </ExpectedDividend>
          </Info>

          {combiStocks.combination3.stocks.map((stock, idx) => (
            <div key={idx}>
              <SelectStock
                name={stock.name}
                price={stock.price}
                amount={stock.quantity}
                symbol={stock.symbol}
                onDelete={() => handleRemoveStock(stock.symbol, 3)}
              />
            </div>
          ))}
        </StockCombination>
        <Divider />
        <BuyPrice>총 구매금액 {totalPrice()} 원</BuyPrice>
      </Container>
      <ButtonContainer>
        <Button name="이전" status="plain" onClick={() => navigate(-1)} />
        <Button
          name="구매하기"
          status={'active'}
          onClick={() => navigate('/result/buy')}
        />
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
