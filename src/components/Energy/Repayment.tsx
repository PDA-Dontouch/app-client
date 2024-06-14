import tw, { styled } from 'twin.macro';
import { energyDetail } from '../../types/energy_product';

interface RepaymentProps {
  data: energyDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-6 px-2 mb-6`}
`;

const TextContainer = styled.div`
  ${tw`flex gap-3 leading-tight`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold mb-3`}
`;

const SubText = styled.span`
  ${tw`text-base`}
`;

const Repayment = ({ data }: RepaymentProps) => {
  const repaymentSource = [data.repaymentSource1, data.repaymentSource2].filter(
    (item) => item && item.trim() !== '',
  );

  return (
    <Container>
      <MainText>상환 재원</MainText>
      <ItemContainer>
        {repaymentSource.map((item, idx) => (
          <TextContainer key={idx}>
            <SubText>•</SubText>
            <SubText>{item}</SubText>
          </TextContainer>
        ))}
      </ItemContainer>
    </Container>
  );
};

export default Repayment;
