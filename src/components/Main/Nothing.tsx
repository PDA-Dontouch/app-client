import tw, { styled } from 'twin.macro';

type NothingProps = {
  text?: string;
};

const NothingContainer = styled.div`
  ${tw`flex flex-row justify-center items-center w-full py-5 text-black40`}
  box-sizing:border-box;
`;

export default function Nothing({ text }: NothingProps) {
  return (
    <NothingContainer>{text ? text : '보유 상품이 없습니다.'}</NothingContainer>
  );
}
