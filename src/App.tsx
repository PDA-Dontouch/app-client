import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockPage from './pages/StockPage';
import InvestTypeTest from './pages/InvestTypeTest';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<InvestTypeTest />} />
      </Routes>
    </Router>

  );
}

export default App;
