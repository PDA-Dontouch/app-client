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

const koreaDate: MyStockProductType[] = [
  {
    code: '005930',
    name: '삼성전자',
    price: 60000,
    compare: 1.1,
  },
  {
    code: '000080',
    name: '하이트진로',
    price: 60000,
    compare: -1.1,
  },
];

const usaDate: MyStockProductType[] = [
  {
    code: 'TSLA',
    name: '테슬라',
    price: 60000,
    compare: -1.1,
  },
];

const energyData: MyP2PProductType[] = [
  {
    img: '',
    name: '디지털복합단지 럭셔리타워 신축 2호 4차',
    annualRate: 13.0,
    monthlyDividend: 63800,
    openDate: new Date(2024, 6, 30),
  },
  {
    img: '',
    name: '디지털복합단지 럭셔리타워 신축 2호 4차',
    annualRate: 13.0,
    monthlyDividend: 63800,
    openDate: new Date(2024, 4, 30),
  },
];

const estateData: MyP2PProductType[] = [
  {
    img: '',
    name: '의성군 외 총 993.40kW 태양광 담보',
    annualRate: 13.0,
    monthlyDividend: 270000,
    openDate: new Date(2024, 6, 30),
  },
  {
    img: '',
    name: '의성군 외 총 993.40kW 태양광 담보',
    annualRate: 13.0,
    monthlyDividend: 63800,
    openDate: new Date(2024, 4, 30),
  },
];

export default function StockP2P() {
  const [active, setActive] = useState<boolean>(true);
  return (
    <StockP2PContainer>
      <SelectStockP2P active={active} setActive={setActive} />
      {active ? (
        <MyStock koreaDate={koreaDate} usaDate={usaDate} />
      ) : (
        <MyP2P
          type="held"
          energyData={energyData}
          estateData={estateData}
        ></MyP2P>
      )}
    </StockP2PContainer>
  );
}
