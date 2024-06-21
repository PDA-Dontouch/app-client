import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import tw, { styled } from 'twin.macro';

const StockFont = styled.div`
  ${tw`w-[100%]`}
`;

const StockDiv = styled.div`
  ${tw`w-[160%] mt-2`}
`;

const MarketInfoSkeleton = () => {
  return (
    <>
      <StockFont>
        <Skeleton width={`100%`} height={19} />
      </StockFont>
      <StockDiv>
        <Skeleton width={`100%`} height={17} />
      </StockDiv>
    </>
  );
};

export default MarketInfoSkeleton;
