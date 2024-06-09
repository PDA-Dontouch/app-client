import React from 'react';
import tw, { styled } from 'twin.macro';
import SocialLogin from '../components/Login/SocialLogin';
import googleLogo from '../assets/google.svg';
import naverLogo from '../assets/naver.svg';
import kakaoLogo from '../assets/kakao.svg';
import mainLogo from '../assets/logo.svg';



const MainContainer = styled.div`
  ${tw`flex flex-col items-center justify-center min-h-screen overflow-y-auto`}
`;

const LoginButtonContainer = styled.div`
  ${tw`flex flex-col space-y-5 p-4`}
  margin-top:10%
`;

const LogoImage = styled.img`
  ${tw`w-32 h-auto`}
`;


export const API_BASE_URL = 'http://localhost:8081';
export const OAUTH2_REDIRECT_URI = 'http://localhost:5173/';

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL = API_BASE_URL + '/oauth2/authorization/naver?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL = API_BASE_URL + '/oauth2/authorization/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;

const LoginPage: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    };
    const handleNaverLogin = () => {
        window.location.href = NAVER_AUTH_URL;
    };
    const handleKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <MainContainer>
            <LogoImage src={mainLogo}/>
        <LoginButtonContainer>
            <SocialLogin name={"Kakao"} url={kakaoLogo} onClick={handleKakaoLogin}></SocialLogin>
            <SocialLogin name={"Naver"} url={naverLogo} onClick={handleNaverLogin}></SocialLogin>
            <SocialLogin name={"Google"} url={googleLogo} onClick={handleGoogleLogin}></SocialLogin>
        </LoginButtonContainer>
        </MainContainer>
    );
};

export default LoginPage;
