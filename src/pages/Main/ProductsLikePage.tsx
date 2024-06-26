import tw, { styled } from 'twin.macro';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import Navbar from '../../components/common/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { EnergyList } from '../../types/energy_product';
import Footer from '../../components/common/Footer';
import StockP2P from '../../components/Main/StockP2P';
import { StockDataResultType } from '../../types/stocks_product';
import { useEffect, useState } from 'react';
import { getLikeStocks } from '../../api/stocks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getEnergyLike } from '../../api/energy';
import { getEstateLike } from '../../api/estates';
import { EstatesList } from '../../types/estates_product';

interface LocationState {
  initialActive: boolean;
}

const ProductsLikePageContainer = styled.div`
  ${tw`flex flex-col gap-8 px-5 py-18 w-full`}
  box-sizing: border-box;
`;

export default function ProductsLikePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const user = useSelector((state: RootState) => state.user);
  const [koreaData, setKoreaData] = useState<StockDataResultType[]>([]);
  const [usaData, setUsaData] = useState<StockDataResultType[]>([]);
  const [energyData, setEnergyData] = useState<EnergyList[]>([]);
  const [estateData, setEstateData] = useState<EstatesList[]>([]);

  function getStockData() {
    getLikeStocks({ userId: user.user.id, token: user.token }).then((data) => {
      if (data.data.success) {
        setUsaData(data.data.response.usLikeStocks);
        setKoreaData(data.data.response.krLikeStocks);
      }
    });
  }

  function getEnergyData() {
    getEnergyLike({ userId: user.user.id, token: user.token }).then((data) => {
      if (data.data.success) {
        setEnergyData(data.data.response);
      }
    });
  }

  function getEstateData() {
    getEstateLike({ userId: user.user.id, token: user.token }).then((data) => {
      if (data.data.success) {
        setEstateData(data.data.response);
      }
    });
  }

  useEffect(() => {
    Promise.all([getStockData(), getEnergyData(), getEstateData()]).then(
      () => {},
    );
  }, []);

  return (
    <>
      <Navbar
        type="back"
        name="back"
        onClick={() => {
          navigate('/main');
        }}
      />
      <ProductsLikePageContainer>
        <GreenBarTitle text="관심 종목" />
        <StockP2P
          type="like"
          usaData={usaData}
          koreaData={koreaData}
          energyData={energyData}
          estateData={estateData}
          initialActive={state.initialActive}
        />
      </ProductsLikePageContainer>
      <Footer />
    </>
  );
}
