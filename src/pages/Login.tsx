import tw, { styled } from "twin.macro";
import SocialLogin from "../components/Login/SocialLogin";

import Logo from '../assets/logo.svg';
import Kakao from '../assets/kakao.svg';
import Naver from '../assets/naver.svg';
import Google from '../assets/google.svg';

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
  return (
    <Container>
      <Img src={Logo} />
      <ItemContainer>
        <SocialLogin url={Kakao} name="Kakao" />
        <SocialLogin url={Naver} name="Naver" />
        <SocialLogin url={Google} name="Google" />
      </ItemContainer>
    </Container>
  );
};

export default Login;