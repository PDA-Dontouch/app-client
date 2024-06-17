import tw, { styled } from 'twin.macro';
import MapComponent from '../common/MapComponent';
import { estatesDetail } from '../../types/estates_product';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface DetailProps {
  data: estatesDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-4`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold mb-3`}
`;

const DetailInfo = ({ data }: DetailProps) => {
  const clickData = useSelector(
    (state: RootState) => state.estates.clickEstates,
  );
  const addressParts = clickData.title.split(' ');
  const lastPartAddress = addressParts[addressParts.length - 1];

  return (
    <Container>
      <MainText>상세 정보</MainText>
      <MapComponent
        lat={data.latitude}
        lng={data.longitude}
        lastPartAddress={lastPartAddress}
      />
    </Container>
  );
};

export default DetailInfo;
