import tw, { styled } from 'twin.macro';
import StockChart from '../../components/Stock/StockChart';
import Navbar from '../../components/common/Navbar';

import Empty from '../../assets/line-heart.svg';
import Fill from '../../assets/fill-heart.svg';
import Button from '../../components/common/Button';
import { useState } from 'react';
import TradingStock from '../../components/Stock/TradingStock';

const Container = styled.div`
  ${tw`px-7 py-5 mt-14`}
`;

const NameContainer = styled.div`
  ${tw`w-full flex justify-between items-center`}
`;

const SubName = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const MainText = styled.span`
  ${tw`text-xl`}
`;

const SubText = styled.span`
  ${tw`text-base`}
`;

const Img = styled.img`
  ${tw`h-8 w-8 fill-black`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-wrap gap-2 py-8`}
`;

const Item = styled.div<{ isCol: boolean; isTwo: boolean }>`
  ${tw`flex bg-gray-light px-4 py-3 justify-between rounded-8`}
  ${({ isCol }) => (isCol ? tw`flex-col gap-2` : '')}
  ${({ isTwo }) => (isTwo ? 'flex: 1 1 30%' : 'flex: 1 1 20%')}
`;

const ItemText = styled.span`
  ${tw`text-sm`}
`;

const SubItemContainer = styled.div`
  ${tw`flex flex-col mt-2`}
`;

const BtnContainer = styled.div`
  ${tw`w-full flex px-8 justify-between gap-3 fixed left-0 bottom-[44px] box-border`}
`;

const IndividualStock = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSell, setIsSell] = useState<boolean>(false);

  return (
    <>
      <Navbar name="back" type="" onClick={() => {}} />
      <Container>
        <NameContainer>
          <SubName>
            <MainText>삼성전자</MainText>
            <SubText>60,200원</SubText>
          </SubName>
          <Img src={Empty} />
        </NameContainer>
        <ItemContainer>
          <Item isCol={true} isTwo={true}>
            <ItemText>시가총액</ItemText>
            <ItemText>9,019.2억원</ItemText>
          </Item>
          <Item isCol={true} isTwo={true}>
            <ItemText>다음 배당 예상 지급일</ItemText>
            <ItemText>9,019.2억원</ItemText>
          </Item>
          <Item isCol={false} isTwo={true}>
            <ItemText>PBR</ItemText>
            <ItemText>6.7배</ItemText>
          </Item>
          <Item isCol={false} isTwo={true}>
            <ItemText>주당 배당금</ItemText>
            <ItemText>9000원</ItemText>
          </Item>
          <Item isCol={false} isTwo={true}>
            <ItemText>PER</ItemText>
            <ItemText>13.7배</ItemText>
          </Item>
          <Item isCol={false} isTwo={true}>
            <ItemText>배당 수익률</ItemText>
            <ItemText>2.6%</ItemText>
          </Item>
        </ItemContainer>
        <StockChart />
        <SubItemContainer>
          <SubText>보유 현황</SubText>
          <ItemContainer>
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
          </ItemContainer>
        </SubItemContainer>
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
        <TradingStock isSell={isSell} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default IndividualStock;
