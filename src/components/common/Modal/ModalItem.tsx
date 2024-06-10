import tw, { styled } from "twin.macro";

interface ItemProps {
  title: string;
  content: string | number;
  isModify: boolean;
  isStock: boolean;
}

const Container = styled.div`
  ${tw`flex justify-between items-center px-5 py-[14px] rounded-8 shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]`}
`;

const Item = styled.div`
  ${tw`flex gap-2 items-center`}
`;

const Input = styled.input`
  ${tw`w-[50px] bg-gray-light border-0 border-solid border-b border-gray-dark focus:outline-none text-base text-end`}
`;

const MainText = styled.span`${tw`text-sm`}`;

const ModalItem = ({ title, content, isModify, isStock }: ItemProps) => {
  return (
    <Container>
      <MainText>{title}</MainText>
      {isModify ?
        <Item>
          <Input defaultValue={0} />
          {isStock ? <MainText>주</MainText> : <MainText>만원</MainText>}
        </Item>
      :
        <MainText>{content}</MainText>
      }
    </Container>
  );
};

export default ModalItem;