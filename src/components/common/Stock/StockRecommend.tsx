import React from 'react';
import tw, { styled } from 'twin.macro';

interface StockRecommendProps {
  title: string;
  description: string;
}

const ReasonSection = styled.div`
  ${tw`p-3 rounded-md mb-2`}
`;

const ReasonContainer = styled.div`
  ${tw`relative inline-block`}
`;

const ReasonBar = styled.div`
  ${tw`absolute top-5 left-0 h-2.5 w-full [background: rgba(26, 167, 110, 0.4)]`}
`;

const ReasonMidContent = styled.p`
  ${tw`text-base mt-2 [width: fit-content]`}
`;

const ReasonContent = styled.p`
  ${tw`text-sm mt-5 [letter-spacing: 0.1em]`}
`;


const StockRecommend: React.FC<StockRecommendProps> = ({ title, description }) => (
  <ReasonSection>
    <ReasonContainer>
      <ReasonMidContent>{title}</ReasonMidContent>
      <ReasonBar />
    </ReasonContainer>
    <ReasonContent>{description}</ReasonContent>
  </ReasonSection>
);

export default StockRecommend;
