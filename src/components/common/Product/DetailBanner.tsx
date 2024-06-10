import tw, { css, styled } from "twin.macro";
import Tag from "./Tag";
import InfoInBanner from "./InfoInBanner";

interface BannerProps {
  isEstates: boolean;
  tags: string[];
  date: string;
  title: string;
}

const Container = styled.div<{ isEstates: boolean }>`
  ${tw`relative flex flex-col mt-14 px-5 py-7 gap-7`}
  ${({ isEstates }) => isEstates ? css`background-image: linear-gradient(#F1CD6D, #E6B637);` : css`background-image: linear-gradient(#90C0EC, #5293D0);`}
`;

const TopItem = styled.div`
  ${tw`flex justify-between`}
`;

const MidItem = styled.div`
  ${tw`flex flex-col gap-10`}
`;

const MainText = styled.span`
  ${tw`text-xl font-semibold text-white`}
`;

const MiniText = styled.span`
  ${tw`text-xs text-white`}
`;

const DetailBanner = ({ isEstates, tags, date, title }: BannerProps) => {
  return (
    <Container isEstates={isEstates}>
      <TopItem>
        <Tag tags={tags} />
        <MiniText>{date} 오픈</MiniText>
      </TopItem>
      <MidItem>
        <MainText>{title}</MainText>
        <InfoInBanner />
      </MidItem>
    </Container>
  );
};

export default DetailBanner;