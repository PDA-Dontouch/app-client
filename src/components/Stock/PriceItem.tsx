import tw, { styled } from 'twin.macro';

interface PriceItemProps {
  price: string;
  nowPrice: string;
  onPriceSelect: (price: string) => void;
  backgroundColor: string;
  textColor: string;
  amount: number;
  selectedPrice: string;
}

const PriceContainer = styled.div<{
  backgroundColor: string;
  border: string;
  cursor: string;
}>(({ backgroundColor, border, cursor }) => [
  tw`w-[124px] h-[2.3rem] mb-[0.15rem] flex flex-row items-center justify-between px-4 relative`,
  backgroundColor && { backgroundColor },
  border && { border },
  cursor && { cursor },
]);

const SelectedIndicator = tw.div`absolute left-0 top-0 h-full w-[4px] bg-red`;
const PriceText = tw.span`text-[0.9rem]`;
const AmountText = tw.span`text-[0.7rem]`;

const PriceItem = ({
  price,
  nowPrice,
  onPriceSelect,
  backgroundColor,
  textColor,
  amount,
  selectedPrice,
}: PriceItemProps) => {
  const isSelected = price.toString() === selectedPrice?.toString();

  return (
    <PriceContainer
      // onClick={() => onPriceSelect(price)}
      onClick={() => {
        onPriceSelect(price);
      }}
      backgroundColor={backgroundColor}
      border={price === nowPrice ? '1px solid #000' : ''}
      cursor="pointer"
    >
      {isSelected && <SelectedIndicator />}
      {price !== '' && (
        <>
          <PriceText>{price.toLocaleString()}</PriceText>
          <AmountText style={{ color: textColor }}>
            {amount.toLocaleString()}
          </AmountText>
        </>
      )}
    </PriceContainer>
  );
};

export default PriceItem;
