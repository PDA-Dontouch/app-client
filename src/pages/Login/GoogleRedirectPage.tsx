import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const GoogleRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthGoogle = async (code:string) => {
        try {
            // 네이버로부터 받아온 code를 서버에 전달하여 회원가입 & 로그인한다
            const response = await axios.get(``);
            const data = response.data; // 응답 데이터
            console.log(data);
            navigate("/");
        } catch (error) {
            navigate("/fail");
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code'); 
        if (code) {
            console.log(code)
            handleOAuthGoogle(code);
        }
    }, [location]);

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default GoogleRedirectPage;