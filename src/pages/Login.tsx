import tw, { styled } from "twin.macro";
import { useDispatch } from "react-redux";
import { postLogin } from "../store/reducers/auth/auth";
import SocialLogin from "../components/Login/SocialLogin";

import Logo from '../assets/logo.svg';
import Kakao from '../assets/kakao.svg';
import Naver from '../assets/naver.svg';
import Google from '../assets/google.svg';
import { AppDispatch } from "../store/store";

const Container = styled.div`
  ${tw`w-[calc(100% - 144px)] h-[calc(100% - 360px)] px-18 py-[180px] flex flex-col justify-between items-center`}
`;

const Img = styled.img`
  ${tw`w-[80px] h-[80px]`}
`;

const ItemContainer = styled.div`
  ${tw`w-[100%] flex flex-col gap-6`}
`;

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onLogin = (e: React.MouseEvent<HTMLElement, MouseEvent>, data: string) => {
    e.preventDefault();
    
    dispatch(postLogin(data));
  };

  return (
    <Container>
      <Img src={Logo} />
      <ItemContainer>
        <SocialLogin url={Kakao} name="Kakao" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onLogin(e, 'kakao')} />
        <SocialLogin url={Naver} name="Naver" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onLogin(e, 'naver')} />
        <SocialLogin url={Google} name="Google" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onLogin(e, 'google')} />
      </ItemContainer>
    </Container>
  );
};

export default Login;