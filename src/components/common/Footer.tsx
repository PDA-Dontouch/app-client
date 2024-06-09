import tw, { styled } from "twin.macro";

import Calendar from '../../assets/footer/calendar.svg';
import Stock from '../../assets/footer/stock.svg';
import Main from '../../assets/footer/main.svg';
import House from '../../assets/footer/house.svg';
import Energy from '../../assets/footer/energy.svg';

const FooterDiv = styled.div`
  ${tw`flex justify-between bg-white px-6 py-3 fixed left-0 right-0 bottom-0 border-solid border-t border-gray-light`}
`

const TabDiv = styled.div`
  ${tw`flex flex-col justify-center items-center`}
`

const TabText = styled.span`
  ${tw`text-xxs`}
`

const Footer = () => {
  return (
    <FooterDiv>
      <TabDiv>
        <img src={Calendar} />
        <TabText>캘린더</TabText>
      </TabDiv>
      <TabDiv>
        <img src={Stock} />
        <TabText>배당</TabText>
      </TabDiv>
      <TabDiv>
        <img src={Main} />
        <TabText>메인</TabText>
      </TabDiv>
      <TabDiv>
        <img src={House} />
        <TabText>부동산</TabText>
      </TabDiv>
      <TabDiv>
        <img src={Energy} />
        <TabText>에너지</TabText>
      </TabDiv>
    </FooterDiv>
  );
};

export default Footer;