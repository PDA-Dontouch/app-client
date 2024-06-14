import tw, { styled } from 'twin.macro';

interface ProgressBarProps {
  isEstates: boolean;
  percentage: number;
}

const ProgressBarContainer = styled.div`
  ${tw`w-full bg-gray30 rounded-full h-[6px]`}
`;

const Filler = styled.div<{ isEstates: boolean; percentage: number }>`
  ${tw`h-full rounded-full flex items-center justify-end`}
  ${({ isEstates }) => (isEstates ? tw`bg-yellow` : tw`bg-blue`)}
  width: ${({ percentage }) => `${percentage}%`};
  transition: width 0.5s ease-in-out;
`;

const ProgressBar = ({ isEstates, percentage }: ProgressBarProps) => {
  return (
    <ProgressBarContainer>
      <Filler isEstates={isEstates} percentage={percentage} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
