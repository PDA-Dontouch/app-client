import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import testData from '../assets/testData';
import BasicModal from '../components/common/Modal/BasicModal';

const Container = styled.div`
  ${tw`flex flex-col items-center justify-between w-full h-screen bg-white`}
`;

const QuestionContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-11/12 h-full rounded-20 p-8`}
  align-items: stretch; 
  flex-grow: 1;
`;

const QuestionHeader = styled.div`
  ${tw`w-11/12 text-center mt-20`} 
`;

const Question = styled.div`
  ${tw`text-3xl mb-8`}
`;

const AnswerContainer = styled.div`
  ${tw`flex flex-col items-center w-full`}
`;

const AnswerButton = styled.button<{ selected?: boolean }>`
  ${tw`w-full text-lg p-4 mb-4 border rounded-10 cursor-pointer bg-white`}
  ${({ selected }) => selected && tw`border-green text-green`}
  ${tw`focus:outline-none`}
  min-height: 3rem; 
  height: auto; 
`;

const NavigationButtons = styled.div`
  ${tw`flex justify-between w-10/12 mt-8 mb-20 px-4 space-x-4`}
`;


const NavButton = styled.button`
  ${tw`text-lg p-4 rounded-10 cursor-pointer flex-1`} 
  ${tw`focus:outline-none`}
  &:disabled {
    ${tw` cursor-not-allowed`}
  }
  &.next {
    ${tw`bg-green text-white`}
  }
  &:first-of-type {
    ${tw`mr-4`} 
  }
  &:last-of-type {
    ${tw`ml-4`} 
  }
`;


const BackDrop = styled.div`
  ${tw`fixed inset-0 bg-black40`}
`;

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(testData.length).fill(-1));
  const [showModal, setShowModal] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < testData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalPoints = answers.reduce((sum, answerIndex, questionIndex) => 
        sum + (answerIndex !== -1 ? testData[questionIndex].answers[answerIndex].point : 0)
      , 0);
      setTotalScore(totalPoints);
      setShowModal(true);
      console.log("Total Score:", totalPoints); // 실제 구현에선 얘를 서버로 보내야 함
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <Container>
      {showModal && (
        <>
          <BackDrop />
          <BasicModal type={totalScore.toString()} onClose={() => setShowModal(false)} />
        </>
      )}
      {!showModal && (
        <>
          <QuestionHeader>
            <Question>
              {currentQuestion + 1} / {testData.length}
            </Question>
            <Question>{testData[currentQuestion].question}</Question>
          </QuestionHeader>
          <QuestionContainer>
            <AnswerContainer>
              {testData[currentQuestion].answers.map((answer, index) => (
                <AnswerButton
                  key={index}
                  selected={answers[currentQuestion] === index}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {answer.text}
                </AnswerButton>
              ))}
            </AnswerContainer>
          </QuestionContainer>
          <NavigationButtons>
            <NavButton onClick={handlePrev} disabled={currentQuestion === 0}>
              이전
            </NavButton>
            <NavButton className="next" onClick={handleNext} disabled={answers[currentQuestion] === -1}>
              {currentQuestion === testData.length - 1 ? '완료' : '다음'}
            </NavButton>
          </NavigationButtons>
        </>
      )}
    </Container>
  );
};

export default QuizPage;
