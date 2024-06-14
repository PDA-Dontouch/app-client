import tw, { styled } from 'twin.macro';

type GreenBarTitleProps = {
  text: string;
};

const TitleContainer = styled.div`
  ${tw`flex flex-row items-end w-full`}
  box-sizing: border-box;
`;

const Title = styled.div`
  ${tw`flex flex-col h-full text-xl`}
  position:relative;
`;

const GreenBar = styled.div`
  position: absolute;
  bottom: 0;
  ${tw`h-1/2 w-full`};
  background-color: #1aa76e66;
`;

export default function GreenBarTitle({ text }: GreenBarTitleProps) {
  return (
    <TitleContainer>
      <Title>
        {text}
        <GreenBar />
      </Title>
    </TitleContainer>
  );
}
