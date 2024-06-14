import tw, { styled } from 'twin.macro';

type TotalPriceProps = {
  text?: string;
  price?: number;
};

const Container = styled.div`
  ${tw`flex flex-row justify-between items-center py-3`}
`;

const Price = styled.div`
  ${tw`text-3xl`}
  font-weight: 500;
`;

export default function TotalPrice({ text, price }: TotalPriceProps) {
  return (
    <Container>
      <div>{text}</div>
      <Price>{price!.toLocaleString()}원</Price>
    </Container>
  );
}
