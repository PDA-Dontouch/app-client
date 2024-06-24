import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { tryLogin } from '../../api/auth';
import axios from 'axios';

const NaverRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthNaver = async (code:string) => {
        try {
            const response = await tryLogin('naver', code);
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
            handleOAuthNaver(code);
        }
    }, [location]);

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default NaverRedirectPage;