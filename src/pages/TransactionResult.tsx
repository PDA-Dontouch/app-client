import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResultMessage from '../components/common/Product/ResultMessage';
import Button from '../components/common/Button';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`flex flex-col [height:90%] justify-center mb-8`}
`;

const ButtonContainer = styled.div`
  ${tw`mt-4 w-10/12 max-w-lg mx-auto `}
    button {
    ${tw`bg-[rgba(218, 218, 218, 0.1)] text-black`}
`;

const TransactionResult: React.FC = () => {
  const { type } = useParams<{
    type: 'buy' | 'sell' | 'energy' | 'estate' | 'cancel' | 'pending';
  }>();
  const navigate = useNavigate();

  if (!type) {
    return <div>오류가 발생했습니다.</div>;
  }

  const handleMainPageClick = () => {
    navigate('/');
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
