import tw, { styled } from 'twin.macro';
import ClipLoader from 'react-spinners/ClipLoader';

const Container = styled.div`
  ${tw`h-full flex items-center justify-center`}
`;

const StockSkeleton = () => {
  return (
    <Container>
      <ClipLoader color="#E1E1E1" size={40} />
    </Container>
  );
};

export default StockSkeleton;
