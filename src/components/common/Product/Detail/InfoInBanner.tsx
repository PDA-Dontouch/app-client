import tw, { styled } from "twin.macro";

const Container = styled.div`
  ${tw`flex gap-7 items-center justify-evenly`}
`;

const Wrapper = styled.div`${tw`flex flex-col gap-1`}`;

const MainText = styled.span`${tw`text-white text-xl`}`;

const SubText = styled.span`${tw`text-white text-sm`}`;

const Divide = styled.div`${tw`h-[30px] w-[3px] bg-white`}`;

const InfoInBanner = () => {
  return (
    <Container>
      <Wrapper>
        <SubText>연 수익률</SubText>
        <MainText>14.50%</MainText>
      </Wrapper>
      <Divide />
      <Wrapper>
        <SubText>투자기간</SubText>
        <MainText>8개월</MainText>
      </Wrapper>
      <Divide />
      <Wrapper>
        <SubText>총 모집금액</SubText>
        <MainText>1.4억원</MainText>
      </Wrapper>
    </Container>
  );
};

export default InfoInBanner;