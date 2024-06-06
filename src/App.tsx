import { useState } from 'react';
import './App.css';
// import BottomUpModal from './components/common/Modal/BottomUpModal';
import BasicModal from './components/common/Modal/BasicModal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 오픈</button>
      {/* {isOpen && <BottomUpModal onClose={() => setIsOpen(false)} />} */}
      {isOpen && <BasicModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default App
