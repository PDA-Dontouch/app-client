import tw, { styled } from 'twin.macro';
import SelectStockP2P from './SelectStockP2P';
import { useState } from 'react';
import MyStock from './MyStock';
import MyP2P from './MyP2P';
import { MyP2PProductType } from './MyP2PProduct';
import { MyStockProductType } from './MyStockProduct';
import StocksHeldContent from './StocksHeldContent';
import { useNavigate } from 'react-router-dom';
import P2PHeldContent from './P2PHeldContent';

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
  initialActive: boolean;
  setModal?: () => void;
  StockTotalPrice?: number;
  P2PTotalPrice?: number;
};

export default function StockP2P({
  type,
  koreaData,
  usaData,
  energyData,
  estateData,
  initialActive,
  setModal,
  StockTotalPrice,
  P2PTotalPrice,
}: StockP2PProps) {
  const [active, setActive] = useState<boolean>(initialActive);
  const navigate = useNavigate();

  return (
    <StockP2PContainer>
      <SelectStockP2P active={active} setActive={setActive} />
      {type === 'held' &&
        (active ? (
          <StocksHeldContent
            leftOnClick={setModal}
            rightOnClick={() => {
              navigate('/products/combinations');
            }}
            totalPrice={StockTotalPrice}
          />
        ) : (
          <P2PHeldContent totalPrice={P2PTotalPrice} />
        ))}
      {active ? (
        <MyStock koreaData={koreaData} usaData={usaData} />
      ) : (
        <MyP2P energyData={energyData} estateData={estateData}></MyP2P>
      )}
    </StockP2PContainer>
  );
}
