import { useState } from 'react';
import './App.css';
import BottomUpModal from './components/common/Modal/BottomUpModal';
import ModalItem from './components/common/Modal/ModalItem';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>모달 오픈</button>
      {open && <BottomUpModal onClose={() => setOpen(false)} content={<ModalItem title='투자 금액' isModify={true} isStock={false} />} />}
    </>
  );
}

export default App
