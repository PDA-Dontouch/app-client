import tw, { styled } from "twin.macro";

import Logo from '../../../assets/logo.svg';
import MyPage from '../../../assets/mypage.svg';
import Logout from '../../../assets/logout.svg';

interface NavbarProps {
  name: string;
  type: string;
}

const Navbar = styled.div`
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

const NavbarMain = ({ name, type }: NavbarProps) => {
  return (
    <Navbar>
      <Img src={Logo} />
      <Item>
        <Img src={type === 'mypage' ? MyPage : Logout} />
        <Text>{name}</Text>
      </Item>
    </Navbar>
  );
};

export default NavbarMain;