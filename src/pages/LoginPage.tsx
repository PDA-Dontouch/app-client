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

const LogoImage = styled.img`
  ${tw`w-32 h-auto`}
`;

const ItemContainer = styled.div`
  ${tw`w-[100%] flex flex-col gap-6`}
`;

const LoginPage = () => {
  //const dispatch = useDispatch<AppDispatch>();
  const googleAuthUrl = import.meta.env.GOOGLE_AUTH_URL as string;
  const naverAuthUrl = import.meta.env.NAVER_AUTH_URL as string;
  const kakaoAuthUrl = import.meta.env.KAKAO_AUTH_URL as string;

  const onLogin = (e: React.MouseEvent<HTMLElement, MouseEvent>, url: string) => {
    e.preventDefault();
    //dispatch(postLogin(data));
    window.location.href = url;
  };


  return (
    <Container>
      <LogoImage src={Logo} />
      <ItemContainer>
        <SocialLogin url={Kakao} name="Kakao" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onLogin(e, kakaoAuthUrl)} />
        <SocialLogin url={Naver} name="Naver" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onLogin(e,naverAuthUrl)} />
        <SocialLogin url={Google} name="Google" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onLogin(e,googleAuthUrl)} />
      </ItemContainer>
    </Container>
  );
};

export default LoginPage;