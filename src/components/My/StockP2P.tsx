import tw, { styled } from 'twin.macro';
import SelectStockP2P from './SelectStockP2P';
import { useState } from 'react';
import MyStock from './MyStock';
import MyP2P from './MyP2P';
import { MyP2PProductType } from './MyP2PProduct';
import { MyStockProductType } from './MyStockProduct';

const StockP2PContainer = styled.div`
  ${tw`flex flex-col gap-6 px-2`}
  box-sizing: border-box;
`;

type StockP2PProps = {
  type: 'held' | 'like';
  koreaData: MyStockProductType[];
  usaData: MyStockProductType[];
  energyData: MyP2PProductType[];
  estateData: MyP2PProductType[];
};

export default function StockP2P({
  type,
  koreaData,
  usaData,
  energyData,
  estateData,
}: StockP2PProps) {
  const [active, setActive] = useState<boolean>(true);
  return (
    <StockP2PContainer>
      <SelectStockP2P active={active} setActive={setActive} />
      {active ? (
        <MyStock koreaData={koreaData} usaData={usaData} />
      ) : (
        <MyP2P
          type={type}
          energyData={energyData}
          estateData={estateData}
        ></MyP2P>
      )}
    </StockP2PContainer>
  );
}
