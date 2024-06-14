import tw, { styled } from 'twin.macro';
import { energyDetail } from '../../types/energy_product';
import { formatNumberToKorean } from '../Estates/InfoInBanner';

interface BasicProps {
  data: energyDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-5 px-2 mb-6`}
`;

const TextContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold mb-3`}
`;

const SubText = styled.span`
  ${tw`text-lg text-blue font-semibold`}
`;

const MiniText = styled.span<{ isBold: boolean }>`
  ${tw`text-[15px] leading-tight`}
  ${({ isBold }) => (isBold ? tw`font-semibold` : '')}
`;

const BasicInfo = ({ data }: BasicProps) => {
  return (
    <Container>
      <MainText>상품 개요</MainText>
      <ItemContainer>
        <SubText>투자 구조</SubText>
        <TextContainer>
          <MiniText isBold={true}>수익률</MiniText>
          <MiniText isBold={false}>세전 연 {data.earningRate}%</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>투자기간</MiniText>
          <MiniText isBold={false}>{data.investmentPeriod}개월</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>모집금액</MiniText>
          <MiniText isBold={false}>
            {formatNumberToKorean(data.sumOfInvestmentAndReservation)}
          </MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>총 투자금</MiniText>
          <MiniText isBold={false}>{data.fundingAmount}억원</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>상환방식</MiniText>
          <MiniText isBold={false}>{data.repaymentMethod}</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>중도상환수수료</MiniText>
          <MiniText isBold={false}>{data.earlyRepaymentFee}</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>기타</MiniText>
          <MiniText isBold={false}>
            수익률(세전): 연 {data.grossReturnRate}%
          </MiniText>
          <MiniText isBold={false}>
            순수익률(세후): 연 {data.netReturnRate}%
          </MiniText>
          <MiniText isBold={false}>
            총 예상수익률: 연 {data.expectedTotalReturnRate}%
          </MiniText>
        </TextContainer>
      </ItemContainer>
    </Container>
  );
};

export default BasicInfo;
