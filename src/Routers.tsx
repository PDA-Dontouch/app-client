import { Route, Routes } from 'react-router-dom';
import EnergyMain from './pages/Energy/EnergyMain';

import EstatesMain from './pages/Estates/EstatesMain';
import EstatesDetail from './pages/Estates/EstatesDetail';
import LoginPage from './pages/LoginPage';
import InvestTypeTest from './pages/InvestTypeTest';
import CalendarPage from './pages/CalendarPage';
import StockMainPage from './pages/Stock/StockMainPage';
import TransactionResult from './pages/TransactionResult';
import MainPage from './pages/Main/MainPage';
import AccountPage from './pages/Main/AccountPage';
import ProductsHeldPage from './pages/Main/ProductsHeldPage';
import ProductsLikePage from './pages/Main/ProductsLikePage';
import CombinationLogPage from './pages/Main/CombinationLogPage';

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/typetest" element={<InvestTypeTest />} />
      <Route path="/energy" element={<EnergyMain />} />
      <Route path="/estates" element={<EstatesMain />} />
      <Route path="/estates/:estates_id" element={<EstatesDetail />} />
      <Route path="/stocks" element={<StockMainPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/result/:type" element={<TransactionResult />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/products/held" element={<ProductsHeldPage />} />
      <Route path="/products/like" element={<ProductsLikePage />} />
      <Route path="/products/combinations" element={<CombinationLogPage />} />
    </Routes>
  );
}
