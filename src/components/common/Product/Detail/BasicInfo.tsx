import tw, { styled } from "twin.macro";
import Carousel from "./Carousel";

const Container = styled.div`${tw`flex flex-col p-5 gap-4`}`;

const MainText = styled.span`${tw`text-base`}`;

const BasicInfo = () => {
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <Container>
      <MainText>기본 정보</MainText>
      <Carousel slides={SLIDES} />
    </Container>
  );
};

export default BasicInfo;