import tw, { styled } from 'twin.macro';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Calendar from '../../assets/footer/calendar';
import Stock from '../../assets/footer/stock';
import Main from '../../assets/footer/main';
import House from '../../assets/footer/house';
import Energy from '../../assets/footer/energy';

const FooterDiv = styled.div`
  ${tw`flex justify-between bg-white px-6 py-3 fixed left-0 right-0 bottom-0 border-solid border-t border-gray-light`}
`;

const TabDiv = styled.div`
  ${tw`flex flex-col justify-center items-center`}
`;

const TabText = styled.span<{ isSelect: boolean }>`
  ${tw`text-xxs`}
  color: ${({ isSelect }) => (isSelect ? '#457BC3' : '#222222')};
`;

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const tabData = [
    { path: '/calendar', icon: Calendar, label: '캘린더' },
    { path: '/stocks', icon: Stock, label: '배당' },
    { path: '/main', icon: Main, label: '메인' },
    { path: '/estates', icon: House, label: '부동산' },
    { path: '/energy', icon: Energy, label: '에너지' },
  ];

  return (
    <FooterDiv>
      {tabData.map((tab, index) => (
        <TabDiv key={index} onClick={() => navigate(tab.path)}>
          <tab.icon isSelect={currentPath === tab.path} />
          <TabText isSelect={currentPath === tab.path}>{tab.label}</TabText>
        </TabDiv>
      ))}
    </FooterDiv>
  );
};

export default Footer;
