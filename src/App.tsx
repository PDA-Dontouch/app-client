import { useState } from 'react';
import './App.css';
import BottomUpModal from './components/common/Modal/BottomUpModal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 오픈</button>
      {isOpen && <BottomUpModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default App
