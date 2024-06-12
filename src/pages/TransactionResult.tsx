import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResultMessage from '../components/common/Product/ResultMessage';
import Button from '../components/common/Button';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`flex flex-col [height:90%] justify-center mb-8`}
`;

const ButtonContainer = styled.div`
  ${tw`mt-4 w-10/12 max-w-lg mx-auto`}
`;

const TransactionResult: React.FC = () => {
  const { type } = useParams<{
    type: 'buy' | 'sell' | 'energyInvest' | 'estateInvest' | 'cancel';
  }>();
  const navigate = useNavigate();

  if (!type) {
    return <div>오류가 발생했습니다.</div>;
  }

  const handleMainPageClick = () => {
    navigate('/calendar');
  };

  return (
    <Container>
      <ResultMessage type={type} />
      <ButtonContainer>
        <Button
          name="메인 페이지로"
          status="active"
          onClick={handleMainPageClick}
        />
      </ButtonContainer>
    </Container>
  );
};

export default TransactionResult;
