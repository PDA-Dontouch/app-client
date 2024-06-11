import { Route, Routes } from 'react-router-dom';
import EnergyMain from './pages/Energy/EnergyMain';
import EstatesMain from './pages/Estates/EstatesMain';
import EstatesDetail from './pages/Estates/EstatesDetail';
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import StockMainPage from './pages/Stock/StockMainPage';


export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/energy" element={<EnergyMain />} />
      <Route path="/estates" element={<EstatesMain />} />
      <Route path="/estates/:estates_id" element={<EstatesDetail />} />
      <Route path="/stocks" element={<StockMainPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}
