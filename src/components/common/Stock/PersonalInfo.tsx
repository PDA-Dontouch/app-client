import tw, { css, styled } from 'twin.macro';
import charIcon from '../../../assets/chartIcon.png';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

const PersonalContainer = styled.div`
  ${tw`w-full flex flex-row gap-20`}
   ${css`
    height: 40vw;
  `}
`;

const TextContainer = styled.div`
  ${tw`flex flex-col gap-3 m-2 ml-4`}
   ${css`
    height: 90%;
  `}

`;
const IconContainer = styled.div`
  ${tw`flex items-center justify-center mt-5 mb-5`}
  ${css`
    height: 70%;
    aspect-ratio: 1
  `}
  
`;
const Icon = styled.img`
  ${tw`object-cover`}
  ${css`
    width: 100%;
    height: 100%;
  `}
`;

const Title = styled.span`
  ${tw`text-lg ml-2`}
  ${css`
    color: rgba(0, 0, 0, 0.4);
  `}
`;
const PersonData = styled.span`
  ${tw`text-xl`}
`;

const PersonalInfo: React.FC = () => {
  //const dispatch = useDispatch<AppDispatch>();
  //const user = useSelector((state: RootState) => state.auth.data);

  return (
    <PersonalContainer>
      <TextContainer>
        <Title>투자 성향</Title>
        <PersonData>공격투자형</PersonData>
        <Title>투자 금액</Title>
        <PersonData>200 만원</PersonData>
      </TextContainer>
      <IconContainer>
        <Icon src={charIcon} />
      </IconContainer> 
    </PersonalContainer>
  );
};

export default PersonalInfo;
