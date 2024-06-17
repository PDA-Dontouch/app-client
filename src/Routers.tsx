import { Route, Routes } from 'react-router-dom';
import EnergyMain from './pages/Energy/EnergyMain';
import EstatesMain from './pages/Estates/EstatesMain';
import EstatesDetail from './pages/Estates/EstatesDetail';
import LoginPage from './pages/Login/LoginPage';
import KakaoRedirectPage from './pages/Login/KakaoRedirectPage';
import InvestTypeTest from './pages/InvestTypeTest';
import CalendarPage from './pages/CalendarPage';
import StockMainPage from './pages/Stock/StockMainPage';
import TransactionResult from './pages/TransactionResult';
import MainPage from './pages/MainPage';
import StockDetailPage from './pages/Stock/StockDetailPage';
import NaverRedirectPage from './pages/Login/NaverRedirectPage';
import GoogleRedirectPage from './pages/Login/GoogleRedirectPage';

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/oauth2/code/kakao" element={<KakaoRedirectPage />}></Route>
      <Route path="/login/oauth2/code/naver" element={<NaverRedirectPage />}></Route>
      <Route path="/login/oauth2/code/google" element={<GoogleRedirectPage />}></Route>
      <Route path="/typetest" element={<InvestTypeTest />} />
      <Route path="/energy" element={<EnergyMain />} />
      <Route path="/estates" element={<EstatesMain />} />
      <Route path="/estates/:estates_id" element={<EstatesDetail />} />
      <Route path="/stocks" element={<StockMainPage />} />
      <Route path="/stocks/detail" element={<StockDetailPage/>}/>
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/result/:type" element={<TransactionResult />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
