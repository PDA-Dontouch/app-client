import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { RootState } from '../../../store/store';

import { PriceType } from '../../../types/socket';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import MarketInfoSkeleton from '../../Skeleton/MarketInfoSkeleton';
import Question from '../../../assets/question.svg';

interface InfoProps {
  nowPrice: PriceType;
  setIsDescription: () => void;
}

const NameContainer = styled.div`
  ${tw`w-full px-7 flex justify-between items-center box-border`}
`;

const SubName = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const MainText = styled.span`
  ${tw`text-[1.3rem] font-semibold`}
`;

const SubText = styled.div`
  ${tw`px-1 pt-2`}
`;

const Img = styled.img`
  ${tw`h-5 w-5`}
`;

const ItemWrapper = styled.div`
  ${tw`flex flex-col pb-6 px-7 items-end gap-2`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-wrap gap-2`}
`;

const Item = styled.div<{ isCol: boolean; isTwo: boolean }>`
  ${tw`flex bg-gray-light px-4 py-3 justify-between rounded-8`}
  ${({ isCol }) => (isCol ? tw`flex-col gap-2` : '')}
  ${({ isTwo }) => (isTwo ? 'flex: 1 1 30%' : 'flex: 1 1 20%')}
`;

const ItemText = styled.span`
  ${tw`text-sm`}
`;

const StockDiv = styled.div`
  ${tw`flex items-center mt-2 gap-1`}
`;

const StockFont = styled.span<{ num: number }>`
  ${tw`pe-4 text-lg`}

  color: ${(props) =>
    props.num > 0 ? '#c70606' : props.num < 0 ? '#0636c7' : '#000'};
`;

const StockFont2 = styled.span<{ num: number }>`
  color: ${(props) =>
    props.num > 0 ? '#c70606' : props.num < 0 ? '#0636c7' : '#000'};
`;

const Heart = styled.img`
  ${tw`ml-2 w-6 h-6 cursor-pointer`}
`;

const MarketInfo = ({ nowPrice, setIsDescription }: InfoProps) => {
  const detail = useSelector(
    (state: RootState) => state.individualStock.detail,
  );
  const chartData = useSelector(
    (state: RootState) => state.individualStock.chartData,
  );
  const fixedData = useSelector(
    (state: RootState) => state.individualStock.fixedChart,
  );
  const isLoading = useSelector(
    (state: RootState) => state.individualStock.isLoading,
  );
  const [upNum, setUpNum] = useState(0);
  const [nowRate, setNowRate] = useState(0);
  const [upDown, setUpDown] = useState(0);
  const [stockRate, setStockRate] = useState(0);
  const [close, setClose] = useState(0);

  useEffect(() => {
    setUpDown(fixedData[0].close - fixedData[1].close);
    setStockRate(
      ((fixedData[0].close - fixedData[1].close) / fixedData[1].close) * 100,
    );
    setClose(
      fixedData[0].close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    );
  }, [detail.basic_info.symbol]);

  useEffect(() => {
    if (nowPrice.message.close !== '') {
      if (fixedData.length > 1) {
        setUpNum(parseFloat(nowPrice.message.close) - fixedData[1].close);
        setNowRate(
          ((parseFloat(nowPrice.message.close) - fixedData[1].close) /
            fixedData[1].close) *
            100,
        );
      }
    }
  }, [nowPrice]);

  const formatNumber = (num: number): string => {
    if (num >= 1e8) {
      const billion = num / 1e8;
      const formattedBillion = billion.toFixed(1);
      return `${formattedBillion.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}억원`;
    } else {
      return `${num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원`;
    }
  };

  return (
    <>
      <NameContainer>
        <SubName>
          <MainText>{detail.basic_info.name}</MainText>
          <SubText>
            {isLoading ? (
              <MarketInfoSkeleton />
            ) : detail.basic_info.exchange === 'KSC' &&
              nowPrice?.message.close !== '' ? (
              <>
                <StockFont num={upNum}>
                  {nowPrice?.message.close
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </StockFont>
                <StockDiv>
                  {upNum > 0 ? (
                    <CaretUpFill color="#c70606" />
                  ) : upNum < 0 ? (
                    <CaretDownFill color="#0636c7" />
                  ) : null}
                  <StockFont2 num={upNum}>
                    {upNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </StockFont2>
                  <StockFont2 num={nowRate}>(</StockFont2>
                  {nowRate > 0 && <StockFont2 num={nowRate}>+</StockFont2>}
                  <StockFont2 num={nowRate}>{nowRate.toFixed(2)}%)</StockFont2>
                </StockDiv>
              </>
            ) : (
              <>
                <StockFont num={upDown}>
                  {detail.basic_info.exchange === 'KSC' ? close : '$' + close}
                </StockFont>
                <StockDiv>
                  {upDown > 0 ? (
                    <CaretUpFill color="#c70606" />
                  ) : upDown < 0 ? (
                    <CaretDownFill color="#0636c7" />
                  ) : null}
                  <StockFont2 num={upDown}>
                    {detail.basic_info.exchange === 'KSC'
                      ? upDown.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : '$' + upDown.toFixed(2)}
                  </StockFont2>
                  <StockFont2 num={stockRate}>(</StockFont2>
                  {stockRate > 0 && <StockFont2 num={stockRate}>+</StockFont2>}
                  <StockFont2 num={stockRate}>
                    {detail.basic_info.exchange === 'KSC'
                      ? stockRate.toFixed(2) + '%)'
                      : stockRate.toFixed(2) + '%)'}
                  </StockFont2>
                </StockDiv>
              </>
            )}
          </SubText>
        </SubName>
      </NameContainer>
      <ItemWrapper>
        <Img src={Question} onClick={setIsDescription} />
        <ItemContainer>
          <Item isCol={true} isTwo={true}>
            <ItemText>시가총액</ItemText>
            <ItemText>{formatNumber(detail.detail_info.marketCap)}</ItemText>
          </Item>
          <Item isCol={true} isTwo={true}>
            <ItemText>배당 지급월</ItemText>
            <ItemText>
              {detail.basic_info.dividendMonth}•
              {detail.basic_info.dividendMonth + 3}•
              {detail.basic_info.dividendMonth + 6}•
              {detail.basic_info.dividendMonth + 9}월
            </ItemText>
          </Item>
          <Item isCol={false} isTwo={true}>
            <ItemText>PER</ItemText>
            <ItemText>{detail.detail_info.peRatioTtm.toFixed(2)}배</ItemText>
          </Item>
          <Item isCol={false} isTwo={true}>
            <ItemText>배당 수익률</ItemText>
            <ItemText>
              {detail.basic_info.dividendYieldTtm.toFixed(3)}%
            </ItemText>
          </Item>
        </ItemContainer>
      </ItemWrapper>
    </>
  );
};

export default MarketInfo;
