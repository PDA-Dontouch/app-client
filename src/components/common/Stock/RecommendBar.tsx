import React, { useState, useRef } from 'react';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`relative flex items-center w-full h-8 bg-gray20 rounded`}
`;

const Segment = styled.div<{ width: number, color: string }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background-color: ${({ color }) => color};
  position: relative;
`;

const LabelContainer = styled.div`
  ${tw`flex justify-center mb-12`}
  gap: 20px;    
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
  ${tw`absolute w-4 h-8 bg-green-dark rounded-full cursor-pointer`}
  top: -6px;
  transform: translateY(-50%);
`;

interface ValuesType {
  안정: number;
  배당: number;
  성장: number;
}

const RecommendBar: React.FC = () => {
  const [values, setValues] = useState<ValuesType>({ 안정: 33, 배당: 33, 성장: 34 });
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
        안정: Math.min(adjustedValue,100-values.성장),
        배당: Math.max(0,100 - adjustedValue - values.성장),
        성장: values.성장,
      };
    } else if (dragging === 1) {
      const adjustedValue = Math.max(values.안정, newPercentage);
      newValues = {
        안정: values.안정,
        배당: adjustedValue - values.안정,
        성장: 100 - adjustedValue,
      };
    }

    setValues(newValues);
  }
};


  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <LabelContainer>
        <Label color={colors['안정']}>안정 {values.안정}%</Label>
        <Label color={colors['배당']}>배당 {values.배당}%</Label>
        <Label color={colors['성장']}>성장 {values.성장}%</Label>
      </LabelContainer>
      <Container ref={containerRef}>
        <Segment width={values.안정} color={colors['안정']}>
          <Handle
            style={{ right: 0 }}
            onMouseDown={handleMouseDown(0)}
          />
        </Segment>
        <Segment width={values.배당} color={colors['배당']}>
          <Handle
            style={{ right: 0 }}
            onMouseDown={handleMouseDown(1)}
          />
        </Segment>
        <Segment width={values.성장} color={colors['성장']}>
        </Segment>
      </Container>
    </div>
  );
};

export default RecommendBar;
