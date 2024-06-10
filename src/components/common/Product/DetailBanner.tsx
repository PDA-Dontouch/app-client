import tw, { styled } from "twin.macro";
import Navbar from "../Navbar";
import Tag from "./Tag";
import InfoInBanner from "./InfoInBanner";

interface BannerProps {
  tags: string[],
  date: string,
  title: string
}

const Container = styled.div`
  ${tw`relative flex flex-col mt-14 bg-blue px-5 py-7 gap-7`}
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

const DetailBanner = ({ tags, date, title }: BannerProps) => {
  return (
    <>
      <Navbar name="back" type="" />
      <Container>
        <TopItem>
          <Tag tags={tags} />
          <MiniText>{date} 오픈</MiniText>
        </TopItem>
        <MidItem>
          <MainText>{title}</MainText>
          <InfoInBanner />
        </MidItem>
      </Container>
    </>
  );
};

export default DetailBanner;