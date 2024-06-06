import tw, { styled } from "twin.macro";
import StockContainer from "./StockContainer";

const Wrapper = styled.div`
  ${tw`bg-gray-light px-5 py-5 rounded-16`}
`;

const Container = styled.div`
  ${tw`w-full h-full flex flex-col gap-3`}
`;

const CombiBox = () => {
  return (
    <Wrapper>
      <Container>
        <StockContainer />
      </Container>
    </Wrapper>
  );
};

export default CombiBox;