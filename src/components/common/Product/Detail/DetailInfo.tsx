import tw, { styled } from "twin.macro";
import MapComponent from "../../MapComponent";

const Container = styled.div`${tw`flex flex-col p-5 gap-4`}`;

const MainText = styled.span`${tw`text-base`}`;

const DetailInfo = () => {
  return (
    <Container>
      <MainText>상세 정보</MainText>
      <MapComponent />
    </Container>
  );
};

export default DetailInfo;