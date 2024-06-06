import tw, { styled } from "twin.macro";

import Logo from '../../assets/logo.svg';
import MyPage from '../../assets/mypage.svg';
import Logout from '../../assets/logout.svg';
import Close from '../../assets/close.svg';
import Back from '../../assets/back.svg';

interface NavbarProps {
  name: string;
  type: string;
}

const NavbarDiv = styled.div`
  ${tw`h-[56px] flex justify-between items-center bg-white px-4 fixed left-0 right-0`}
`

const Item = styled.div`
  ${tw`flex items-center gap-1`}
`

const Img = styled.img`
  ${tw`w-[30px] h-[30px]`}
`

const Text = styled.span`
  ${tw`text-base`}
`

// logo + something = type 'main'
// other = type ''
const Navbar = ({ name, type }: NavbarProps) => {
  return (
    <NavbarDiv>
      {type === 'main' ? 
        <>
          <Img src={Logo} />
          <Item>
            <Img src={name === '로그아웃' ? Logout : MyPage} />
            <Text>{name}</Text>
          </Item>
        </>
      : name === 'back' ? 
        <>
          <Img src={Back} />
          <Item />
        </>
      : 
        <>
          <Item />
          <Img src={Close} />
        </>
      }
    </NavbarDiv>
  );
};

export default Navbar;