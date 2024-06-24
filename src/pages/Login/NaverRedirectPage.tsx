import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { tryLogin } from '../../api/auth';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { postLogin } from '../../store/reducers/auth/auth';

const NaverRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    
    const handleOAuthNaver = async (getCode:string) => {
        try {
            const snsType = 'naver';
            const code = getCode;
            //네이버로부터 받아온 code를 서버에 전달하여 네이버로 회원가입 & 로그인한다
            return await dispatch(postLogin({ snsType, code })).unwrap();
        } catch (err) {
            navigate("/fail");
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');  // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            handleOAuthNaver(code).then(()=>{
                navigate('/typetest',{ state: { nav: false } });
            });
        }
    }, [location]);

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default NaverRedirectPage;