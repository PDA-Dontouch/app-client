/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
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

interface PriceBookProps {
  nowPrice: PriceType;
  askPrice: SocketType;
}

const Container = styled.div`
  ${tw`overflow-y-auto`}
`;

const FlexColumn = styled.div`
  ${tw`flex flex-col`}
`;

const PriceBook = ({ nowPrice, askPrice }: PriceBookProps) => {
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
    <Container ref={containerRef} onScroll={handleScroll}>
      <FlexColumn>
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

      <FlexColumn>
        {askPrice?.message?.buyPrice.map((price: string, index: number) => (
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
    </Container>
  );
};

export default PriceBook;
