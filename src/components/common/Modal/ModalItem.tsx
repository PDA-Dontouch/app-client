import React from 'react';
import tw, { styled } from 'twin.macro';

interface ItemProps {
  title: string;
  content: string | number;
  isModify: boolean;
  isStock: boolean;
  value?: string;
  formattedValue?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Container = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const ItemContainer = styled.div`
  ${tw`flex justify-between items-center px-5 py-[14px] rounded-8 shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]`}
`;

const Item = styled.div`
  ${tw`flex gap-2 items-center`}
`;

const Input = styled.input`
  ${tw`w-[100px] bg-gray-light border-0 border-solid border-b border-gray-dark focus:outline-none text-base text-end`}
`;

const MainText = styled.span`
  ${tw`text-sm`}
`;

const ErrorText = styled.span`
  ${tw`text-xs text-red text-end px-2`}
`;

const ModalItem = ({
  title,
  content,
  isModify,
  isStock,
  value,
  onChange,
  error,
}: ItemProps) => {
  return (
    <Container>
      <ItemContainer>
        <MainText>{title}</MainText>
        {isModify ? (
          <Item>
            <Input
              type="text"
              onChange={onChange}
              value={value === '0' ? '' : value}
              placeholder="0"
            />
            {isStock ? <MainText>주</MainText> : <MainText>원</MainText>}
          </Item>
        ) : (
          <MainText>{content}</MainText>
        )}
      </ItemContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default ModalItem;
