import { SetStateAction, useState } from 'react';
import tw, { styled } from 'twin.macro';

import Candle from '../../../assets/chart/candle.svg';
import CandleDisable from '../../../assets/chart/candle-disable.svg';
import Line from '../../../assets/chart/line.svg';
import LineDisable from '../../../assets/chart/line-disable.svg';

interface SelectProps {
  isCandle: boolean;
  setIsCandle: React.Dispatch<SetStateAction<boolean>>;
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

const ChartSelect = ({ isCandle, setIsCandle }: SelectProps) => {
  return (
    <Container>
      <Item>
        <Img
          src={isCandle ? Candle : CandleDisable}
          isCandle={isCandle}
          onClick={() => setIsCandle(true)}
        />
        <Img
          src={isCandle ? LineDisable : Line}
          isCandle={!isCandle}
          onClick={() => setIsCandle(false)}
        />
      </Item>
    </Container>
  );
};

export default ChartSelect;
