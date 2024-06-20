import tw, { styled } from 'twin.macro';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import Navbar from '../../components/common/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyStockProductType } from '../../components/Main/MyStockProduct';
import { MyP2PProductType, WithEnergyId } from '../../types/energy_product';
import Footer from '../../components/common/Footer';
import StockP2P from '../../components/Main/StockP2P';
import { useEffect, useState } from 'react';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import AddStockModal from '../../components/Main/AddStockModal';
import {
  getUserEnergyProduct,
  getUserEstateProduct,
  getUserTotalEnergy,
  getUserTotalEstate,
} from '../../api/holding';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { WithEstateId } from '../../types/estates_product';

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

export default function ProductsHeldPage() {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [estateTotalPrice, setEstateTotalPrice] = useState<number>(0);
  const [energyTotalPrice, setEnergyTotalPrice] = useState<number>(0);
  const [estateData, setEstateData] = useState<
    (MyP2PProductType & WithEstateId)[]
  >([]);
  const [energyData, setEnergyData] = useState<
    (MyP2PProductType & WithEnergyId)[]
  >([]);

  const user = useSelector((state: RootState) => state.user);

  const state = location.state as LocationState;

  function getEstateDataProps() {
    getUserEstateProduct({ userId: user.user.id, token: user.token }).then(
      (data) => {
        setEstateData(data.data.response);
        if (!data.data.success) setEstateData([]);
      },
    );
  }

  function getEnergyDataProps() {
    getUserEnergyProduct({ userId: user.user.id, token: user.token }).then(
      (data) => {
        setEnergyData(data.data.response);
        if (!data.data.success) setEnergyData([]);
      },
    );
  }

  function getEnergyTotalPrice() {
    getUserTotalEnergy({ userId: user.user.id, token: user.token }).then(
      (data) => {
        setEnergyTotalPrice(data.data.response);
      },
    );
  }

  function getEstateTotalPrice() {
    getUserTotalEstate({ userId: user.user.id, token: user.token }).then(
      (data) => {
        setEstateTotalPrice(data.data.response);
      },
    );
  }
  useEffect(() => {
    getEstateDataProps();
    getEnergyDataProps();
    getEnergyTotalPrice();
    getEstateTotalPrice();
  }, []);

  return (
    <>
      {modal && (
        <BottomUpModal
          content={<AddStockModal setModal={setModal} />}
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
          P2PTotalPrice={energyTotalPrice + estateTotalPrice}
        />
      </ProductsHeldPageContainer>
      <Footer />
    </>
  );
}
