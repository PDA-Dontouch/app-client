import { Route, Routes } from "react-router-dom";
import EnergyMain from "./pages/Energy/EnergyMain";
import StockPage from "./pages/StockPage";
import EstatesMain from "./pages/Estates/EstatesMain";
import EstatesDetail from "./pages/Estates/EstatesDetail";
import LoginPage from "./pages/LoginPage";
import EnergyDetail from "./pages/Energy/EnergyDetail";

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/energy" element={<EnergyMain />} />
      <Route path="/energy/:energy_id" element={<EnergyDetail />} />
      <Route path="/estates" element={<EstatesMain />} />
      <Route path="/estates/:estates_id" element={<EstatesDetail />} />
      <Route path="/stock" element={<StockPage />} />
    </Routes>
  )
}