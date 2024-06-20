import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`flex gap-4 items-center`}
`;

const ImgContainer = styled.div`
  ${tw`relative w-fit h-[100px]`}
`;

const ItemContainer = styled.div`
  ${tw`min-w-[234px] w-full flex flex-col gap-2`}
`;

const ProductSkeleton = () => {
  return (
    <Container>
      <ImgContainer>
        <Skeleton width={76} height={100} />
      </ImgContainer>
      <ItemContainer>
        <Skeleton width={`80%`} height={20} />
        <Skeleton width={`60%`} height={20} />
        <Skeleton width={`70%`} height={20} />
        <Skeleton width={`90%`} height={20} />
      </ItemContainer>
    </Container>
  );
};

export default ProductSkeleton;
