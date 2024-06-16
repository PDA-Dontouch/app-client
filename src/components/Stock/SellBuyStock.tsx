import tw, { styled } from 'twin.macro';
import Button from '../common/Button';

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
  ${tw`text-base`}
`;

const Input = styled.input`
  ${tw`w-[100%] px-2 py-3 box-border border-none`}
  &:focus {
    outline: none;
  }
`;

const BtnContainer = styled.div`
  ${tw`flex flex-col gap-3`}
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
  return (
    <Container>
      <ItemContainer>
        <Item>
          <TagText>가격</TagText>
          <Input />
        </Item>
        <Item>
          <TagText>수량</TagText>
          <Input />
        </Item>
      </ItemContainer>
      <BtnContainer>
        <TextContainer>
          <SubText>주문금액</SubText>
          <MainText>0원</MainText>
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
