import tw, { styled } from 'twin.macro';
import Carousel from '../common/Product/Detail/Carousel';
import { energyDetail } from '../../types/energy_product';

interface BasicProps {
  data: energyDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col px-2 gap-6`}
`;

const TextContainer = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold mb-3`}
`;
const SubText = styled.span`
  ${tw`text-base font-semibold`}
`;
const MiniText = styled.span`
  ${tw`text-[15px] min-w-[100px]`}
`;

const BusinessInfo = ({ data }: BasicProps) => {
  const images = [
    data.projectOverviewImageLink1,
    data.projectOverviewImageLink2,
    data.projectOverviewImageLink3,
    data.projectOverviewImageLink4,
  ].filter((item) => item && item.trim() !== '');

  const permit = [
    data.permit1,
    data.permit2,
    data.permit3,
    data.permit4,
  ].filter((item) => item && item.trim() !== '');

  return (
    <Container>
      <MainText>사업 개요</MainText>
      <Carousel slides={images} />
      <ItemContainer>
        <TextContainer>
          <MiniText>사업명</MiniText>
          <SubText>{data.projectName}</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>사업부지</MiniText>
          <SubText>{data.projectSite}</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>설비용량</MiniText>
          <SubText>{data.facilityCapacity}</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>시공사</MiniText>
          <SubText>{data.contractor}</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>인허가</MiniText>
          <SubText>
            {permit.map((item, idx) => {
              return idx !== permit.length - 1 ? item + ', ' : item;
            })}
          </SubText>
        </TextContainer>
      </ItemContainer>
    </Container>
  );
};

export default BusinessInfo;
