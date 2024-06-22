import tw, { styled } from 'twin.macro';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import Navbar from '../../components/common/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { HoldingStockType } from '../../types/stocks_product';
import { getHoldingStocks } from '../../api/stocks';

interface LocationState {
  initialActive: boolean;
}

const ProductsHeldPageContainer = styled.div`
  ${tw`flex flex-col gap-8 px-5 py-18 w-full`}
  box-sizing: border-box;
`;

export default function ProductsHeldPage() {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [estateTotalPrice, setEstateTotalPrice] = useState<number>(0);
  const [energyTotalPrice, setEnergyTotalPrice] = useState<number>(0);
  const [koreaStockTotalPrice, setKoreaStockTotalPrice] = useState<number>(0);
  const [usaStockTotalPrice, setUsaStockTotalPrice] = useState<number>(0);
  const [koreaData, setKoreaData] = useState<HoldingStockType[]>([]);
  const [usaData, setUsaData] = useState<HoldingStockType[]>([]);
  const [estateData, setEstateData] = useState<
    (MyP2PProductType & WithEstateId)[]
  >([]);
  const [energyData, setEnergyData] = useState<
    (MyP2PProductType & WithEnergyId)[]
  >([]);

  const user = useSelector((state: RootState) => state.user);

  const state = location.state as LocationState;

  function getStocksDataProps() {
    getHoldingStocks({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success) {
          setKoreaData(data.data.response.krHoldingStocks);
          setUsaData(data.data.response.usHoldingStocks);
          setKoreaStockTotalPrice(data.data.response.krTotalPurchase);
          setUsaStockTotalPrice(data.data.response.usTotalPurchase);
        }
      },
    );
  }

  function getEstateDataProps() {
    getUserEstateProduct({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success) {
          setEstateData(data.data.response);
        }
      },
    );
  }

  function getEnergyDataProps() {
    getUserEnergyProduct({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success) {
          setEnergyData(data.data.response);
        }
      },
    );
  }

  function getEnergyTotalPrice() {
    getUserTotalEnergy({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success) {
          setEnergyTotalPrice(data.data.response);
        }
      },
    );
  }

  function getEstateTotalPrice() {
    getUserTotalEstate({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success) setEstateTotalPrice(data.data.response);
      },
    );
  }

  useEffect(() => {
    getEstateDataProps();
    getEnergyDataProps();
    getEnergyTotalPrice();
    getEstateTotalPrice();
    getStocksDataProps();
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
          StockTotalPrice={koreaStockTotalPrice + usaStockTotalPrice}
          P2PTotalPrice={energyTotalPrice + estateTotalPrice}
        />
      </ProductsHeldPageContainer>
      <Footer />
    </>
  );
}
