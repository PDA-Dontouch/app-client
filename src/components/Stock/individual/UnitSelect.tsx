import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { AppDispatch, RootState } from '../../../store/store';
import { getChartDatas } from '../../../store/reducers/stocks/individualStock';

interface UnitProps {
  selects: string[];
  isCandle: boolean;
  stockId?: number;
}

const Container = styled.div`
  ${tw`flex px-8 py-6 justify-between`}
`;

const Button = styled.div<{ isSelect: boolean }>`
  ${tw`min-w-[70px] py-2 text-center text-[15px] rounded-8`}
  ${({ isSelect }) =>
    isSelect ? tw`text-black bg-gray30 font-semibold` : tw`text-gray-dark`}
`;

const UnitSelect = ({ selects, isCandle, stockId }: UnitProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectExchange = useSelector(
    (state: RootState) => state.trading.selectExchange,
  );
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    if (isCandle) {
      //
    } else {
      if (num === 0) {
        //
      }
      const data = {
        exchange: selectExchange,
        stockId: stockId || 0,
        month: num === 1 ? 120 : num === 2 ? 60 : 24,
        interval: num === 1 ? 90 : num === 2 ? 30 : 7,
      };
      dispatch(getChartDatas(data));
    }
  }, [isCandle, num, dispatch, stockId, selectExchange]);

  return (
    <Container>
      {selects.map((text, idx) => (
        <Button isSelect={idx === num} key={idx} onClick={() => setNum(idx)}>
          {text}
        </Button>
      ))}
    </Container>
  );
};

export default UnitSelect;
