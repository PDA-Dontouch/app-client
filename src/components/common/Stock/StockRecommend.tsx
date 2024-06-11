import React from 'react';
import tw, { styled } from 'twin.macro';

interface StockRecommendProps {
  title: string;
  description: string;
}

const ReasonSection = styled.div`
  ${tw`p-3 rounded-md mb-2`}
`;

const ReasonHeader = styled.div`
  ${tw`relative`}
`;

const ReasonBar = styled.div`
  ${tw`absolute top-3 left-0 h-2 w-28 [background: rgba(26, 167, 110, 0.4)]`}
`;

const ReasonMidContent = styled.p`
  ${tw`text-base text-black font-semibold mt-2 [font-family: 'Inter'] [line-height: 18px]`}
`;

const ReasonContent = styled.p`
  ${tw`text-black mt-4 [font-family: 'Inter'] [font-size: 13px] [line-height: 18px]`}
`;


const StockRecommend: React.FC<StockRecommendProps> = ({ title, description }) => (
  <ReasonSection>
    <ReasonHeader>
      <ReasonBar />
      <ReasonMidContent>{title}</ReasonMidContent>
    </ReasonHeader>
    <ReasonContent>{description}</ReasonContent>
  </ReasonSection>
);

export default StockRecommend;
