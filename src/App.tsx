import './App.css';
import SocialLogin from './components/common/SocialLogin'
import Kakao from './assets/kakao.svg';

function App() {
  return (
    <>
      <SocialLogin url={Kakao} name='Kakao' />
    </>
  )
}

export default App
