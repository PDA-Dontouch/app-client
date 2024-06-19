import tw, { styled } from 'twin.macro';

const NothingContainer = styled.div`
  ${tw`flex flex-row justify-center items-center w-full py-5 text-black40`}
`;

export default function Nothing() {
  return <NothingContainer>보유 상품이 없습니다.</NothingContainer>;
}
