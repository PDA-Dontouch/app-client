import tw, { styled } from 'twin.macro';
import {
  EnergyList,
  HeldEnergyList,
  MyP2PProductType,
} from '../../types/energy_product';
import { WithEnergyId } from '../../types/energy_product';
import {
  EstatesList,
  HeldEstatesList,
  WithEstateId,
} from '../../types/estates_product';
import { useNavigate } from 'react-router-dom';

type P2PImgProps = {
  img: string;
};

type P2PProps = {
  data:
    | (MyP2PProductType & WithEstateId)
    | (MyP2PProductType & WithEnergyId)
    | EstatesList
    | EnergyList;
  isEstates: boolean;
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
  width: 10rem;
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

export default function MyP2PProduct({ data, isEstates }: P2PProps) {
  const navigate = useNavigate();

  return (
    <>
      {'startPeriod' in data ? (
        <MyP2PProductContainer
          onClick={() => {
            if (isEstates) {
              navigate(
                `/estates/${(data as MyP2PProductType & WithEstateId).estateId}`,
              );
            } else {
              navigate(
                `/energy/${(data as MyP2PProductType & WithEnergyId).energyId}`,
              );
            }
          }}
        >
          <LeftSection>
            <P2PImg img={data.titleImageUrl}></P2PImg>
            <P2PDetail>
              <P2PName>{data.title}</P2PName>
              {data.startPeriod > new Date() && (
                <P2POpenDate>
                  {'오픈 '}
                  {data.startPeriod.getFullYear()}.
                  {data.startPeriod.getMonth() < 9 && '0'}
                  {data.startPeriod.getMonth() + 1}.{data.startPeriod.getDate()}
                </P2POpenDate>
              )}
            </P2PDetail>
          </LeftSection>
          <RightSection>
            <MonthlyDividend>
              {Math.floor(
                (data.inputCash * data.earningRate * 0.01) /
                  data.investmentPeriod,
              ).toLocaleString()}
              원
            </MonthlyDividend>
            <AnnualRate>{data.earningRate}%</AnnualRate>
          </RightSection>
        </MyP2PProductContainer>
      ) : (
        <MyP2PProductContainer
          onClick={() => {
            if (isEstates) {
              navigate(`/estates/${(data as EstatesList).id}`);
            } else {
              navigate(`/energy/${(data as EnergyList).energyId}`);
            }
          }}
        >
          <LeftSection>
            <P2PImg
              img={
                'titleImageUrl' in data
                  ? data.titleImageUrl
                  : data.titleMainImageUrl
              }
            ></P2PImg>
            <P2PDetail>
              <P2PName>{data.title}</P2PName>

              <P2POpenDate>
                {'titleImageUrl' in data ? data.investmentPeriod : data.length}
                개월
              </P2POpenDate>
            </P2PDetail>
          </LeftSection>
          <RightSection>
            <MonthlyDividend>배당률 {data.earningRate}%</MonthlyDividend>
          </RightSection>
        </MyP2PProductContainer>
      )}
    </>
  );
}
