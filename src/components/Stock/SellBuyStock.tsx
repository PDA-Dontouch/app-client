import tw, { styled } from 'twin.macro';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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

const SubText = styled.span`
  ${tw`text-sm`}
`;

const SellBuyStock = ({ isSell }: SellBuyProps) => {
  const [price, setPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [isSelect, setIsSelect] = useState<number>(0);
  const selectPrice = useSelector(
    (state: RootState) => state.trading.selectedPrice,
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
    if (price === 0 && amount === 0) {
      alert('가격과 수량을 입력해주세요.');
    } else if (price === 0) {
      alert('가격을 입력해주세요.');
    } else if (amount === 0) {
      alert('수량을 입력해주세요.');
    } else {
      if (isSelect === 0) {
        // 지정가
      } else {
        // 시장가
      }
    }
  };

  const onBuy = () => {
    if (price === 0 && amount === 0) {
      alert('가격과 수량을 입력해주세요.');
    } else if (price === 0) {
      alert('가격을 입력해주세요.');
    } else if (amount === 0) {
      alert('수량을 입력해주세요.');
    } else {
      if (isSelect === 0) {
        // 지정가
      } else {
        // 시장가
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
            onClick={() => setIsSelect(0)}
          >
            지정가
          </Btn>
          <Btn
            isLeft={false}
            isSelect={isSelect === 1}
            onClick={() => {
              setIsSelect(1);
              setPrice(0);
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
              placeholder="0"
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
      </ItemContainer>
      <BtnContainer>
        <TextContainer>
          <SubText>주문금액</SubText>
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
