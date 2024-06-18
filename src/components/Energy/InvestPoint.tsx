import tw, { styled } from 'twin.macro';
import { energyDetail } from '../../types/energy_product';

interface PointProps {
  data: energyDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-8`}
`;

const TextContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold`}
`;
const SubText = styled.span`
  ${tw`text-base`}
`;

const renderBorrowerInfo = (title?: string, content?: string) => {
  if (title && title.trim() !== '' && content && content.trim() !== '') {
    return (
      <TextContainer>
        <MainText>{title}</MainText>
        <SubText>{content}</SubText>
      </TextContainer>
    );
  }
  return null;
};

const InvestPoint = ({ data }: PointProps) => {
  return (
    <Container>
      {/* <MainText>운영 중인 태양광 발전소를 담보로 하는 상품입니다.</MainText> */}
      {renderBorrowerInfo(data.borrowerInfo1Title, data.borrowerInfo1Content)}
      {renderBorrowerInfo(data.borrowerInfo2Title, data.borrowerInfo2Content)}
      {renderBorrowerInfo(data.borrowerInfo3Title, data.borrowerInfo3Content)}
    </Container>
  );
};

export default InvestPoint;
