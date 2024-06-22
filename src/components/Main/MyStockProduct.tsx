import tw, { styled } from 'twin.macro';
import logoImg from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

type HoldingStockType = {
  code: string;
  name: string;
  price: string;
  compare: number | null;
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

const StockImg = styled.img`
  ${tw`rounded-full`}
  width: 35px;
  height: 35px;
  background-size: contain;
`;

const StockName = styled.div`
  ${tw`text-sm`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 9rem;
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
}: HoldingStockType) {
  const navigate = useNavigate();

  return (
    <MyStockProductContainer
      onClick={() => {
        `/stocks/${code}`;
      }}
    >
      <LeftSection>
        <StockImg
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/${'0' <= code.charAt(0) && code.charAt(0) <= '9' ? 'kr' : 'us'}/${code}.png`}
          onError={(e) => {
            e.currentTarget.src = logoImg;
          }}
        />
        <StockName>{name}</StockName>
      </LeftSection>
      <RightSection>
        <Price>{price}</Price>
        {compare && (
          <Compare compare={compare}>
            {compare > 0 ? '+' : '-'}
            {compare}원
          </Compare>
        )}
      </RightSection>
    </MyStockProductContainer>
  );
}
