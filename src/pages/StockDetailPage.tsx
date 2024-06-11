import React from 'react';
import tw, { styled } from 'twin.macro';
import SelectStock from '../components/Stock/SelectStock';
import StockRecommend from '../components/common/Stock/StockRecommend'; 
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';

const Wrapper = styled.div`
  ${tw`relative flex flex-col h-full bg-white pt-20`}
`;

const Container = styled.div`
  ${tw`relative w-11/12 max-w-lg bg-white rounded-14 mx-auto mb-20 pb-20`}
`;

const HeaderText = styled.span`
  ${tw`text-lg font-semibold mb-4 flex items-center justify-center [font-family: 'Inter'] [line-height: 22px]`}
`;

const AddStock = styled.div`
  ${tw`flex justify-center items-center text-xs text-black mt-4 cursor-pointer [font-family: 'Inter'] [line-height: 15px]`}
`;

const ExpectedDividend = styled.div`
  ${tw`text-right text-base text-sm text-black mt-4 mb-6 [font-family: 'Inter'] [line-height: 17px]`}
`;

const Divider = styled.div`
  ${tw`w-full h-px bg-gray-dark my-4`}
`;

const ReasonTitle = styled.h2`
  ${tw`text-lg font-semibold mb-2 [font-family: 'Pretendard'] [line-height: 22px]`}
`;

const StockContainer = styled.div`
  ${tw`mb-2`}
`;

const AbsoluteButtonContainer = styled.div`
  ${tw`absolute w-10/12 bg-white`} bottom: 3%; left: 50%; transform: translateX(-50%); padding: 16px;
`;

const StockDetailPage: React.FC = () => {
  const handleDelete = (name: string) => {
    alert(`${name} 삭제`);
  };

  const handleAddStock = () => {
    alert('종목 추가하기');
  };

  const handleNext = () => {
    alert('다음 단계로 이동');
  };

  return (
    <Wrapper>
      <Navbar name="" type="close" />
      <Container>
        <HeaderText>1·4·7·10월 추천 배당주</HeaderText>
        <StockContainer>
          <SelectStock name="삼성" price="1,200" amount={200} onDelete={() => handleDelete('삼성')} />
        </StockContainer>
        <StockContainer>
          <SelectStock name="카카오" price="1,200" amount={0} onDelete={() => handleDelete('카카오')} />
        </StockContainer>
        <AddStock onClick={handleAddStock}>+ 종목 추가하기</AddStock>
        <Divider />
        <ExpectedDividend>예상 월 배당금 360,000원</ExpectedDividend>
        <ReasonTitle>추천 이유</ReasonTitle>
        <StockRecommend
          title="# 높은 안정성"
          description="안정형 투자성향을 가진 OOO님께 어쩌구저쩌구쩌구저쩌구..."
        />
        <StockRecommend
          title="# 추후 api를 통해 받아올 수 있게"
          description="영역을 세분화 해두었습니다. 초록색 밑줄은 추천 양식이 비슷할 것 같아서 고정값으로 해뒀습니다."
        />
      </Container>
      <AbsoluteButtonContainer>
        <Button name="다음" status="active" onClick={handleNext} />
      </AbsoluteButtonContainer>
    </Wrapper>
  );
};

export default StockDetailPage;
