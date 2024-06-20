import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import Button from '../../components/common/Button';
import { useEffect, useState } from 'react';
import TradingStock from '../../components/Stock/TradingStock';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  getChartDatas,
  getDetail,
} from '../../store/reducers/stocks/individualStock';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useNavigate, useParams } from 'react-router-dom';
import { setSelectedPrice } from '../../store/reducers/stocks/trading';
import { leaveRoom } from '../../store/webSocket/nowPrice';
import ChartSelect from '../../components/Stock/individual/ChartSelect';
import UnitSelect from '../../components/Stock/individual/UnitSelect';
import MarketInfo from '../../components/Stock/individual/MarketInfo';
import HoldingStatus from '../../components/Stock/individual/HoldingStatus';
import StockCandleChart from '../../components/Stock/individual/StockCandleChart';
import StockLineChart from '../../components/Stock/individual/StockLineChart';

const Container = styled.div`
  ${tw`py-6 mt-14 mb-4`}
`;

const BtnContainer = styled.div`
  ${tw`w-full flex px-8 justify-between gap-3 fixed left-0 bottom-6 box-border`}
`;

const Hr = styled.div`
  ${tw`w-full h-1 bg-gray-light`}
`;

const IndividualStock = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const selectCode = useSelector(
    (state: RootState) => state.trading.selectCode,
  );
  const selectExchange = useSelector(
    (state: RootState) => state.trading.selectExchange,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSell, setIsSell] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isCandle, setIsCandle] = useState<boolean>(true);
  const detail = ['일', '주', '월', '년'];
  const simple = ['전체', '10년', '5년', '2년'];

  useEffect(() => {
    const data = {
      exchange: selectExchange,
      stockId: parseInt(params.id || ''),
    };
    dispatch(getDetail(data));

    const now = new Date();
    const hours = now.getHours();

    if (hours <= 8 || hours >= 16) {
      setIsActive(false);
    }
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
        <MarketInfo nowPrice={nowPrice} />
        <ChartSelect
          isCandle={isCandle}
          setIsCandle={setIsCandle}
          stockId={parseInt(params.id || '')}
        />
        {isCandle ? (
          <StockCandleChart nowPrice={nowPrice} />
        ) : (
          <StockLineChart />
        )}
        <UnitSelect
          selects={isCandle ? detail : simple}
          isCandle={isCandle}
          stockId={parseInt(params.id || '')}
        />
        <Hr />
        <HoldingStatus />
      </Container>
      {isActive ? (
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
      ) : (
        <BtnContainer>
          <Button
            name="현재 장 시간이 아닙니다."
            status="disabled"
            onClick={() => {}}
          />
        </BtnContainer>
      )}
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
