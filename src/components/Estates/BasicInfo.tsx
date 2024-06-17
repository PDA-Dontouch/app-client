import tw, { styled } from 'twin.macro';
import Carousel from '../common/Product/Detail/Carousel';
import { EstatesList, estatesDetail } from '../../types/estates_product';
import { formatNumberToKorean } from './InfoInBanner';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface BasicProps {
  data: estatesDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-4`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col px-2 gap-4`}
`;

const TextContainer = styled.div`
  ${tw`flex gap-3 items-center`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold mb-3`}
`;
const SubText = styled.span`
  ${tw`text-base font-semibold`}
`;
const MiniText = styled.span`
  ${tw`text-[15px] w-[100px]`}
`;

const Img = styled.img`
  ${tw`rounded-4 h-[180px]`}
`;

const BasicInfo = ({ data }: BasicProps) => {
  const clickData = useSelector(
    (state: RootState) => state.estates.clickEstates,
  );

  return (
    <Container>
      <MainText>상품 개요</MainText>
      <Img src={data.photos} />
      <ItemContainer>
        <TextContainer>
          <MiniText>대출예정금액</MiniText>
          <SubText>{formatNumberToKorean(data.finalAmountWon)}</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>대출종류</MiniText>
          <SubText>{data.loanType}</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>상환방식</MiniText>
          <SubText>{data.method}</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>자금용도</MiniText>
          <SubText>{data.reason}</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>유효담보비율</MiniText>
          <SubText>{clickData.loanAmountBaseLtv.toFixed(2)}%</SubText>
        </TextContainer>
        <TextContainer>
          <MiniText>감정가</MiniText>
          <SubText>{formatNumberToKorean(data.appraisedValue)}</SubText>
        </TextContainer>
      </ItemContainer>
    </Container>
  );
};

export default BasicInfo;
