import tw, { styled } from 'twin.macro';
import SelectStockP2P from './SelectStockP2P';
import { useEffect, useState } from 'react';
import MyStock from './MyStock';
import MyP2P from './MyP2P';
import {
  EnergyList,
  MyP2PProductType,
  WithEnergyId,
} from '../../types/energy_product';
import StocksHeldContent from './StocksHeldContent';
import { useNavigate } from 'react-router-dom';
import P2PHeldContent from './P2PHeldContent';
import { EstatesList, WithEstateId } from '../../types/estates_product';
import {
  HoldingStockType,
  StockDataResultType,
} from '../../types/stocks_product';

const StockP2PContainer = styled.div`
  ${tw`flex flex-col gap-6 px-2`}
  box-sizing: border-box;
`;

type StockP2PProps = {
  type: 'held' | 'like';
  koreaData: HoldingStockType[] | StockDataResultType[];
  usaData: HoldingStockType[] | StockDataResultType[];
  energyData: (MyP2PProductType & WithEnergyId)[] | EnergyList[];
  estateData: (MyP2PProductType & WithEstateId)[] | EstatesList[];
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
