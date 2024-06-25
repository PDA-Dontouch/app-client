import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../store/reducers/auth/auth';
import { AppDispatch } from '../../store/store';
import StockSkeleton from '../../components/Skeleton/StockSkeleton';

const KakaoRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleOAuthKakao = async (getCode: string) => {
    try {
      const snsType = 'kakao';
      const code = getCode;
      //카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
      return await dispatch(postLogin({ snsType, code })).unwrap();
    } catch (err) {
      navigate('/');
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code'); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
    if (code) {
      handleOAuthKakao(code).then((loginUser) => {
        if (loginUser.user.safeScore === 0)
          navigate('/typetest', { state: { nav: false } });
        else navigate('/main');
      });
    }
  }, [location]);

  return <StockSkeleton />;
};

export default KakaoRedirectPage;
