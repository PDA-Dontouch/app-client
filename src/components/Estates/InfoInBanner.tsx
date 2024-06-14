import tw, { styled } from 'twin.macro';

interface InfoProps {
  earningRate: number;
  length: number;
  totalAmountInvestments: number | string;
}

const Container = styled.div`
  ${tw`flex gap-5 items-center justify-evenly`}
`;

const Wrapper = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const MainText = styled.span`
  ${tw`text-white text-xl`}
`;

const SubText = styled.span`
  ${tw`text-white text-sm`}
`;

const Divide = styled.div`
  ${tw`h-[30px] w-[3px] bg-white`}
`;

export function formatNumberToKorean(num: number) {
  const units = ['', '만', '억', '조', '경'];
  const smallUnits = ['', '십', '백', '천'];

  let result = '';
  let unitIndex = 0;

  while (num > 0) {
    let part = num % 10000;
    if (part > 0) {
      let partStr = '';
      let smallUnitIndex = 0;

      while (part > 0) {
        const digit = part % 10;
        if (digit > 0) {
          partStr = digit + smallUnits[smallUnitIndex] + partStr;
        }
        part = Math.floor(part / 10);
        smallUnitIndex++;
      }
      result = partStr + units[unitIndex] + result;
    }
    num = Math.floor(num / 10000);
    unitIndex++;
  }

  return result + '원';
}

const InfoInBanner = ({
  earningRate,
  length,
  totalAmountInvestments,
}: InfoProps) => {
  return (
    <Container>
      <Wrapper>
        <SubText>연 수익률</SubText>
        <MainText>{earningRate}%</MainText>
      </Wrapper>
      <Divide />
      <Wrapper>
        <SubText>투자기간</SubText>
        <MainText>{length}개월</MainText>
      </Wrapper>
      <Divide />
      <Wrapper>
        <SubText>총 모집금액</SubText>
        <MainText>
          {typeof totalAmountInvestments === 'number'
            ? formatNumberToKorean(totalAmountInvestments)
            : totalAmountInvestments}
        </MainText>
      </Wrapper>
    </Container>
  );
};

export default InfoInBanner;
