import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import chatImg from '../../assets/chat.png';
import micImg from '../../assets/mic.svg';
import exitImg from '../../assets/closeWhite.svg';

const ChatBotContainer = styled.img`
  ${tw`flex items-center justify-center w-20 h-20 rounded-full`}
  position: fixed;
  bottom: 90px;
  right: 10px;
  object-fit: cover;
`;

const ChatContainer = styled.div`
  ${tw`flex justify-center items-center bg-black60`}
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;

const SpinnerContainer = styled.div`
  ${tw`flex justify-center items-center`}
  width: 100px;
  height: 100px;
`;

const Spinner = styled.span`
  width: 70px;
  height: 70px;
  border: 3px solid #fff;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &::after {
    ${tw`border-y-green`}
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-bottom-color: red;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ReadyContainer = styled.div`
  ${tw`flex flex-col justify-center items-center gap-4`}
`;

const Mic = styled.img`
  width: 100px;
  height: 100px;
`;

const MicDescriptionContainer = styled.div`
  ${tw`flex flex-col justify-center items-center gap-1`}
`;

const MicDescription = styled.div`
  ${tw`text-white text-2xl`}
`;

const MicDetailDescription = styled.div`
  ${tw`text-white text-base`}
`;

const ExitBtn = styled.img`
  ${tw`flex items-center justify-center w-15 h-15 rounded-full`}
  position: fixed;
  bottom: 100px;
  right: 20px;
  object-fit: cover;
`;

export default function ChatbotBtn() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [status, setStatus] = useState<'녹음중' | '녹음준비' | '녹음완료'>(
    '녹음준비',
  );
  function onBtnClickHandler() {
    setIsRunning(true);
  }

  function onMicClickHandler() {
    setStatus('녹음중');
  }

  function onSpinnerClickHandler() {
    setStatus('녹음준비');
  }
  return (
    <>
      {isRunning ? (
        <ChatContainer>
          <ReadyContainer>
            {status === '녹음중' ? (
              <SpinnerContainer>
                <Spinner onClick={onSpinnerClickHandler} />
              </SpinnerContainer>
            ) : (
              <Mic src={micImg} onClick={onMicClickHandler} />
            )}
            <MicDescriptionContainer>
              <MicDescription>마이크를 눌러</MicDescription>{' '}
              <MicDescription>
                {status === '녹음중'
                  ? '녹음을 멈춰주세요.'
                  : '챗봇에게 말해보세요.'}
              </MicDescription>
              <MicDetailDescription>ex) 캘린더로 이동해줘</MicDetailDescription>
            </MicDescriptionContainer>
          </ReadyContainer>
          <ExitBtn src={exitImg} onClick={() => setIsRunning(false)} />
        </ChatContainer>
      ) : (
        <ChatBotContainer onClick={onBtnClickHandler} src={chatImg} />
      )}
    </>
  );
}
