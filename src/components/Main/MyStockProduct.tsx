import tw, { styled } from 'twin.macro';

export type MyStockProductType = {
  code: string;
  name: string;
  price: number;
  compare: number;
};

type StockImgProps = {
  code: string;
};

type CompareProps = {
  compare: number;
};

const MyStockProductContainer = styled.div`
  ${tw`flex flex-row p-2 w-full justify-between items-center`}
  box-sizing:border-box;
`;

const LeftSection = styled.div`
  ${tw`flex flex-row gap-3 items-center w-auto`}
  overflow:hidden;
`;

const StockImg = styled.div<StockImgProps>`
  ${({ code }) =>
    '0' <= code[0] && code[0] <= '9'
      ? `background-image:url("https://file.alphasquare.co.kr/media/images/stock_logo/kr/${code}.png");`
      : `background-image:url("https://file.alphasquare.co.kr/media/images/stock_logo/us/${code}.png");`}

  width: 35px;
  height: 35px;
  border-radius: 20px;
  background-size: contain;
`;

const StockName = styled.div`
  ${tw`text-sm`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 12rem;
`;

const RightSection = styled.div`
  ${tw`flex flex-col gap-1 items-end w-fit`}
`;

const Price = styled.div`
  ${tw`text-sm`}
  width: fit-content;
`;

const Compare = styled.div<CompareProps>`
  ${tw`text-xxs`}
  ${({ compare }) => {
    return compare < 0 ? tw`text-blue` : tw`text-red`;
  }}
  width: fit-content;
`;

export default function MyStockProduct({
  code,
  name,
  price,
  compare,
}: MyStockProductType) {
  return (
    <MyStockProductContainer>
      <LeftSection>
        <StockImg code={code}></StockImg>
        <StockName>{name}</StockName>
      </LeftSection>
      <RightSection>
        <Price>{price.toLocaleString()}원</Price>
        <Compare compare={compare}>
          어제보다{compare > 0 ? '+' : null}
          {compare}%
        </Compare>
      </RightSection>
    </MyStockProductContainer>
  );
}
