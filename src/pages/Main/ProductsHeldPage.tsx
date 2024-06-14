import tw, { styled } from 'twin.macro';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import Navbar from '../../components/common/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyStockProductType } from '../../components/Main/MyStockProduct';
import { MyP2PProductType } from '../../components/Main/MyP2PProduct';
import Footer from '../../components/common/Footer';
import StockP2P from '../../components/Main/StockP2P';
import { useState } from 'react';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import StocksHeldContent from '../../components/Main/StocksHeldContent';

interface LocationState {
  initialActive: boolean;
}

const ProductsHeldPageContainer = styled.div`
  ${tw`flex flex-col gap-8 px-5 py-18 w-full`}
  box-sizing: border-box;
`;

const koreaData: MyStockProductType[] = [
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

const usaData: MyStockProductType[] = [
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

export default function ProductsHeldPage() {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <>
      {modal && (
        <BottomUpModal
          content={<></>}
          onClose={() => {
            setModal(false);
          }}
        />
      )}
      <Navbar
        type="back"
        name="back"
        onClick={() => {
          navigate('/');
        }}
      />
      <ProductsHeldPageContainer>
        <GreenBarTitle text="보유 상품" />
        <StockP2P
          type="held"
          usaData={usaData}
          koreaData={koreaData}
          energyData={energyData}
          estateData={estateData}
          initialActive={state.initialActive}
          setModal={() => {
            setModal(true);
          }}
          StockTotalPrice={5092000}
          P2PTotalPrice={20460520}
        />
      </ProductsHeldPageContainer>
      <Footer />
    </>
  );
}
