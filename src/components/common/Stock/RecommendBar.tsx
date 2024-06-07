import React, { useState, useRef } from 'react';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`relative flex items-center w-full h-8 bg-gray20 rounded-10`}
`;

const Segment = styled.div<{ width: number, color: string }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background-color: ${({ color }) => color};
  position: relative;
`;

const LabelContainer = styled.div`
  ${tw`flex justify-center mb-12`}
  gap: 15px;    
`;

const Label = styled.div<{ color: string }>`
  ${tw`flex items-center text-lg`}
  &::before {
    content: '';
    ${tw`block w-4 h-4 mr-2 rounded-full`}
    background-color: ${({ color }) => color};
  }
`;

const Handle = styled.div`
  ${tw`absolute w-4 h-8 bg-green-dark cursor-pointer`}
  width: 32px;
  height: 32px;
  border-radius: 50% 50% 50% 0;
  top: 0px;
  transform: translateY(-70%) rotate(-45deg);
  border: 2px solid #0F6643;
  z-index: 10;
`;

interface ValuesType {
  safe_score: number;
  dividend_score: number;
  growth_score: number;
}

const RecommendBar: React.FC = () => {
  const [values, setValues] = useState<ValuesType>({ safe_score: 33, dividend_score: 33, growth_score: 34 });
  const [dragging, setDragging] = useState<number | null>(null);
  const colors: { [key: string]: string } = { 안정: '#1AA76E', 배당: '#5293D0', 성장: '#F24B55' };
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (index: number) => () => {
    setDragging(index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging !== null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const totalWidth = rect.width;
      const newPercentage = Math.round((offsetX / totalWidth) * 100);

      let newValues = { ...values };

      if (dragging === 0) {
        const adjustedValue = Math.max(0, newPercentage);
        newValues = {
          safe_score: Math.min(adjustedValue, 100 - values.growth_score),
          dividend_score: Math.max(0, 100 - adjustedValue - values.growth_score),
          growth_score: values.growth_score,
        };
      } else if (dragging === 1) {
        const adjustedValue = Math.max(values.safe_score, newPercentage);
        newValues = {
          safe_score: values.safe_score,
          dividend_score: adjustedValue - values.safe_score,
          growth_score: 100 - adjustedValue,
        };
      }

      setValues(newValues);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragging !== null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.touches[0].clientX - rect.left;
      const totalWidth = rect.width;
      const newPercentage = Math.round((offsetX / totalWidth) * 100);

      let newValues = { ...values };

      if (dragging === 0) {
        const adjustedValue = Math.max(0, newPercentage);
        newValues = {
          safe_score: Math.min(adjustedValue, 100 - values.growth_score),
          dividend_score: Math.max(0, 100 - adjustedValue - values.growth_score),
          growth_score: values.growth_score,
        };
      } else if (dragging === 1) {
        const adjustedValue = Math.max(values.safe_score, newPercentage);
        newValues = {
          safe_score: values.safe_score,
          dividend_score: adjustedValue - values.safe_score,
          growth_score: 100 - adjustedValue,
        };
      }

      setValues(newValues);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTouchMove={handleTouchMove} onTouchEnd={handleMouseUp}>
      <LabelContainer>
        <Label color={colors['안정']}>안정 {values.safe_score}%</Label>
        <Label color={colors['배당']}>배당 {values.dividend_score}%</Label>
        <Label color={colors['성장']}>성장 {values.growth_score}%</Label>
      </LabelContainer>
      <Container ref={containerRef}>
        <Segment width={values.safe_score} color={colors['안정']}>
          <Handle
            style={{ right: -17 }}
            onMouseDown={handleMouseDown(0)}
            onTouchStart={handleMouseDown(0)}
          />
        </Segment>
        <Segment width={values.dividend_score} color={colors['배당']}>
          <Handle
            style={{ right: -17 }}
            onMouseDown={handleMouseDown(1)}
            onTouchStart={handleMouseDown(1)}
          />
        </Segment>
        <Segment width={values.growth_score} color={colors['성장']}>
        </Segment>
      </Container>
    </div>
  );
};

export default RecommendBar;
