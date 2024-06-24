import tw, { styled } from 'twin.macro';

interface ModalProps {
  isEstates: boolean;
}

const TextContainer = styled.div`
  ${tw`flex flex-col gap-5 py-4`}
`;

const MainText = styled.span`
  ${tw`text-base font-semibold`}
`;

const Text = styled.span`
  ${tw`text-[0.9rem] leading-normal`}
`;

const Check = styled.span<{ isEstates: boolean }>`
  ${tw`font-semibold text-yellow`}
  ${({ isEstates }) => (isEstates ? tw`text-yellow` : tw`text-blue`)}
`;

const InvestmentDescription = ({ isEstates }: ModalProps) => {
  return (
    <TextContainer>
      {isEstates ? (
        <>
          <MainText>부동산·법인·SCF 투자란?</MainText>
          <Text>
            <Check isEstates={isEstates}>✓</Check> 이 페이지에서는 신청자의 주택
            및 전/월세 보증금을 담보로 상품화된 대출에 투자할 수 있습니다. 투자
            시 원금과 함께 사전에 정해진 수익률에 따른 정기적인 이자를 받을 수
            있습니다.
          </Text>
          <Text>
            <Check isEstates={isEstates}>✓</Check> 소액도 자유롭게 투자할 수
            있으며, 하나의 상품에 상품에 최대 500만원 / 부동산과 신재생 에너지
            투자를 통틀어 최대 4천만원까지 투자할 수 있습니다.
          </Text>
          <Text>
            <Check isEstates={isEstates}>✓</Check> 사업자의 연체율과 부실률은
            매우 낮지만, 예금자보호법에 의해 원금을 보호받지 못하는 상품임에
            유의하여 신중하게 투자를 결정해주세요.
          </Text>
          <Text>
            <Check isEstates={isEstates}>✓</Check> 상품의 상세 페이지에서 상품
            개요와 상세 정보, 투자 구조 등 투자 결정에 도움이 될 자료들을 볼 수
            있습니다.
          </Text>
        </>
      ) : (
        <>
          <MainText>신재생에너지 투자란?</MainText>
          <Text>
            <Check isEstates={isEstates}>✓</Check> 이 페이지에서는 재생에너지
            사업자가 필요로 하는 설비 구축 및 운영 비용에 투자할 수 있습니다.
            투자 시 원금과 함께 사전에 정해진 수익률에 따른 정기적인 이자를 받을
            수 있습니다.
          </Text>
          <Text>
            <Check isEstates={isEstates}>✓</Check> 소액도 자유롭게 투자할 수
            있으며, 하나의 상품에 상품에 최대 500만원 / 신재생 에너지와 부동산
            투자를 통틀어 최대 4천만원까지 투자할 수 있습니다.
          </Text>
          <Text>
            <Check isEstates={isEstates}>✓</Check> 사업자의 연체율과 부실률은
            매우 낮지만, 예금자보호법에 의해 원금을 보호받지 못하는 상품임에
            유의하여 신중하게 투자를 결정해주세요.
          </Text>
          <Text>
            <Check isEstates={isEstates}>✓</Check> 상품의 상세 페이지에서 상품
            개요와 상세 정보, 투자 구조 등 투자 결정에 도움이 될 자료들을 볼 수
            있습니다.
          </Text>
        </>
      )}
    </TextContainer>
  );
};

export default InvestmentDescription;
