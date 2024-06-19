import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import Button from '../../components/common/Button';
import { useEffect, useState } from 'react';
import TradingStock from '../../components/Stock/TradingStock';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getDetail } from '../../store/reducers/stocks/individualStock';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useNavigate } from 'react-router-dom';
import { setSelectedPrice } from '../../store/reducers/stocks/trading';
import { leaveRoom } from '../../store/webSocket/nowPrice';
import ChartSelect from '../../components/Stock/individual/ChartSelect';
import UnitSelect from '../../components/Stock/individual/UnitSelect';
import MarketInfo from '../../components/Stock/individual/MarketInfo';
import HoldingStatus from '../../components/Stock/individual/HoldingStatus';
import StockCandleChart from '../../components/Stock/individual/StockCandleChart';
import StockLineChart from '../../components/Stock/individual/StockLineChart';

const Container = styled.div`
  ${tw`py-8 mt-14`}
`;

const BtnContainer = styled.div`
  ${tw`w-full flex px-8 justify-between gap-3 fixed left-0 bottom-6 box-border`}
`;

const Hr = styled.div`
  ${tw`w-full h-1 bg-gray-light`}
`;

const IndividualStock = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const selectCode = useSelector(
    (state: RootState) => state.trading.selectCode,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSell, setIsSell] = useState<boolean>(false);
  const [isCandle, setIsCandle] = useState<boolean>(true);
  const detail = ['일', '주', '월', '년'];
  const simple = ['전체', '10년', '5년', '2년'];

  useEffect(() => {
    const data = {
      exchange: 'KSC',
      stockId: 10,
    };
    dispatch(getDetail(data));
  }, []);

  const { askPrice, nowPrice } = useWebSocket();

  return (
    <>
      <Navbar
        name="back"
        type=""
        onClick={() => {
          leaveRoom(selectCode);
          navigate('/stocks');
        }}
      />
      <Container>
        <MarketInfo />
        <ChartSelect isCandle={isCandle} setIsCandle={setIsCandle} />
        {isCandle ? (
          <StockCandleChart nowPrice={nowPrice} />
        ) : (
          <StockLineChart />
        )}
        <UnitSelect selects={isCandle ? detail : simple} isCandle={isCandle} />
        <Hr />
        <HoldingStatus />
      </Container>
      <BtnContainer>
        <Button
          name="매도"
          status="stock_sell"
          onClick={() => {
            setIsOpen(true);
            setIsSell(true);
          }}
        />
        <Button
          name="매수"
          status="stock_purchase"
          onClick={() => {
            setIsOpen(true);
            setIsSell(false);
          }}
        />
      </BtnContainer>
      {isOpen && (
        <TradingStock
          isSell={isSell}
          onClose={() => {
            setIsOpen(false);
            dispatch(setSelectedPrice('0'));
          }}
          nowPrice={nowPrice}
          askPrice={askPrice}
        />
      )}
    </>
  );
};

export default IndividualStock;
