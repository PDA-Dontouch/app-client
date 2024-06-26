import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import chatImg from '../../assets/chatbot.png';
import micImg from '../../assets/mic.svg';
import exitImg from '../../assets/closeWhite.svg';

import {
  VoiceRecorder,
  VoiceRecorderPlugin,
  RecordingData,
  GenericResponse,
  CurrentRecordingStatus,
} from 'capacitor-voice-recorder';
import { getSTT } from '../../api/stocks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { chatbotRouting } from '../../utils/chatbotRouting';
import { useNavigate } from 'react-router-dom';

const ChatBotContainer = styled.img`
  ${tw`flex items-center justify-center h-16`}
  position: fixed;
  bottom: 90px;
  right: 10px;
  object-fit: contain;
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
  border: 3px solid #457bc3;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1.5s linear infinite;

  &::after {
    ${tw`border-y-green`}
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 78px;
    height: 78px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-bottom-color: #8dc3e2;
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
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [status, setStatus] = useState<'녹음중' | '녹음준비' | '녹음완료'>(
    '녹음준비',
  );
  function onBtnClickHandler() {
    setIsRunning(true);
  }

  function onMicClickHandler() {
    VoiceRecorder.startRecording()
      .then(() => {
        setStatus('녹음중');
      })
      .catch((error) => console.error(error));
  }

  function onSpinnerClickHandler() {
    VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        const base64Sound = result.value.recordDataBase64;

        getSTT({ base64Sound, userId: user.user.id })
          .then((data) => {
            console.log(data.data);
            const routing = chatbotRouting({ text: data.data });
            navigate(routing.url, { state: { initialActive: routing.state } });
          })
          .catch((err) => {
            console.log(err);
          });

        setStatus('녹음완료');
      })
      .catch((error) => console.error(error));
  }

  function onExitHandler() {
    setIsRunning(false);
    VoiceRecorder.getCurrentStatus()
      .then((result: CurrentRecordingStatus) => {
        if (result.status === 'RECORDING') {
          VoiceRecorder.stopRecording();
        }
      })
      .catch((error) => console.log(error));

    setStatus('녹음준비');
  }

  useEffect(() => {
    const canRecord = VoiceRecorder.canDeviceVoiceRecord();
    canRecord.then((data: GenericResponse) => {
      if (!data.value) {
        setIsRunning(false);
      } else {
        VoiceRecorder.hasAudioRecordingPermission().then(
          (result: GenericResponse) => {
            if (!result.value) {
              VoiceRecorder.requestAudioRecordingPermission().then(
                (request) => {
                  if (!request.value) {
                    setIsRunning(false);
                  }
                },
              );
            }
          },
        );
      }
    });
  }, []);

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
              <MicDetailDescription>
                {'ex) 캘린더로 이동해줘'}
              </MicDetailDescription>
            </MicDescriptionContainer>
          </ReadyContainer>
          <ExitBtn src={exitImg} onClick={onExitHandler} />
        </ChatContainer>
      ) : (
        <></>
      )}
    </>
  );
}
