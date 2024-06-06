import tw, { styled } from "twin.macro";

import Samsung from '../../../assets/samsung.svg';

const Container = styled.div`
  ${tw`flex justify-center items-center gap-2`}
`;

const Item = styled.div`
  ${tw`flex flex-col items-center gap-1`}
`;

const MainText = styled.span`${tw`text-sm`}`;

const SubText = styled.span`${tw`text-xs`}`;

const StockItem = () => {
  return (
    <Container>
      <img src={Samsung} />
      <Item>
        <MainText>삼성전자</MainText>
        <SubText>100주</SubText>
      </Item>
    </Container>
  );
};

export default StockItem;