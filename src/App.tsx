import { useState } from 'react';
import './App.css';
import BottomUpModal from './components/common/Modal/BottomUpModal';
import BasicModal from './components/common/Modal/BasicModal';
import Button from './components/common/Button';
import SelectButton from './components/common/SelectButton';
import StockItem from './components/common/StockItem';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`px-5 py-5`}
`

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [isActive, setIsActive] = useState(-1);

  const data = [
    {
      content: '만 65세 미만'
    },
    {
      content: '만 65세 이상'
    }
  ]

  return (
    <>
      {/* <button onClick={() => setIsOpen(true)}>모달 오픈</button> */}
      {/* {isOpen && <BottomUpModal onClose={() => setIsOpen(false)} />} */}
      {/* {isOpen && <BasicModal onClose={() => setIsOpen(false)} />} */}
      {/* <Button name='구매하기' status='active' onClick={() => {}} /> */}
      {/* {data.map((item, idx) => 
        <>
          <SelectButton name={item.content} status={isActive === idx ? 'active' : 'plain'} type='short' onClick={() => setIsActive(idx)} />
          <br></br>
        </>
      )} */}
      {/* <br></br>
      <SelectButton name='선택하는 버튼' status='active' onClick={() => {}} /> */}
      <Container>
        <StockItem name='삼성' price='1,200' amount={100} onDelete={() => {}} />
      </Container>
    </>
  );
}

export default App
