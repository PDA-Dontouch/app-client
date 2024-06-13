import tw, { styled } from 'twin.macro';
import { productDetail } from '../../types/product';

interface PointProps {
  data: productDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-5`}
`;

const ItemContainer = styled.div`
  ${tw`flex gap-3 items-center`}
`;

const TextContainer = styled.div`
  ${tw`flex flex-col gap-[6px]`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold mb-3`}
`;
const SubText = styled.span`
  ${tw`text-base font-semibold`}
`;
const MiniText = styled.span`
  ${tw`text-sm`}
`;

const Img = styled.img`
  ${tw`w-14`}
`;

const InvestPoint = ({ data }: PointProps) => {
  return (
    <Container>
      <MainText>투자 포인트</MainText>
      <ItemContainer>
        <Img src={data.sellingPointsIconImage} />
        <TextContainer>
          <SubText>{data.sellingPointsTitle}</SubText>
          <MiniText>{data.sellingPointsDescription}</MiniText>
        </TextContainer>
      </ItemContainer>
      <ItemContainer>
        <Img src={data.sellingPointsIconImage2} />
        <TextContainer>
          <SubText>{data.sellingPointsTitle2}</SubText>
          <MiniText>{data.sellingPointsDescription2}</MiniText>
        </TextContainer>
      </ItemContainer>
    </Container>
  );
};

export default InvestPoint;
