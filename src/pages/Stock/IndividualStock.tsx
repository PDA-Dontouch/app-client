import tw, { styled } from 'twin.macro';
import StockChart from '../../components/Stock/StockChart';
import Navbar from '../../components/common/Navbar';

import Empty from '../../assets/line-heart.svg';
import Fill from '../../assets/fill-heart.svg';
import Button from '../../components/common/Button';
import { useEffect, useState } from 'react';
import TradingStock from '../../components/Stock/TradingStock';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getChartDetail } from '../../store/reducers/stocks/individualStock';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useNavigate } from 'react-router-dom';
import { setSelectedPrice } from '../../store/reducers/stocks/trading';

const Container = styled.div`
  ${tw`h-full py-8 mt-14`}
`;

const NameContainer = styled.div`
  ${tw`w-full px-7 flex justify-between items-center box-border`}
`;

const SubName = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const MainText = styled.span`
  ${tw`text-xl font-semibold`}
`;

const SubText = styled.span`
  ${tw`text-base`}
`;

const Img = styled.img`
  ${tw`h-8 w-8 fill-black`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-wrap gap-2 py-8 px-7`}
`;

const Item = styled.div<{ isCol: boolean; isTwo: boolean }>`
  ${tw`flex bg-gray-light px-4 py-3 justify-between rounded-8`}
  ${({ isCol }) => (isCol ? tw`flex-col gap-2` : '')}
  ${({ isTwo }) => (isTwo ? 'flex: 1 1 30%' : 'flex: 1 1 20%')}
`;

const ItemText = styled.span`
  ${tw`text-sm`}
`;

const SubContainer = styled.div`
  ${tw`flex flex-col mt-2 px-7`}
`;

const SubItemContainer = styled.div`
  ${tw`flex flex-wrap gap-2 py-8`}
`;

const BtnContainer = styled.div`
  ${tw`w-full flex px-8 justify-between gap-3 fixed left-0 bottom-[44px] box-border`}
`;

const IndividualStock = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const detail = useSelector(
    (state: RootState) => state.individualStock.detail,
  );
  const selectCode = useSelector(
    (state: RootState) => state.trading.selectCode,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSell, setIsSell] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    const data = {
      exchange: 'KSC',
      stockId: 10,
    };
    dispatch(getChartDetail(data));
  }, []);

  const { askPrice, nowPrice } = useWebSocket();

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
      <Navbar name="back" type="" onClick={() => navigate('/stocks')} />
      <Container>
        <NameContainer>
          <SubName>
            <MainText>{detail.basic_info.name}</MainText>
            <SubText>60,200원</SubText>
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
          {/* <Item isCol={false} isTwo={true}>
            <ItemText>PBR</ItemText>
            <ItemText>6.7배</ItemText>
          </Item>
          <Item isCol={false} isTwo={true}>
            <ItemText>주당 배당금</ItemText>
            <ItemText>9000원</ItemText>
          </Item> */}
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
        <StockChart />
        <SubContainer>
          <SubText>보유 현황</SubText>
          <SubItemContainer>
            <Item isCol={true} isTwo={false}>
              <ItemText>평균 단가</ItemText>
              <ItemText>58,000원</ItemText>
            </Item>
            <Item isCol={true} isTwo={false}>
              <ItemText>나의 수익률</ItemText>
              <ItemText>3.3%</ItemText>
            </Item>
            <Item isCol={true} isTwo={false}>
              <ItemText>보유 수량</ItemText>
              <ItemText>230주</ItemText>
            </Item>
          </SubItemContainer>
        </SubContainer>
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
