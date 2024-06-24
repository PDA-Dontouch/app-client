import tw, { css, styled } from 'twin.macro';

type GreenBarTitleProps = {
  text: string;
};

const TitleContainer = styled.div`
  ${tw`flex flex-row items-end w-full`}
  box-sizing: border-box;
`;

const Title = styled.div`
  ${tw`flex flex-col h-full text-xl`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(82, 147, 208, 0.5);
    line-height: 26px;
  `}
`;

export default function GreenBarTitle({ text }: GreenBarTitleProps) {
  return (
    <TitleContainer>
      <Title>{text}</Title>
    </TitleContainer>
  );
}
