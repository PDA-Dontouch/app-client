import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import StockP2P from '../../components/My/StockP2P';
import { MyStockProductType } from '../../components/My/MyStockProduct';
import { MyP2PProductType } from '../../components/My/MyP2PProduct';
import Footer from '../../components/common/Footer';

const MyLikePageContainer = styled.div`
  ${tw`flex flex-col px-5 pt-14 pb-22 w-full`}
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  ${tw`flex flex-row items-end px-2  py-5 w-full`}
  box-sizing: border-box;
`;

const Title = styled.div`
  ${tw`flex flex-col h-full text-xl`}
  position:relative;
`;

const GreenBar = styled.div`
  position: absolute;
  bottom: 0;
  ${tw`h-1/2 w-full`};
  background-color: #1aa76e66;
`;

const koreaData: MyStockProductType[] = [
  {
    code: '005930',
    name: '삼성전자',
    price: 60000,
    compare: 1.1,
  },
  {
    code: '000080',
    name: '하이트진로',
    price: 60000,
    compare: -1.1,
  },
];

const usaData: MyStockProductType[] = [
  {
    code: 'TSLA',
    name: '테슬라',
    price: 60000,
    compare: -1.1,
  },
];

const energyData: MyP2PProductType[] = [
  {
    img: '',
    name: '디지털복합단지 럭셔리타워 신축 2호 4차',
    annualRate: 13.0,
    monthlyDividend: 63800,
    openDate: new Date(2024, 6, 30),
  },
  {
    img: '',
    name: '디지털복합단지 럭셔리타워 신축 2호 4차',
    annualRate: 13.0,
    monthlyDividend: 63800,
    openDate: new Date(2024, 4, 30),
  },
];

const estateData: MyP2PProductType[] = [
  {
    img: '',
    name: '의성군 외 총 993.40kW 태양광 담보',
    annualRate: 13.0,
    monthlyDividend: 270000,
    openDate: new Date(2024, 6, 30),
  },
  {
    img: '',
    name: '의성군 외 총 993.40kW 태양광 담보',
    annualRate: 13.0,
    monthlyDividend: 63800,
    openDate: new Date(2024, 4, 30),
  },
];

export default function MyLikePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        name="back"
        type="back"
        onClick={() => {
          navigate(-1);
        }}
      ></Navbar>
      <MyLikePageContainer>
        <TitleContainer>
          <Title>
            관심종목
            <GreenBar />
          </Title>
        </TitleContainer>
        <StockP2P
          type="like"
          usaData={usaData}
          koreaData={koreaData}
          energyData={energyData}
          estateData={estateData}
        />
      </MyLikePageContainer>
      <Footer />
    </>
  );
}
