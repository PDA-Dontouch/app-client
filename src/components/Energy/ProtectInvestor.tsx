import tw, { styled } from 'twin.macro';
import { energyDetail } from '../../types/energy_product';

interface ProtectProps {
  data: energyDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-6 px-2 mb-6`}
`;

const TextContainer = styled.div`
  ${tw`flex flex-col gap-3`}
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

const ProtectInvestor = ({ data }: ProtectProps) => {
  const collateralManage = [
    data.collateralManagement1,
    data.collateralManagement2,
    data.collateralManagement3,
  ].filter((item) => item && item.trim() !== '');

  const creditEnhancement = [
    data.creditEnhancement1,
    data.creditEnhancement2,
    data.creditEnhancement3,
    data.creditEnhancement4,
    data.creditEnhancement5,
  ].filter((item) => item && item.trim() !== '');

  const collateralList = [
    data.collateralList1,
    data.collateralList2,
    data.collateralList3,
    data.collateralList4,
    data.collateralList5,
  ].filter((item) => item && item.trim() !== '');

  const collateralRecoveryValue = [
    data.collateralRecoveryValue1,
    data.collateralRecoveryValue2,
    data.collateralRecoveryValue3,
    data.collateralRecoveryValue4,
  ].filter((item) => item && item.trim() !== '');

  return (
    <Container>
      <MainText>투자자보호</MainText>
      <ItemContainer>
        <SubText>담보 관리</SubText>
        {collateralManage.map((item, idx) => (
          <MiniText isBold={false} key={idx}>
            {item}
          </MiniText>
        ))}
      </ItemContainer>
      <ItemContainer>
        <SubText>신용보강안</SubText>
        {creditEnhancement.map((item, idx) => (
          <MiniText isBold={false} key={idx}>
            {item}
          </MiniText>
        ))}
      </ItemContainer>
      <ItemContainer>
        <SubText>대출자 정보</SubText>
        <TextContainer>
          <MiniText isBold={true}>사업 내용</MiniText>
          <MiniText isBold={false}>{data.businessDescription}</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>신용도</MiniText>
          <MiniText isBold={false}>{data.creditRating}</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>재무 현황</MiniText>
          <MiniText isBold={false}>{data.financialStatus}</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>동일차주 대출현황</MiniText>
          <MiniText isBold={false}>{data.sameBorrowerLoanStatus}</MiniText>
        </TextContainer>
      </ItemContainer>
      <ItemContainer>
        <SubText>담보 사항</SubText>
        <TextContainer>
          <MiniText isBold={true}>담보물 목록</MiniText>
          {collateralList.map((item, idx) => (
            <MiniText isBold={false} key={idx}>
              {item}
            </MiniText>
          ))}
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>담보물 가치</MiniText>
          <MiniText isBold={false}>{data.collateralValue}</MiniText>
        </TextContainer>
        <TextContainer>
          <MiniText isBold={true}>담보물 회수가액</MiniText>
          {collateralRecoveryValue.map((item, idx) => (
            <MiniText isBold={false} key={idx}>
              {item}
            </MiniText>
          ))}
        </TextContainer>
      </ItemContainer>
    </Container>
  );
};

export default ProtectInvestor;
