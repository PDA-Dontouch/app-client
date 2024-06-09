import tw, { styled } from "twin.macro";

interface SortProps {
  isSelect: boolean;
  title: string;
  onClick: () => void;
}

const Container = styled.div<{ isSelect: boolean }>`
  ${tw`w-fit px-3 py-2 rounded-4 text-xs`}
  ${({ isSelect }) => isSelect ? tw`bg-blue text-white` : tw`bg-gray-light text-black`}
`;

const SortButton = ({ isSelect, title, onClick }: SortProps) => {
  return (
    <Container isSelect={isSelect} onClick={onClick}>{title}</Container>
  );
};

export default SortButton;