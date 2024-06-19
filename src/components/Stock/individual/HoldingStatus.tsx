import tw, { styled } from 'twin.macro';

const SubText = styled.span`
  ${tw`text-base`}
`;

const Item = styled.div<{ isCol: boolean; isTwo: boolean }>`
  ${tw`flex bg-gray-light px-4 py-3 justify-between rounded-8`}
  ${({ isCol }) => (isCol ? tw`flex-col gap-2` : '')}
  ${({ isTwo }) => (isTwo ? 'flex: 1 1 30%' : 'flex: 1 1 20%')}
`;

const ItemText = styled.span`
  ${tw`text-sm`}
`;

const SubContainer = styled.div`
  ${tw`flex flex-col py-8 px-7`}
`;

const SubItemContainer = styled.div`
  ${tw`flex flex-wrap gap-2 py-8`}
`;

const HoldingStatus = () => {
  return (
    <SubContainer>
      <SubText>보유 현황</SubText>
      <SubItemContainer>
        <Item isCol={true} isTwo={false}>
          <ItemText>평균 단가</ItemText>
          <ItemText>58,000원</ItemText>
        </Item>
        <Item isCol={true} isTwo={false}>
          <ItemText>나의 수익률</ItemText>
          <ItemText>3.3%</ItemText>
        </Item>
        <Item isCol={true} isTwo={false}>
          <ItemText>보유 수량</ItemText>
          <ItemText>230주</ItemText>
        </Item>
      </SubItemContainer>
    </SubContainer>
  );
};

export default HoldingStatus;
