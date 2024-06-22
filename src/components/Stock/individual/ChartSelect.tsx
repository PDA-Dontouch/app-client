import { SetStateAction, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

import Candle from '../../../assets/chart/candle.svg';
import CandleDisable from '../../../assets/chart/candle-disable.svg';
import Line from '../../../assets/chart/line.svg';
import LineDisable from '../../../assets/chart/line-disable.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
  getKrChartDatas,
  getUsChartDatas,
} from '../../../store/reducers/stocks/individualStock';

interface SelectProps {
  isCandle: boolean;
  setIsCandle: React.Dispatch<SetStateAction<boolean>>;
  stockCode: string;
  num: number;
}

const Container = styled.div`
  ${tw`flex px-8 pb-4 justify-center`}
`;

const Item = styled.div`
  ${tw`w-fit flex items-center gap-1 bg-[#F6F6F6] px-1 py-1 rounded-[6px]`}
`;

const Img = styled.img<{ isCandle: boolean }>`
  ${tw`px-2 w-[24px] rounded-4`}
  ${({ isCandle }) => (isCandle ? tw`bg-white` : ``)}
`;

const ChartSelect = ({
  isCandle,
  setIsCandle,
  stockCode,
  num,
}: SelectProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectExchange = useSelector(
    (state: RootState) => state.trading.selectExchange,
  );

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}${month}${day}`;

  const newCandleData = () => {
    if (selectExchange === 'KSC') {
      const data = {
        timeFormat: num === 0 ? 'D' : num === 1 ? 'W' : num === 2 ? 'M' : 'Y',
        stockCode: stockCode,
        endDate: '20240620',
      };
      dispatch(getKrChartDatas(data));
    } else {
      const data = {
        timeFormat: num === 0 ? 0 : num === 1 ? 1 : 2,
        stockCode: stockCode,
        endDate: formattedDate,
        marketType: selectExchange === 'NASDAQ' ? 'BAQ' : 'BAY',
      };
      dispatch(getUsChartDatas(data));
    }
  };

  const newLineData = () => {
    if (selectExchange === 'KSC') {
      const data = {
        timeFormat: num === 0 ? 'D' : num === 1 ? 'W' : num === 2 ? 'M' : 'Y',
        stockCode: stockCode,
        endDate: '20240620',
      };
      dispatch(getKrChartDatas(data));
    } else {
      const data = {
        timeFormat: num === 0 ? 0 : num === 1 ? 1 : 2,
        stockCode: stockCode,
        endDate: formattedDate,
        marketType: selectExchange === 'NASDAQ' ? 'BAQ' : 'BAY',
      };
      dispatch(getUsChartDatas(data));
    }
  };

  return (
    <Container>
      <Item>
        <Img
          src={isCandle ? Candle : CandleDisable}
          isCandle={isCandle}
          onClick={() => {
            setIsCandle(true);
            newCandleData();
          }}
        />
        <Img
          src={isCandle ? LineDisable : Line}
          isCandle={!isCandle}
          onClick={() => {
            setIsCandle(false);
            newLineData();
          }}
        />
      </Item>
    </Container>
  );
};

export default ChartSelect;
