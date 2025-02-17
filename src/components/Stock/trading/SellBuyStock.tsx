import tw, { styled } from 'twin.macro';
import Button from '../../common/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
  buyLimitOrder,
  buyMarketOrder,
  buyMarketOrderUs,
  sellLimitOrder,
  sellMarketOrder,
  sellMarketOrderUs,
  setSelectedPrice,
} from '../../../store/reducers/stocks/trading';
import { useNavigate } from 'react-router-dom';
import { leaveRoom } from '../../../store/webSocket/nowPrice';

interface SellBuyProps {
  isSell: boolean;
  isKorea: boolean;
  totalAccount: number;
}

const Container = styled.div`
  ${tw`w-[100%] flex flex-col px-4 justify-between box-border`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-4 w-[100%]`}
`;

const Item = styled.div`
  ${tw`flex flex-col gap-2 w-full`}
`;

const TagText = styled.span`
  ${tw`text-sm`}
`;

const InputContainer = styled.div`
  ${tw`relative flex items-center`}
`;

const Input = styled.input`
  ${tw`w-full px-2 py-3 box-border border-none text-end text-base rounded-8`}
  padding-right: 2.5rem; // Suffix 공간 확보
  &:focus {
    outline: none;
  }
`;

const Suffix = styled.span`
  ${tw`absolute right-[1.1rem] text-base`}
`;

const BtnContainer = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const SubBtnContainer = styled.div`
  ${tw`flex w-full`}
`;

const Btn = styled.button<{ isSelect: boolean; isLeft: boolean }>`
  ${tw`bg-white border-none py-2 w-full`}
  ${({ isSelect }) => (isSelect ? tw`bg-[#FFE3D7]` : tw``)}
  ${({ isLeft }) => (isLeft ? tw`rounded-l-8` : tw`rounded-r-8`)}
`;

const TextContainer = styled.div`
  ${tw`flex justify-between px-1`}
`;

const MainText = styled.span`
  ${tw`text-base font-semibold`}
`;

const SubText = styled.span<{ isError: number }>`
  ${tw`text-sm text-end`}
  ${({ isError }) =>
    isError === 0 ? tw`` : isError === 1 ? tw`text-blue` : tw`text-red`}
`;

const SellBuyStock = ({ isSell, isKorea, totalAccount }: SellBuyProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [price, setPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [isSelect, setIsSelect] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const selectPrice = useSelector(
    (state: RootState) => state.trading.selectedPrice,
  );
  const detail = useSelector(
    (state: RootState) => state.individualStock.detail,
  );
  const selectCode = useSelector(
    (state: RootState) => state.trading.selectCode,
  );
  const userId = useSelector((state: RootState) => state.user.user.id);
  const krHolding = useSelector(
    (state: RootState) => state.holdingStocks.response.krSymbols,
  );
  const usHolding = useSelector(
    (state: RootState) => state.holdingStocks.response.usSymbols,
  );

  useEffect(() => {
    setPrice(Number(selectPrice));
  }, [selectPrice]);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/,/g, '');
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const parsedValue = numericValue === '' ? 0 : parseInt(numericValue, 10);

    if (!isNaN(parsedValue)) {
      setPrice(parsedValue);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      setAmount(numericValue);
    }
  };

  const onSell = () => {
    if (isKorea) {
      if (isSelect === 0) {
        if (price === 0 && amount === 0) {
          setError('가격과 수량을 입력해주세요.');
        } else if (price === 0) {
          setError('가격을 입력해주세요.');
        } else if (amount === 0) {
          setError('수량을 입력해주세요.');
        } else if (
          amount >
          krHolding.find((stock) => stock.symbol === selectCode).quantity
        ) {
          setError('보유 수량을 초과하였습니다.');
        } else {
          const data = {
            stockName: detail.basic_info.name,
            stockCode: detail.basic_info.symbol,
            userId: userId,
            price: price,
            amount: amount,
          };
          dispatch(sellLimitOrder(data)).then(() => {
            navigate('/result/sell');
            leaveRoom(selectCode);
            dispatch(setSelectedPrice('0'));
          });
        }
      } else {
        if (amount === 0) {
          setError('수량을 입력해주세요.');
        } else if (
          amount >
          krHolding.find((stock) => stock.symbol === selectCode).quantity
        ) {
          setError('보유 수량을 초과하였습니다.');
        } else {
          // 시장가
          const data = {
            stockName: detail.basic_info.name,
            stockCode: detail.basic_info.symbol,
            userId: userId,
            amount: amount,
          };
          dispatch(sellMarketOrder(data)).then(() => {
            navigate('/result/sell');
            leaveRoom(selectCode);
            dispatch(setSelectedPrice('0'));
          });
        }
      }
    } else {
      if (amount === 0) {
        setError('수량을 입력해주세요.');
      } else if (
        amount > usHolding.find((stock) => stock.symbol === selectCode).quantity
      ) {
        setError('보유 수량을 초과하였습니다.');
      } else {
        const data = {
          stockName: detail.basic_info.name,
          stockCode: detail.basic_info.symbol,
          userId: userId,
          amount: amount,
          marketType: detail.basic_info.exchange === 'NASDAQ' ? 'BAQ' : 'BAY',
        };
        dispatch(sellMarketOrderUs(data)).then(() => {
          navigate('/result/sell');
          dispatch(setSelectedPrice('0'));
        });
      }
    }
  };

  const onBuy = () => {
    if (isKorea) {
      if (isSelect === 0) {
        if (price === 0 && amount === 0) {
          setError('가격과 수량을 입력해주세요.');
        } else if (price === 0) {
          setError('가격을 입력해주세요.');
        } else if (amount === 0) {
          setError('수량을 입력해주세요.');
        } else if (price * amount > totalAccount) {
          setError('총자산을 초과한 금액입니다.');
        } else {
          const data = {
            stockName: detail.basic_info.name,
            stockCode: detail.basic_info.symbol,
            userId: userId,
            price: price,
            amount: amount,
          };
          dispatch(buyLimitOrder(data)).then(() => {
            navigate('/result/pending');
            leaveRoom(selectCode);
            dispatch(setSelectedPrice('0'));
          });
        }
      } else {
        if (amount === 0) {
          setError('수량을 입력해주세요.');
        } else if (price * amount > totalAccount) {
          setError('총자산을 초과한 금액입니다.');
        } else {
          // 시장가
          const data = {
            stockName: detail.basic_info.name,
            stockCode: detail.basic_info.symbol,
            userId: userId,
            amount: amount,
          };
          dispatch(buyMarketOrder(data)).then(() => {
            navigate('/result/buy');
            leaveRoom(selectCode);
            dispatch(setSelectedPrice('0'));
          });
        }
      }
    } else {
      if (amount === 0) {
        setError('수량을 입력해주세요.');
      } else if (price * amount > totalAccount) {
        setError('총자산을 초과한 금액입니다.');
      } else {
        const data = {
          stockName: detail.basic_info.name,
          stockCode: detail.basic_info.symbol,
          userId: userId,
          amount: amount,
          marketType: detail.basic_info.exchange === 'NASDAQ' ? 'BAQ' : 'BAY',
        };
        dispatch(buyMarketOrderUs(data)).then(() => {
          navigate('/result/buy');
          dispatch(setSelectedPrice('0'));
        });
      }
    }
  };

  return (
    <Container>
      <ItemContainer>
        <SubBtnContainer>
          {isKorea && (
            <>
              <Btn
                isLeft={true}
                isSelect={isSelect === 0}
                onClick={() => {
                  setIsSelect(0);
                  setError('');
                }}
              >
                지정가
              </Btn>
              <Btn
                isLeft={false}
                isSelect={isSelect === 1}
                onClick={() => {
                  setIsSelect(1);
                  setPrice(0);
                  setError('');
                }}
              >
                시장가
              </Btn>
            </>
          )}
        </SubBtnContainer>
        <Item>
          <TagText>가격</TagText>
          <InputContainer>
            <Input
              disabled={!isKorea ? true : isSelect === 1 ? true : false}
              value={price === 0 ? '' : `${formatNumber(price)}`}
              placeholder={!isKorea ? '' : isSelect === 0 ? '0' : ''}
              onChange={handlePriceChange}
            />
            <Suffix>원</Suffix>
          </InputContainer>
        </Item>
        <Item>
          <TagText>수량</TagText>
          <InputContainer>
            <Input
              value={amount === 0 ? '' : `${amount}`}
              placeholder="0"
              onChange={handleAmountChange}
            />
            <Suffix>주</Suffix>
          </InputContainer>
        </Item>
        {isKorea ? (
          krHolding?.some((item) => item.symbol === selectCode) ? (
            <SubText isError={1}>
              현재 보유 수량:{' '}
              {krHolding.find((stock) => stock.symbol === selectCode).quantity}
              주
            </SubText>
          ) : (
            <></>
          )
        ) : usHolding?.some((item) => item.symbol === selectCode) ? (
          <SubText isError={1}>
            현재 보유 수량:{' '}
            {usHolding.find((stock) => stock.symbol === selectCode).quantity}주
          </SubText>
        ) : (
          <></>
        )}
      </ItemContainer>
      <BtnContainer>
        {error && <SubText isError={2}>{error}</SubText>}
        <TextContainer>
          <SubText isError={0}>주문금액</SubText>
          <MainText>
            {!isKorea
              ? '- '
              : isSelect === 1
                ? '- '
                : formatNumber(parseInt(selectPrice) * amount)}
            원
          </MainText>
        </TextContainer>
        <Button
          name={
            isSell
              ? isKorea
                ? krHolding?.some((item) => item.symbol === selectCode)
                  ? '매도'
                  : '보유하지 않은 주식'
                : usHolding?.some((item) => item.symbol === selectCode)
                  ? '매도'
                  : '보유하지 않은 주식'
              : '매수'
          }
          status={
            isSell
              ? isKorea
                ? krHolding?.some((item) => item.symbol === selectCode)
                  ? 'stock_sell'
                  : 'disabled'
                : usHolding?.some((item) => item.symbol === selectCode)
                  ? 'stock_sell'
                  : 'disabled'
              : 'stock_purchase'
          }
          onClick={isSell ? onSell : onBuy}
        />
      </BtnContainer>
    </Container>
  );
};

export default SellBuyStock;
