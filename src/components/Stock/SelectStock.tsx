import tw, { styled } from "twin.macro";

import Samsung from '../../assets/samsung.svg';
import Delete from '../../assets/delete.svg';

interface StockProps {
  name: string;
  price: string;
  amount: number;
  onDelete: () => void;
}

const Wrapper = styled.div`
  ${tw`relative flex flex-col`}
`;

const DeleteImg = styled.img`
  ${tw`absolute top-[-5px] right-[-5px] cursor-pointer`}
`;

const Container = styled.div`
  ${tw`w-[calc(100% - 32px)] bg-gray-light px-4 py-3 rounded-14`}
`;

const ItemContainer = styled.div`
  ${tw`w-full flex justify-between`}
`;

const Item = styled.div`
  ${tw`flex gap-3 items-center`}
`;

const SubItem = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const Input = styled.input`
  ${tw`w-[50px] bg-gray-light border-0 border-solid border-b border-gray-dark focus:outline-none text-base text-end`}
`;

const Img = styled.img`${tw`object-contain`}`;

const MainText = styled.span`${tw`text-base`}`;

const SubText = styled.span`${tw`text-sm`}`;

const SelectStock = ({ name, price, amount, onDelete }: StockProps) => {
  return (
    <Wrapper>
      <DeleteImg src={Delete} onClick={onDelete} />
      <Container>
        <ItemContainer>
          <Item>
            <Img src={Samsung} />
            <SubItem>
              <MainText>{name}</MainText>
              <SubText>{price}원</SubText>
            </SubItem>
          </Item>
          <Item>
            <Input defaultValue={amount} />
            <MainText>주</MainText>
          </Item>
        </ItemContainer>
      </Container>
    </Wrapper>
  );
};

export default SelectStock;