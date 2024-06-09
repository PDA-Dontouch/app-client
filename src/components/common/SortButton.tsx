import tw, { styled } from "twin.macro";

interface SortProps {
  isEstates: boolean;
  isSelect: boolean;
  title: string;
  onClick: () => void;
}

const Container = styled.div<{ isEstates: boolean, isSelect: boolean }>`
  ${tw`w-fit px-3 py-2 rounded-4 text-xs`}
  ${({ isEstates, isSelect }) => 
    isEstates 
    ? isSelect ? tw`bg-yellow text-white` : tw`bg-gray-light text-black` 
    : isSelect ? tw`bg-blue text-white` : tw`bg-gray-light text-black`}
`;

const SortButton = ({ isEstates, isSelect, title, onClick }: SortProps) => {
  return (
    <Container isEstates={isEstates} isSelect={isSelect} onClick={onClick}>{title}</Container>
  );
};

export default SortButton;