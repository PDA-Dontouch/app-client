import tw, { styled } from 'twin.macro';

const DescriptionContainer = styled.div`
  ${tw`flex flex-col gap-4 pt-5 pb-22`}
`;

const Description = styled.div`
  ${tw`text-gray-dark w-full text-[0.95rem]`}
`;

export default function P2PLimitDescription() {
  return (
    <DescriptionContainer>
      <Description>
        개인 투자자가 온라인 투자연계금융(P2P금융)을 통해 민간투자법상 하나의
        사회기반시설사업에 투자하는 경우 투자한도는 1억원 이하일 경우 500만원,
        1억원 초과일 경우 2000만원입니다.
      </Description>
      <Description>
        총 투자 한도는 개인투자자 소득금액이 1억원 이하일 경우 4000만원, 1억원
        초과일 경우 1억원입니다.
      </Description>
    </DescriptionContainer>
  );
}
