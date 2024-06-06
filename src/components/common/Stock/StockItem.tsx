import tw, { styled } from "twin.macro";

import Samsung from '../../../assets/samsung.svg';

interface ItemProps {
  name: string;
  amount: number;
}

const Container = styled.div`
  ${tw`flex justify-center items-center gap-2`}
`;

const Item = styled.div`
  ${tw`flex flex-col items-center gap-[2px]`}
`;

const MainText = styled.span`${tw`text-sm`}`;

const SubText = styled.span`${tw`text-xs`}`;

const StockItem = ({ name, amount }: ItemProps) => {
  return (
    <Container>
      <img src={Samsung} />
      <Item>
        <MainText>{name}</MainText>
        <SubText>{amount}주</SubText>
      </Item>
    </Container>
  );
};

export default StockItem;