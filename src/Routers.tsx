import { Route, Routes } from "react-router-dom";
import EnergyMain from "./pages/Energy/EnergyMain";
import StockPage from "./pages/StockPage";
import Login from "./pages/Login";

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/energy" element={<EnergyMain />} />
      <Route path="/stock" element={<StockPage />} />
    </Routes>
  )
}