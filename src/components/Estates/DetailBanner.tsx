import tw, { css, styled } from 'twin.macro';
import InfoInBanner from './InfoInBanner';
import { estatesDetail } from '../../types/estates_product';
import { energyDetail } from '../../types/energy_product';

interface BannerProps {
  isEstates: boolean;
  data: estatesDetail | energyDetail;
}

const Container = styled.div<{ isEstates: boolean }>`
  ${tw`relative flex flex-col px-5 py-7 gap-7`}
  ${({ isEstates }) =>
    isEstates
      ? css`
          background-image: linear-gradient(#f1cd6d, #e6b637);
        `
      : css`
          background-image: linear-gradient(#90c0ec, #5293d0);
        `}
`;

const TopItem = styled.div`
  ${tw`flex justify-between items-center`}
`;

const Grade = styled.div`
  ${tw`bg-white w-fit flex px-3 py-1 text-xs rounded-8`}
  ${css`
    border: 1px solid rgba(0, 0, 0, 0.07);
  `}
`;

const MidItem = styled.div`
  ${tw`flex flex-col gap-10`}
`;

const MainText = styled.span`
  ${tw`text-xl font-semibold text-white`}
`;

const MiniText = styled.span`
  ${tw`text-xs text-white`}
`;

const DetailBanner = ({ isEstates, data }: BannerProps) => {
  return (
    <Container isEstates={isEstates}>
      <TopItem>
        <Grade>
          등급{' '}
          {isEstates
            ? (data as estatesDetail).eightCreditGrade
            : (data as energyDetail).creditRating}
        </Grade>
        <MiniText>
          {isEstates
            ? (data as estatesDetail).startDatetime.slice(0, 10)
            : (data as energyDetail).startPeriod.slice(0, 10)}{' '}
          오픈
        </MiniText>
      </TopItem>
      <MidItem>
        <MainText>{data.title}</MainText>
        <InfoInBanner
          earningRate={data.earningRate}
          length={
            isEstates
              ? (data as estatesDetail).length
              : (data as energyDetail).investmentPeriod
          }
          totalAmountInvestments={
            isEstates
              ? (data as estatesDetail).totalAmountInvestments
              : (data as energyDetail).fundingAmount + '억원'
          }
        />
      </MidItem>
    </Container>
  );
};

export default DetailBanner;
