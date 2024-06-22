import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { AppDispatch, RootState } from '../../../store/store';

import Empty from '../../../assets/empty-heart.svg';
import Fill from '../../../assets/fill-heart.svg';
import { PriceType } from '../../../types/socket';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import { ChartActionPayload } from '../../../store/reducers/stocks/individualStock';
import { useParams } from 'react-router-dom';
import MarketInfoSkeleton from '../../Skeleton/MarketInfoSkeleton';

interface InfoProps {
  nowPrice: PriceType;
}

type ChartType = {
  payload: ChartActionPayload;
};

const NameContainer = styled.div`
  ${tw`w-full px-7 flex justify-between items-center box-border`}
`;

const SubName = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const MainText = styled.span`
  ${tw`text-xl font-semibold`}
`;

const SubText = styled.div`
  ${tw`px-1 pt-2`}
`;

const Img = styled.img`
  ${tw`h-8 w-8 fill-black`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-wrap gap-2 py-6 px-7`}
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

const MarketInfo = ({ nowPrice }: InfoProps) => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const detail = useSelector(
    (state: RootState) => state.individualStock.detail,
  );
  const chartData = useSelector(
    (state: RootState) => state.individualStock.chartData,
  );
  const selectExchange = useSelector(
    (state: RootState) => state.trading.selectExchange,
  );
  const isLoading = useSelector(
    (state: RootState) => state.individualStock.isLoading,
  );
  const [isLike, setIsLike] = useState<boolean>(false);
  const [upNum, setUpNum] = useState(0);
  const [nowRate, setNowRate] = useState(0);
  const upDown = useSelector(
    (state: RootState) => state.individualStock.upDown,
  );
  const stockRate = useSelector(
    (state: RootState) => state.individualStock.stockRate,
  );
  const closePrice = useSelector(
    (state: RootState) => state.individualStock.close,
  );

  useEffect(() => {
    if (nowPrice.message.close !== '') {
      if (chartData.length > 1) {
        setUpNum(
          parseFloat(nowPrice.message.close) -
            chartData[chartData.length - 2].close,
        );
        setNowRate(
          ((parseFloat(nowPrice.message.close) -
            chartData[chartData.length - 2].close) /
            chartData[chartData.length - 2].close) *
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
                  {detail.basic_info.exchange === 'KSC'
                    ? closePrice
                    : '$' + closePrice}
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
        <Img
          src={isLike ? Fill : Empty}
          onClick={() => setIsLike((prev) => !prev)}
        />
      </NameContainer>
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
          <ItemText>{detail.basic_info.dividendYieldTtm.toFixed(3)}%</ItemText>
        </Item>
      </ItemContainer>
    </>
  );
};

export default MarketInfo;
