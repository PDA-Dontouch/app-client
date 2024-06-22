import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectedPage = () => {
    const location = useLocation();
  
    useEffect(() => {
      const fetchToken = async () => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
  
        if (code) {
          try {
            const response = await axios.get(`http://8081/api/oauth/kakao/callback?code=${code}`);
            const token = response.data.data; // ApiUtils.success(token)로 반환된 토큰
            console.log(token);
            //localStorage.setItem('jwtToken', token);
  
            // Redirect to the desired page after login
            window.location.href = '/';
          } catch (error) {
            console.error('로그인 실패:', error);
            // 로그인 실패 처리
          }
        }
      };
  
      fetchToken();
    }, [location]);
  
    return <div>로그인 중...</div>;
};

export default KakaoRedirectedPage;