import tw, { styled } from 'twin.macro';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBarContainer = styled.div`
  ${tw`w-full bg-gray30 rounded-full h-[6px]`}
`;

const Filler = styled.div<{ percentage: number }>`
  ${tw`bg-blue h-full rounded-full flex items-center justify-end`}
  width: ${({ percentage }) => `${percentage}%`};
  transition: width 0.5s ease-in-out;
`;

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <ProgressBarContainer>
      <Filler percentage={percentage} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
