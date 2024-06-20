import tw, { styled } from 'twin.macro';
import Button from '../../common/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
  buyLimitOrder,
  sellLimitOrder,
} from '../../../store/reducers/stocks/trading';
import { useNavigate } from 'react-router-dom';
import { leaveRoom } from '../../../store/webSocket/nowPrice';

interface SellBuyProps {
  isSell: boolean;
}

const Container = styled.div`
  ${tw`w-full flex flex-col px-4 justify-between`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const Item = styled.div`
  ${tw`flex flex-col gap-2`}
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
  ${tw`flex`}
`;

const Btn = styled.button<{ isSelect: boolean; isLeft: boolean }>`
  ${tw`bg-white border-none py-2`}
  ${({ isSelect }) => (isSelect ? tw`bg-[#FFE3D7]` : tw``)}
  ${({ isLeft }) => (isLeft ? tw`rounded-l-8` : tw`rounded-r-8`)}
`;

const TextContainer = styled.div`
  ${tw`flex justify-between px-1`}
`;

const MainText = styled.span`
  ${tw`text-base font-semibold`}
`;

const SubText = styled.span<{ isError: boolean }>`
  ${tw`text-sm text-end`}
  ${({ isError }) => (isError ? tw`text-red` : '')}
`;

const SellBuyStock = ({ isSell }: SellBuyProps) => {
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
    if (isSelect === 0) {
      if (price === 0 && amount === 0) {
        setError('가격과 수량을 입력해주세요.');
      } else if (price === 0) {
        setError('가격을 입력해주세요.');
      }
    } else if (amount === 0) {
      setError('수량을 입력해주세요.');
    } else {
      if (isSelect === 0) {
        const data = {
          stockName: detail.basic_info.name,
          stockCode: detail.basic_info.symbol,
          userId: 9,
          price: price,
          amount: amount,
        };
        dispatch(sellLimitOrder(data)).then(() => {
          navigate('/result/sell');
          leaveRoom(selectCode);
        });
      } else {
        // 시장가
        console.log('시장가로 사기');
      }
    }
  };

  const onBuy = () => {
    if (isSelect === 0) {
      if (price === 0 && amount === 0) {
        setError('가격과 수량을 입력해주세요.');
      } else if (price === 0) {
        setError('가격을 입력해주세요.');
      }
    } else if (amount === 0) {
      setError('수량을 입력해주세요.');
    } else {
      if (isSelect === 0) {
        const data = {
          stockName: detail.basic_info.name,
          stockCode: detail.basic_info.symbol,
          userId: 9,
          price: price,
          amount: amount,
        };
        dispatch(buyLimitOrder(data)).then(() => {
          navigate('/result/pending');
          leaveRoom(selectCode);
        });
      } else {
        // 시장가
        console.log('시장가로 사기');
      }
    }
  };

  return (
    <Container>
      <ItemContainer>
        <SubBtnContainer>
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
        </SubBtnContainer>
        <Item>
          <TagText>가격</TagText>
          <InputContainer>
            <Input
              disabled={isSelect === 1}
              value={price === 0 ? '' : `${formatNumber(price)}`}
              placeholder={isSelect === 0 ? '0' : ''}
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
        {error && <SubText isError={true}>{error}</SubText>}
      </ItemContainer>
      <BtnContainer>
        <TextContainer>
          <SubText isError={false}>주문금액</SubText>
          <MainText>{formatNumber(parseInt(selectPrice) * amount)}원</MainText>
        </TextContainer>
        <Button
          name={isSell ? '매도' : '매수'}
          status={isSell ? 'stock_sell' : 'stock_purchase'}
          onClick={isSell ? onSell : onBuy}
        />
      </BtnContainer>
    </Container>
  );
};

export default SellBuyStock;
