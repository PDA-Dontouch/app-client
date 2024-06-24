import tw, { styled } from 'twin.macro';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import Navbar from '../../components/common/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyP2PProductType, WithEnergyId } from '../../types/energy_product';
import Footer from '../../components/common/Footer';
import StockP2P from '../../components/Main/StockP2P';
import { useCallback, useEffect, useState } from 'react';
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
import {
  HoldingStockType,
  UsStockSocketType,
} from '../../types/stocks_product';
import {
  getHoldingStocks,
  getKRStockPrice,
  getUSStockPrice,
} from '../../api/stocks';

interface LocationState {
  initialActive: boolean;
}

const ProductsHeldPageContainer = styled.div`
  ${tw`flex flex-col gap-8 px-5 py-22 w-full`}
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

  const [realTimeKoreaPrice, setRealTimeKoreaPrice] = useState<string[]>([]);
  const [realTimeUsPrice, setRealTimeUsPrice] = useState<number[]>([]);

  async function getKoreaSocket(korea: HoldingStockType[]) {
    const koreaRequest = korea.map((stock) => {
      return stock.stock.symbol;
    });

    return koreaRequest;
  }

  async function getUsSocket(us: HoldingStockType[]) {
    const usaRequest = us.map((stock) => {
      return {
        stockCode: stock.stock.symbol,
        marketType: stock.stock.symbol === 'NYSE' ? 'BAY' : 'BAQ',
      };
    });

    return usaRequest as UsStockSocketType[];
  }

  function sendKoreaSocketAxios(korea: HoldingStockType[]) {
    getKoreaSocket(korea).then((res) => {
      getKRStockPrice({ stockList: res }).then((data) => {
        setRealTimeKoreaPrice(data);
      });
    });
  }

  function sendUsSocketAxios(us: HoldingStockType[]) {
    getUsSocket(us).then((res) => {
      getUSStockPrice({ stockList: res }).then((data) => {
        setRealTimeUsPrice(data);
      });
    });
  }

  const calcKoreaTotal = useCallback(async () => {
    const res = koreaData.reduce((accumulator, stock, idx) => {
      return (
        accumulator +
        stock.purchaseInfo.quantity * Number(realTimeKoreaPrice[idx])
      );
    }, 0);
    setKoreaStockTotalPrice(res);
  }, [realTimeKoreaPrice, koreaData]);

  const calcUsTotal = useCallback(async () => {
    const res = usaData.reduce((accumulator, stock, idx) => {
      return accumulator + stock.purchaseInfo.quantity * realTimeUsPrice[idx];
    }, 0);
    setUsaStockTotalPrice(res);
  }, [realTimeUsPrice, usaData]);

  function getStocksDataProps() {
    getHoldingStocks({ userId: user.user.id, token: user.token }).then(
      async (data) => {
        if (data.data.success) {
          setKoreaData(data.data.response.krHoldingStocks);
          setUsaData(data.data.response.usHoldingStocks);
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
  }, [modal]);

  useEffect(() => {
    calcKoreaTotal();
    calcUsTotal();
  }, [koreaData, usaData, realTimeKoreaPrice, realTimeUsPrice, modal]);

  useEffect(() => {
    sendKoreaSocketAxios(koreaData);
    sendUsSocketAxios(usaData);

    const intervalKR = setInterval(() => sendKoreaSocketAxios(koreaData), 5000);
    const intervalUS = setInterval(() => sendUsSocketAxios(usaData), 5000);

    return () => {
      clearInterval(intervalUS);
      clearInterval(intervalKR);
    };
  }, [koreaData, usaData, modal]);

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
          realTimeKoreaPice={realTimeKoreaPrice}
          realTimeUsPrice={realTimeUsPrice}
        />
      </ProductsHeldPageContainer>
      <Footer />
    </>
  );
}
