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
  setFixedData,
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
import { getHoldingStocks } from '../../store/reducers/stocks/holding';
import BasicModal2 from '../../components/common/Modal/BasicModal2';
import StockDescription from '../../components/common/StockDescription';

interface ApiResponse {
  data: ChartData[];
}

const Container = styled.div`
  ${tw`pt-6 pb-20 mt-14`}
`;

const BtnContainer = styled.div`
  ${tw`w-full flex px-8 justify-between gap-3 box-border z-[99] fixed bottom-0 bg-white pb-6 pt-2`}
`;

const IndividualStock = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const selectCode = useSelector(
    (state: RootState) => state.trading.selectCode,
  );
  const selectExchange = useSelector(
    (state: RootState) => state.trading.selectExchange,
  );
  const userId = useSelector((state: RootState) => state.user.user.id);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDescription, setIsDescription] = useState<boolean>(false);
  const [isSell, setIsSell] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isCandle, setIsCandle] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const detail = ['일', '주', '월', '년'];
  const usDetail = ['일', '주', '월'];
  const [num, setNum] = useState<number>(0);
  console.log(selectCode);

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
    const data = {
      userId: userId,
      getPrice: true,
    };
    dispatch(getHoldingStocks(data));
  }, []);

  useEffect(() => {
    if (selectExchange === 'KSC') {
      if (num === 0) {
        const data = {
          timeFormat: 'D',
          stockCode: selectCode,
          endDate: formattedDate,
        };
        dispatch(getKrChartDatas(data)).then((res) => {
          dispatch(setFixedData((res.payload as ApiResponse).data));
          setIsComplete(true);
        });
      } else {
        const data = {
          timeFormat: num === 1 ? 'W' : num === 2 ? 'M' : 'Y',
          stockCode: selectCode,
          endDate: formattedDate,
        };
        dispatch(getKrChartDatas(data)).then((res) => setIsComplete(true));
      }
    } else {
      if (num === 0) {
        const data = {
          timeFormat: num,
          stockCode: selectCode,
          endDate: formattedDate,
          marketType: selectExchange === 'NASDAQ' ? 'BAQ' : 'BAY',
        };
        dispatch(getUsChartDatas(data)).then((res) => {
          dispatch(setFixedData((res.payload as ApiResponse).data));
          setIsComplete(true);
        });
      } else {
        const data = {
          timeFormat: num,
          stockCode: selectCode,
          endDate: formattedDate,
          marketType: selectExchange === 'NASDAQ' ? 'BAQ' : 'BAY',
        };
        dispatch(getUsChartDatas(data)).then((res) => setIsComplete(true));
      }
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
          window.history.back();
        }}
      />
      {!isComplete ? (
        <StockSkeleton />
      ) : (
        <Container>
          {isComplete && (
            <MarketInfo
              nowPrice={nowPrice}
              setIsDescription={() => setIsDescription(true)}
            />
          )}

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
            selects={selectExchange === 'KSC' ? detail : usDetail}
            isCandle={isCandle}
            stockCode={selectCode}
            num={num}
            setNum={setNum}
          />
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
          isOpen={isOpen}
        />
      )}
      {isDescription && (
        <BasicModal2
          content={<StockDescription />}
          onClose={() => setIsDescription(false)}
          isOpen={isDescription}
        />
      )}
    </>
  );
};

export default IndividualStock;
