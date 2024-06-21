import tw, { styled } from 'twin.macro';

import Expert from '../../assets/expert.svg';
import { EstatesDetail } from '../../types/estates_product';

interface ExpertProps {
  data: EstatesDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex gap-2 items-center`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold mb-3`}
`;
const SubText = styled.span`
  ${tw`text-lg font-semibold`}
`;
const MiniText = styled.span`
  ${tw`text-[15px] px-1 leading-normal`}
`;

const Img = styled.img`
  ${tw`w-9`}
`;

const ExpertCheck = ({ data }: ExpertProps) => {
  return (
    <Container>
      <MainText>전문가 확인</MainText>
      <ItemContainer>
        <Img src={Expert} />
        <SubText>
          {data.expertName} {data.expertRole}
        </SubText>
      </ItemContainer>
      <MiniText>{data.expertContent}</MiniText>
    </Container>
  );
};

export default ExpertCheck;
