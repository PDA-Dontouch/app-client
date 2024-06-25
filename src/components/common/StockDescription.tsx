import tw, { styled } from 'twin.macro';

const TextContainer = styled.div`
  ${tw`flex flex-col gap-10 py-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const MainText = styled.span`
  ${tw`text-base font-semibold`}
`;

const Text = styled.span`
  ${tw`text-[0.9rem] leading-normal`}
`;

const Check = styled.span`
  ${tw`font-semibold text-green`}
`;

const StockDescription = () => {
  return (
    <TextContainer>
      <ItemContainer>
        <MainText>시가총액이란?</MainText>
        <Text>
          <Check>✓</Check> 주식 1주의 가격 X 시장에 발행된 주식의 수로, 주식
          시장에서 회사가 평가받고 있는 가치를 의미합니다.
        </Text>
      </ItemContainer>
      <ItemContainer>
        <MainText>PER이란?</MainText>
        <Text>
          <Check>✓</Check> 주가가 회사의 순이익에 비해 어느 정도의 평가를 받고
          있는지 의미합니다. 적자기업이라면 PER이 음수로 표시됩니다.
        </Text>
      </ItemContainer>
      <ItemContainer>
        <MainText>배당 수익률이란?</MainText>
        <Text>
          <Check>✓</Check> 주가 대비 배당금의 비율을 의미합니다.
        </Text>
      </ItemContainer>
    </TextContainer>
  );
};

export default StockDescription;
