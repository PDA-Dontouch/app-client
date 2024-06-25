import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { postLogin } from '../../store/reducers/auth/auth';
import StockSkeleton from '../../components/Skeleton/StockSkeleton';

const NaverRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleOAuthNaver = async (getCode: string) => {
    try {
      const snsType = 'naver';
      const code = getCode;
      //네이버로부터 받아온 code를 서버에 전달하여 네이버로 회원가입 & 로그인한다
      return await dispatch(postLogin({ snsType, code })).unwrap();
    } catch (err) {
      navigate('/fail');
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code'); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
    if (code) {
      handleOAuthNaver(code).then((loginUser) => {
        if (loginUser.user.safeScore === 0)
          navigate('/typetest', { state: { nav: false } });
        else navigate('/');
      });
    }
  }, [location]);

  return <StockSkeleton />;
};

export default NaverRedirectPage;
