import tw, { css, styled } from 'twin.macro';

import Logo from '../../assets/logo.svg';
import MyPage from '../../assets/mypage.svg';
import Logout from '../../assets/logout.svg';
import Close from '../../assets/close.svg';
import Back from '../../assets/back.svg';
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  name: string;
  type: string;
  onClick: () => void;
}

const NavbarDiv = styled.div`
  ${tw`h-[56px] flex justify-between items-center bg-white px-4 fixed left-0 right-0 top-0`}
  ${css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    z-index: 10;
  `}
`;

const Item = styled.div`
  ${tw`flex items-center gap-1`}
`;

const Img = styled.img`
  ${tw`w-[30px] h-[30px]`}
`;

const Text = styled.span`
  ${tw`text-base`}
`;

// logo + something = type 'main'
// other = type ''
const Navbar = ({ name, type, onClick }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <NavbarDiv>
      {type === 'main' ? (
        <>
          <Img src={Logo} onClick={() => navigate('/')} />
          <Item>
            <Img src={name === '로그아웃' ? Logout : MyPage} onClick={onClick} />
            <Text>{name}</Text>
          </Item>
        </>
      ) : name === 'back' ? (
        <>
          <Img src={Back} onClick={onClick} />
          <Item />
        </>
      ) : (
        <>
          <Item />
          <Img src={Close} onClick={onClick} />
        </>
      )}
    </NavbarDiv>
  );
};

export default Navbar;
