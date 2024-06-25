import { Navigate, Route, Routes } from 'react-router-dom';
import EnergyMain from './pages/Energy/EnergyMain';
import EstatesMain from './pages/Estates/EstatesMain';
import EstatesDetail from './pages/Estates/EstatesDetail';
import LoginPage from './pages/Login/LoginPage';
import KakaoRedirectPage from './pages/Login/KakaoRedirectPage';
import EnergyDetail from './pages/Energy/EnergyDetail';
import InvestTypeTest from './pages/InvestTypeTest';
import CalendarPage from './pages/CalendarPage';
import StockMainPage from './pages/Stock/StockMainPage';
import TransactionResult from './pages/TransactionResult';
import MainPage from './pages/Main/MainPage';
import AccountPage from './pages/Main/AccountPage';
import ProductsHeldPage from './pages/Main/ProductsHeldPage';
import ProductsLikePage from './pages/Main/ProductsLikePage';
import CombinationLogPage from './pages/Main/CombinationLogPage';
import ChangeMoney from './pages/Stock/ChangeMoney';
import AssetInput from './pages/AssetInput';
import IndividualStock from './pages/Stock/IndividualStock';
import StockDetailPage from './pages/Stock/StockDetailPage';
import NaverRedirectPage from './pages/Login/NaverRedirectPage';
import StockCombiBuyPage from './pages/Stock/StockCombiBuyPage';
import PrivateRoute from './components/Login/PrivateRoute';

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/login/oauth2/code/kakao"
        element={<KakaoRedirectPage />}
      ></Route>
      <Route
        path="/login/oauth2/code/naver"
        element={<NaverRedirectPage />}
      ></Route>
      <Route path="/typetest" element={<PrivateRoute component={InvestTypeTest} />} />
      <Route path="/energy" element={<PrivateRoute component={EnergyMain} />} />
      <Route path="/energy/:energy_id" element={<EnergyDetail/>} />
      <Route path="/estates" element={<PrivateRoute component={EstatesMain} />} />
      <Route path="/estates/:estates_id" element={<EstatesDetail/>} />
      <Route path="/stocks" element={<PrivateRoute component={StockMainPage} />} />
      <Route path="/stocks/:id" element={<IndividualStock />} />
      <Route path="/stocks/detail" element={<StockDetailPage />} />
      <Route path="/stocks/buy" element={<StockCombiBuyPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/result/:type" element={<TransactionResult />} />
      <Route path="/asset-input" element={<AssetInput />} />
      <Route path="/asset/reset" element={<ChangeMoney />} />
      <Route path="/" element={<PrivateRoute component={MainPage} />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/products/held" element={<ProductsHeldPage />} />
      <Route path="/products/like" element={<ProductsLikePage />} />
      <Route path="/products/combinations" element={<CombinationLogPage />} />
      <Route path="*" element={<Navigate to="/login"/>}/>
    </Routes>
  );
}
