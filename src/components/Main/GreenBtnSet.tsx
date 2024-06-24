import tw, { styled } from 'twin.macro';

type color = 'green' | 'white';

type GreenBtnSetProps = {
  leftColor: color;
  rightColor: color;
  leftText: string;
  rightText: string;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
};

type BtnProps = {
  color: color;
};

const Container = styled.div`
  ${tw`flex flex-row gap-3 w-full`}
`;

const Btn = styled.button<BtnProps>`
  ${tw`w-full px-3 py-4 text-sm`}
  ${({ color }) => {
    return color == 'green' ? tw`bg-green text-white` : tw`bg-white text-green`;
  }}
  border-radius: 12px;
  border: none;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.15);
`;

export default function GreenBtnSet({
  leftColor,
  rightColor,
  leftText,
  rightText,
  leftOnClick,
  rightOnClick,
}: GreenBtnSetProps) {
  return (
    <Container>
      <Btn color={leftColor} onClick={leftOnClick}>
        {leftText}
      </Btn>
      <Btn color={rightColor} onClick={rightOnClick}>
        {rightText}
      </Btn>
    </Container>
  );
}
