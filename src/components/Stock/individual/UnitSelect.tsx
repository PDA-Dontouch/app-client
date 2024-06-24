import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { AppDispatch, RootState } from '../../../store/store';
import {
  getKrChartDatas,
  getUsChartDatas,
} from '../../../store/reducers/stocks/individualStock';
import { useParams } from 'react-router-dom';

interface UnitProps {
  selects: string[];
  isCandle: boolean;
  stockCode: string;
  num: number;
  setNum: React.Dispatch<SetStateAction<number>>;
}

const Container = styled.div`
  ${tw`flex px-8 py-4 justify-between`}
`;

const Button = styled.div<{ isSelect: boolean }>`
  ${tw`min-w-[70px] py-2 text-center text-[15px] rounded-8`}
  ${({ isSelect }) =>
    isSelect ? tw`text-black bg-gray30 font-semibold` : tw`text-gray-dark`}
`;

const UnitSelect = ({
  selects,
  isCandle,
  stockCode,
  num,
  setNum,
}: UnitProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const selectExchange = useSelector(
    (state: RootState) => state.trading.selectExchange,
  );

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}${month}${day}`;

  useEffect(() => {
    getNewData(num);
  }, [num]);

  const getNewData = (idx: number) => {
    if (selectExchange === 'KSC') {
      const data = {
        timeFormat: idx === 0 ? 'D' : idx === 1 ? 'W' : idx === 2 ? 'M' : 'Y',
        stockCode: stockCode,
        endDate: formattedDate,
      };
      dispatch(getKrChartDatas(data));
    } else {
      if (idx !== 3) {
        const data = {
          timeFormat: idx === 0 ? 0 : idx === 1 ? 1 : 2,
          stockCode: stockCode,
          endDate: formattedDate,
          marketType: selectExchange === 'NASDAQ' ? 'BAQ' : 'BAY',
        };
        dispatch(getUsChartDatas(data));
      } else {
        //
      }
    }
  };

  return (
    <Container>
      {selects.map((text, idx) => (
        <Button
          isSelect={idx === num}
          key={idx}
          onClick={() => {
            setNum(idx);
            getNewData(idx);
          }}
        >
          {text}
        </Button>
      ))}
    </Container>
  );
};

export default UnitSelect;
