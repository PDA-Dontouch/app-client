import tw, { styled } from 'twin.macro';
import Button from '../common/Button';
import { useState } from 'react';

interface SellBuyProps {
  isSell: boolean;
  clickPrice: string;
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

const Input = styled.input`
  ${tw`w-[100%] px-2 py-3 box-border border-none text-end text-base rounded-8`}
  &:focus {
    outline: none;
  }
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

const SellBuyStock = ({ isSell, clickPrice }: SellBuyProps) => {
  const [price, setPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [isSelect, setIsSelect] = useState<number>(0);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      setPrice(numericValue);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      setAmount(numericValue);
    }
  };

  return (
    <Container>
      <ItemContainer>
        <SubBtnContainer>
          <Btn
            isLeft={true}
            isSelect={isSelect === 0 ? true : false}
            onClick={() => setIsSelect(0)}
          >
            지정가
          </Btn>
          <Btn
            isLeft={false}
            isSelect={isSelect === 1 ? true : false}
            onClick={() => setIsSelect(1)}
          >
            시장가
          </Btn>
        </SubBtnContainer>
        <Item>
          <TagText>가격</TagText>
          <Input
            disabled={isSelect === 1 ? true : false}
            value={
              clickPrice === ''
                ? '원'
                : `${formatNumber(parseInt(clickPrice))}원`
            }
            onChange={handlePriceChange}
          />
        </Item>
        <Item>
          <TagText>수량</TagText>
          <Input
            value={amount === 0 ? '주' : `${amount}주`}
            onChange={handleAmountChange}
          />
        </Item>
      </ItemContainer>
      <BtnContainer>
        <TextContainer>
          <SubText>주문금액</SubText>
          <MainText>{formatNumber(price * amount)}원</MainText>
        </TextContainer>
        <Button
          name={isSell ? '매도' : '매수'}
          status={isSell ? 'stock_sell' : 'stock_purchase'}
          onClick={() => {}}
        />
      </BtnContainer>
    </Container>
  );
};

export default SellBuyStock;
