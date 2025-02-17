import React from 'react';
import tw, { styled } from 'twin.macro';

import complete from '../../../assets/complete.svg';
import coin from '../../../assets/coin.svg';
import energy from '../../../assets/energy.svg';
import estate from '../../../assets/estate.svg';

interface ResultMessageProps {
  type: 'buy' | 'sell' | 'energy' | 'estate' | 'cancel' | 'pending';
}

const messageDetails: { [key: string]: { image: string; text: string } } = {
  buy: { image: coin, text: '구매가 완료되었습니다!' },
  sell: { image: complete, text: '판매가 완료되었습니다!' },
  energy: { image: energy, text: '구매가 완료되었습니다!' },
  estate: { image: estate, text: '구매가 완료되었습니다!' },
  cancel: { image: complete, text: '구매가 취소되었습니다.' },
  pending: { image: complete, text: '예약이 완료되었습니다.' },
};

const Container = styled.div`
  ${tw`flex flex-col justify-center items-center h-5/6 p-8`}
`;

const MessageContainer = styled.div`
  ${tw`flex flex-col justify-center items-center gap-8 m-auto w-5/6 h-4/5`}
`;

const Image = styled.img`
  ${tw`mb-1 w-[6rem]`}
`;

const Text = styled.p`
  ${tw`text-[1.2rem]`}
`;

const ResultMessage: React.FC<ResultMessageProps> = ({ type }) => {
  const details = messageDetails[type];

  if (!details) {
    return (
      <Container>
        <MessageContainer>
          <Text>잘못된 접근입니다</Text>
        </MessageContainer>
      </Container>
    );
  }

  const { image, text } = details;

  return (
    <Container>
      <MessageContainer>
        <Image src={image} alt="아이콘" />
        <Text>{text}</Text>
      </MessageContainer>
    </Container>
  );
};

export default ResultMessage;
