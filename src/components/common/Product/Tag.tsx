import tw, { css, styled } from "twin.macro";

interface TagProps {
  tags: string[];
}

const Container = styled.div`
  ${tw`flex gap-1`}
`;

const Item = styled.div`
  ${tw`bg-white w-fit flex px-2 py-1 text-xs rounded-8`}
  ${css`
    border: 1px solid rgba(0, 0, 0, 0.07);
  `}
`;

const Tag = ({ tags }: TagProps) => {
  return (
    <Container>
      {tags.map((item, idx) =>
        <Item key={idx}>{item}</Item>
      )}
    </Container>
  );
};

export default Tag;