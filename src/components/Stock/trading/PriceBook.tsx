/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PriceItem from './PriceItem';
import {
  setScrollPosition,
  setSelectedPrice,
} from '../../../store/reducers/stocks/trading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import tw, { styled } from 'twin.macro';
import { PriceType, SocketType } from '../../../types/socket';
import Noti from '../../../assets/noti.svg';

interface PriceBookProps {
  nowPrice: PriceType;
  askPrice: SocketType;
  isKorea: boolean;
}

const Container = styled.div<{ isKorea: boolean }>`
  ${tw`overflow-y-auto`}
  ${({ isKorea }) => (isKorea ? tw`` : tw`h-[100vh]`)}
`;

const FlexColumn = styled.div<{ isOpen: boolean }>`
  ${tw`flex flex-col`}
  ${({ isOpen }) => (!isOpen ? tw`h-[50%]` : '')}
`;

const Blur = styled.div<{ isStart: boolean }>`
  ${tw`w-[100%] h-[100%] flex flex-col items-center justify-end text-black gap-3`}
  background-color: rgba(0, 0, 0, 0.2);
  ${({ isStart }) => (isStart ? tw`justify-end` : tw`justify-start`)}
`;

const PriceContainer = styled.div<{
  backgroundColor: string;
}>(({ backgroundColor }) => [
  tw`w-[156px] h-[100%] flex flex-row items-center justify-between`,
  backgroundColor && { backgroundColor },
]);

const PriceBook = ({ nowPrice, askPrice, isKorea }: PriceBookProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { scrollPosition, selectedPrice } = useSelector(
    (state: RootState) => state.trading,
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition, askPrice]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    dispatch(setScrollPosition(e.currentTarget.scrollTop));
  };

  const handlePriceSelect = (price: string) => {
    dispatch(setSelectedPrice(price));
  };

  return (
    <Container
      ref={containerRef}
      onScroll={handleScroll}
      isKorea={
        isKorea
          ? askPrice?.message?.sellPrice.length > 0 &&
            askPrice?.message?.buyPrice.length > 0
          : false
      }
    >
      {isKorea ? (
        askPrice?.message?.sellPrice.length > 0 ? (
          <FlexColumn isOpen={true}>
            {askPrice?.message?.sellPrice
              .map((price: string, index: number) => (
                <div key={uuidv4()}>
                  <PriceItem
                    price={price}
                    amount={askPrice?.message?.sellAmount[index]}
                    backgroundColor="#E7F0FD"
                    textColor="#015FFF"
                    nowPrice={nowPrice?.message?.close}
                    onPriceSelect={handlePriceSelect}
                    selectedPrice={selectedPrice}
                  />
                </div>
              ))
              .reverse()}
          </FlexColumn>
        ) : (
          <FlexColumn isOpen={false}>
            <PriceContainer backgroundColor="#E7F0FD">
              <Blur isStart={true}>
                <img src={Noti} />
                <span>현재 장 시간이</span>
              </Blur>
            </PriceContainer>
          </FlexColumn>
        )
      ) : (
        <FlexColumn isOpen={false}>
          <PriceContainer backgroundColor="#E7F0FD">
            <Blur isStart={true}>
              <img src={Noti} />
              <span>추후 추가될</span>
            </Blur>
          </PriceContainer>
        </FlexColumn>
      )}

      {isKorea ? (
        askPrice?.message?.buyPrice.length > 0 ? (
          <FlexColumn isOpen={true}>
            {askPrice?.message?.buyPrice?.map((price, index) => (
              <div key={uuidv4()}>
                <PriceItem
                  price={price}
                  amount={askPrice?.message?.buyAmount[index]}
                  backgroundColor="#FDE8E7"
                  textColor="red"
                  nowPrice={nowPrice?.message?.close}
                  onPriceSelect={handlePriceSelect}
                  selectedPrice={selectedPrice}
                />
              </div>
            ))}
          </FlexColumn>
        ) : (
          <FlexColumn isOpen={false}>
            <PriceContainer backgroundColor="#FDE8E7">
              <Blur isStart={false}>아닙니다.</Blur>
            </PriceContainer>
          </FlexColumn>
        )
      ) : (
        <FlexColumn isOpen={false}>
          <PriceContainer backgroundColor="#FDE8E7">
            <Blur isStart={false}>기능입니다.</Blur>
          </PriceContainer>
        </FlexColumn>
      )}
    </Container>
  );
};

export default PriceBook;
