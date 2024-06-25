import tw, { styled } from 'twin.macro';
import SocialLogin from '../../components/Login/SocialLogin';

import Logo from '../../assets/logo.svg';
import Kakao from '../../assets/kakao.svg';
import Naver from '../../assets/naver.svg';

const Container = styled.div`
  ${tw`w-[100vw] h-[100vh] px-[4rem] py-[9.6em] flex flex-col justify-between items-center box-border`}
`;

const LogoImage = styled.img`
  ${tw`w-[5.2rem] h-auto`}
`;

const ItemContainer = styled.div`
  ${tw`w-[100%] flex flex-col gap-6`}
`;

const LoginPage = () => {
  const naverAuthUrl = import.meta.env.VITE_NAVER_AUTH_URL as string;
  const kakaoAuthUrl = import.meta.env.VITE_KAKAO_AUTH_URL as string;

  const onLogin = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    url: string,
  ) => {
    e.preventDefault();
    window.location.href = url;
  };

  return (
    <Container>
      <LogoImage src={Logo} />
      <ItemContainer>
        <SocialLogin
          url={Kakao}
          name="Kakao"
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            onLogin(e, kakaoAuthUrl)
          }
        />
        <SocialLogin
          url={Naver}
          name="Naver"
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            onLogin(e, naverAuthUrl)
          }
        />
      </ItemContainer>
    </Container>
  );
};

export default LoginPage;
