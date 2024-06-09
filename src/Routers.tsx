import { Route, Routes } from "react-router-dom";
import EnergyMain from "./pages/Energy/EnergyMain";
import StockPage from "./pages/StockPage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/energy" element={<EnergyMain />} />
      <Route path="/stock" element={<StockPage />} />
    </Routes>
  )
}