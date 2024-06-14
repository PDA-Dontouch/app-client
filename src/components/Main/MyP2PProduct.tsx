import tw, { styled } from 'twin.macro';

export type MyP2PProductType = {
  img: string;
  name: string;
  monthlyDividend: number;
  annualRate: number;
  openDate: Date;
};

type P2PImgProps = {
  img: string;
};

const MyP2PProductContainer = styled.div`
  ${tw`flex flex-row p-2 w-full justify-between items-center`}
  box-sizing:border-box;
`;

const LeftSection = styled.div`
  ${tw`flex flex-row gap-3 items-center w-fit`}
  box-sizing:border-box;
`;

const P2PImg = styled.div<P2PImgProps>`
  ${({ img }) => `background-image:url(${img});`}
  width: 35px;
  height: 35px;
  border-radius: 20px;
  background-size: contain;
`;

const P2PDetail = styled.div`
  ${tw`flex flex-col gap-1`}
  box-sizing: border-box;
`;

const P2PName = styled.div`
  ${tw`text-sm`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 12rem;
`;

const P2POpenDate = styled.div`
  ${tw`text-xxs text-black40 w-fit`}
`;

const RightSection = styled.div`
  ${tw`flex flex-col gap-1 items-end`}
  width:fit-content;
`;

const MonthlyDividend = styled.div`
  flex-wrap: nowrap;
  ${tw`text-sm`}
`;

const AnnualRate = styled.div`
  ${tw`text-xxs`}
`;

export default function MyP2PProduct({
  img,
  name,
  monthlyDividend,
  annualRate,
  openDate,
}: MyP2PProductType) {
  return (
    <MyP2PProductContainer>
      <LeftSection>
        <P2PImg img={img}></P2PImg>
        <P2PDetail>
          <P2PName>{name}</P2PName>
          {openDate > new Date() && (
            <P2POpenDate>
              {'오픈 '}
              {openDate.getFullYear()}.{openDate.getMonth() < 9 && '0'}
              {openDate.getMonth() + 1}.{openDate.getDate()}
            </P2POpenDate>
          )}
        </P2PDetail>
      </LeftSection>
      <RightSection>
        <MonthlyDividend>{monthlyDividend.toLocaleString()}원</MonthlyDividend>
        <AnnualRate>{annualRate}%</AnnualRate>
      </RightSection>
    </MyP2PProductContainer>
  );
}
