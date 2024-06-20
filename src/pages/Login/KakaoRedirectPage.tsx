import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { tryLogin } from '../../api/auth';
import axios from 'axios';

const KakaoRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthKakao = async (code:string) => {
        try {
            //카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
            const response = await tryLogin('kakao', code);
            const loginUser = response.data; // 응답 데이터 -> user data 들어와야함
            console.log(loginUser);
            navigate("/");
        } catch (err) {
            if(axios.isAxiosError(err) && err.response && err.response.status === 500)
                navigate("/");
            else
                navigate("/fail");
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');  // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            //alert("CODE = " + code)
            handleOAuthKakao(code);
        }
    }, [location]);

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default KakaoRedirectPage;