import { useState } from 'react';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { RootState } from '../../../store/store';

import Empty from '../../../assets/empty-heart.svg';
import Fill from '../../../assets/fill-heart.svg';

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

const MarketInfo = () => {
  const detail = useSelector(
    (state: RootState) => state.individualStock.detail,
  );
  const [isLike, setIsLike] = useState<boolean>(false);

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
          <ItemText>{detail.basic_info.dividendYieldTtm.toFixed(3)}%</ItemText>
        </Item>
      </ItemContainer>
    </>
  );
};

export default MarketInfo;
