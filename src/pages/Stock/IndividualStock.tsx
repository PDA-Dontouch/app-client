import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import Button from '../../components/common/Button';
import { useEffect, useState } from 'react';
import TradingStock from '../../components/Stock/TradingStock';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  ChartActionPayload,
  getDetail,
  getKrChartDatas,
  getUsChartDatas,
  setClose,
  setStockRate,
  setUpDown,
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
import { ChartData } from '../../types/individual_stock';
import StockSkeleton from '../../components/Skeleton/StockSkeleton';

interface ApiResponse {
  data: ChartData[];
}

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
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const detail = ['일', '주', '월', '년'];
  const [num, setNum] = useState<number>(0);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}${month}${day}`;

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

  useEffect(() => {
    if (selectExchange === 'KSC') {
      const data = {
        timeFormat: 'D',
        stockCode: selectCode,
        endDate: formattedDate,
      };
      dispatch(getKrChartDatas(data)).then((res) => {
        const datas = (res.payload as ApiResponse).data;
        setIsComplete(true);
        dispatch(setUpDown(datas[0].close - datas[1].close));
        dispatch(
          setStockRate(
            ((datas[0].close - datas[1].close) / datas[1].close) * 100,
          ),
        );
        dispatch(
          setClose(
            datas[0].close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          ),
        );
      });
    } else {
      const data = {
        timeFormat: 0,
        stockCode: selectCode,
        endDate: formattedDate,
        marketType: selectExchange === 'NASDAQ' ? 'BAQ' : 'BAY',
      };
      dispatch(getUsChartDatas(data)).then((res) => {
        setIsComplete(true);
        const chartData = (res.payload as ApiResponse).data;
        dispatch(setUpDown(chartData[0].close - chartData[1].close));
        dispatch(
          setStockRate(
            ((chartData[0].close - chartData[1].close) / chartData[1].close) *
              100,
          ),
        );
        dispatch(
          setClose(
            chartData[0].close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          ),
        );
      });
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
          navigate(-1);
        }}
      />
      {!isComplete ? (
        <StockSkeleton />
      ) : (
        <Container>
          {isComplete && <MarketInfo nowPrice={nowPrice} />}

          <ChartSelect
            isCandle={isCandle}
            setIsCandle={setIsCandle}
            stockCode={selectCode}
            num={num}
          />
          {isComplete && isCandle ? (
            <StockCandleChart nowPrice={nowPrice} />
          ) : (
            <StockLineChart />
          )}
          <UnitSelect
            selects={detail}
            isCandle={isCandle}
            stockCode={selectCode}
            num={num}
            setNum={setNum}
          />
          {/* <Hr />
        <HoldingStatus /> */}
        </Container>
      )}
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
          selectExchange={selectExchange}
        />
      )}
    </>
  );
};

export default IndividualStock;
