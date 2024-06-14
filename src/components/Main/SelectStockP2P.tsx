import tw, { styled } from 'twin.macro';

type SelectStockP2PProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProductHeldSelectProps = {
  active: boolean;
};

const ProductHeldMenu = styled.div`
  ${tw`flex flex-row gap-2`}
  box-sizing: border-box;
`;

export default function SelectStockP2P({
  active,
  setActive,
}: SelectStockP2PProps) {
  const ProductHeldSelect = styled.div<ProductHeldSelectProps>`
    ${({ active }) => {
      return active ? tw`text-black` : tw`text-black40`;
    }}
  `;

  const ProductHeldSelectLine = styled.div``;

  return (
    <ProductHeldMenu>
      <ProductHeldSelect
        active={active}
        onClick={() => {
          setActive(true);
        }}
      >
        주식
      </ProductHeldSelect>
      <ProductHeldSelectLine>|</ProductHeldSelectLine>
      <ProductHeldSelect
        active={!active}
        onClick={() => {
          setActive(false);
        }}
      >
        P2P
      </ProductHeldSelect>
    </ProductHeldMenu>
  );
}
