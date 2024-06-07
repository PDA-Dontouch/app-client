import { Route, Routes } from "react-router-dom";
import EnergyMain from "./pages/Energy/EnergyMain";

export default function Routers() {
  return (
    <Routes>
      <Route path="/energy" element={<EnergyMain />} />
    </Routes>
  )
}