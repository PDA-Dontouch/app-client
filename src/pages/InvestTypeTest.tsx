import { useState } from 'react';
import testData from '../assets/testData';
import tw, { styled } from 'twin.macro';
import SelectButton from '../components/StockTest/SelectButton';
import Button from '../components/common/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

interface LocationState {
  nav?: boolean;
}

const Container = styled.div`
  ${tw`h-[100%] px-7 py-22 box-border`}
`;

const ItemContainer = styled.div`
  ${tw`w-full h-full flex flex-col justify-between`}
`;

const Wrapper = styled.div`
  ${tw`w-full flex flex-col gap-9`}
`;

const BtnWrapper = styled.div`
  ${tw`w-full flex gap-6`}
`;

const TextContainer = styled.div`
  ${tw`w-full flex flex-col gap-4`}
`;

const TextItem = styled.div`
  ${tw`flex items-end gap-1`}
`;

const XLargeText = styled.span`
  ${tw`text-4xl`}
`;

const LargeText = styled.span`
  ${tw`text-xl`}
`;

const Title = styled.span`
  ${tw`text-lg`}
`;

const InvestTypeTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(testData.length).fill(-1),
  );
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < testData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const totalPoints = answers.reduce(
      (sum, answerIndex, questionIndex) =>
        sum +
        (answerIndex !== -1
          ? testData[questionIndex].answers[answerIndex].point
          : 0),
      0,
    );
    setTotalScore(totalPoints);
    navigate('/asset-input', { state: { totalScore: totalPoints } });
  };

  return (
    <>
      {' '}
      {state.nav && (
        <Navbar
          name="back"
          type="back"
          onClick={() => {
            navigate('/');
          }}
        />
      )}
      <Container>
        <ItemContainer>
          <Wrapper>
            <TextContainer>
              <TextItem>
                <XLargeText>0{currentQuestion + 1}</XLargeText>
                <LargeText> / 0{testData.length}</LargeText>
              </TextItem>
              <Title>{testData[currentQuestion].question}</Title>
            </TextContainer>
            <TextContainer>
              {testData[currentQuestion].answers.map((item, idx) => (
                <div key={idx}>
                  <SelectButton
                    name={item.text}
                    status={
                      answers[currentQuestion] === idx ? 'active' : 'plain'
                    }
                    onClick={() => handleAnswerSelect(idx)}
                  />
                </div>
              ))}
            </TextContainer>
          </Wrapper>
          {currentQuestion === 0 ? (
            <Button
              name="다음"
              status={answers[currentQuestion] === -1 ? 'disabled' : 'active'}
              onClick={handleNext}
            />
          ) : currentQuestion === 6 ? (
            <Button
              name="내 계좌 연동하기"
              status={answers[currentQuestion] === -1 ? 'disabled' : 'active'}
              onClick={handleSubmit}
            />
          ) : (
            <BtnWrapper>
              <Button name="이전" status="plain" onClick={handlePrev} />
              <Button
                name="다음"
                status={answers[currentQuestion] === -1 ? 'disabled' : 'active'}
                onClick={handleNext}
              />
            </BtnWrapper>
          )}
        </ItemContainer>
      </Container>
    </>
  );
};

export default InvestTypeTest;
