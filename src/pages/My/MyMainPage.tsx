import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import fillHeart from '../../assets/fill-heart.svg';
import arrow from '../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';
import StockP2P from '../../components/My/StockP2P';
import { MyStockProductType } from '../../components/My/MyStockProduct';
import { MyP2PProductType } from '../../components/My/MyP2PProduct';

type TitleNameProps = {
  type: 'name' | 'nim';
};

const MyMainPageContainer = styled.div`
  ${tw`flex flex-col gap-5 px-5 pt-14 pb-22 w-full`}
  box-sizing: border-box;
`;

const InfoSection = styled.div`
  ${tw`flex flex-col w-full gap-7 py-5`}
  box-sizing: border-box;
`;

const TitleNameContainer = styled.div`
  ${tw`flex flex-row items-end px-2 w-full`}
  box-sizing: border-box;
`;

const TitleName = styled.div<TitleNameProps>`
  ${({ type }) => (type === 'name' ? tw`text-xl` : tw`text-base`)}
  ${tw`flex flex-col h-full`}
`;

const TitleInvestmentType = styled.div`
  ${tw`text-xl`}
  position: relative;
`;

const GreenBar = styled.div`
  position: absolute;
  bottom: 0;
  ${tw`h-1/2 w-full`};
  background-color: #1aa76e66;
`;

const GreenBox = styled.div`
  ${tw`flex flex-row justify-between bg-green w-full`}
  border-radius: 12px;
  padding: 26px 20px;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.15);
`;

const TotalAssetContainer = styled.div`
  ${tw`text-white flex flex-col gap-3 `}
`;

const TotalAssetTitle = styled.div`
  ${tw`text-sm`}
`;

const TotalAssetNumber = styled.div`
  font-size: 26px;
  font-weight: 500;
`;

const LikeContainer = styled.div`
  ${tw`flex flex-col justify-center items-center bg-white gap-1 p-3`}
  border-radius: 12px;
  box-sizing: border-box;
`;

const LikeHeartImg = styled.img`
  width: 26px;
  height: 26px;
`;

const LikeText = styled.div`
  ${tw`text-xxs`}
`;

const AssetDetailContainer = styled.div`
  ${tw`flex flex-col gap-5 w-full bg-gray-light text-sm`}
  box-sizing: border-box;
  border-radius: 12px;
  padding: 26px 20px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.15);
`;

const AssetDetail = styled.div`
  ${tw`flex flex-row justify-between`}
`;

const AssetDetailType = styled.div``;

const AssetDetailNumber = styled.div`
  font-weight: 600;
`;

const ProductHeldContainer = styled.div`
  ${tw`flex flex-col gap-6`}
`;

const ProductHeldTitleContainer = styled.div`
  ${tw`flex flex-row justify-between items-center w-full`}
`;

const ProductHeldTitle = styled.div`
  ${tw`text-lg`}
`;

const GoToCombinationLog = styled.div`
  ${tw`flex flex-row justify-center items-center gap-2 text-sm`}
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

export default function MyMainPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar name="로그아웃" type="main" onClick={() => {}}></Navbar>
      <MyMainPageContainer>
        <InfoSection>
          <TitleNameContainer>
            <TitleName type="name">박유진</TitleName>
            <TitleInvestmentType>
              <GreenBar></GreenBar>
              (공격투자형)
            </TitleInvestmentType>
            <TitleName type="nim">님</TitleName>
          </TitleNameContainer>
          <GreenBox>
            <TotalAssetContainer>
              <TotalAssetTitle>박유진님의 총자산</TotalAssetTitle>
              <TotalAssetNumber>
                {(6045200).toLocaleString()}원
              </TotalAssetNumber>
            </TotalAssetContainer>
            <LikeContainer
              onClick={() => {
                navigate('/mypage/like');
              }}
            >
              <LikeHeartImg src={fillHeart} />
              <LikeText>관심 종목</LikeText>
            </LikeContainer>
          </GreenBox>
          <AssetDetailContainer>
            <AssetDetail>
              <AssetDetailType>입출금</AssetDetailType>
              <AssetDetailNumber>
                {(4003000).toLocaleString()}원
              </AssetDetailNumber>
            </AssetDetail>
            <AssetDetail>
              <AssetDetailType>주식</AssetDetailType>
              <AssetDetailNumber>
                {(634320).toLocaleString()}원
              </AssetDetailNumber>
            </AssetDetail>
            <AssetDetail>
              <AssetDetailType>부동산 P2P</AssetDetailType>
              <AssetDetailNumber>
                {(982400).toLocaleString()}원
              </AssetDetailNumber>
            </AssetDetail>
            <AssetDetail>
              <AssetDetailType>신재생 P2P</AssetDetailType>
              <AssetDetailNumber>
                {(425480).toLocaleString()}원
              </AssetDetailNumber>
            </AssetDetail>
          </AssetDetailContainer>
        </InfoSection>
        <ProductHeldContainer>
          <ProductHeldTitleContainer>
            <ProductHeldTitle>보유 상품</ProductHeldTitle>
            <GoToCombinationLog
              onClick={() => {
                navigate('/mypage/purchase');
              }}
            >
              조합 내역 보러가기
              <img src={arrow} />
            </GoToCombinationLog>
          </ProductHeldTitleContainer>
          <StockP2P
            type="held"
            usaData={usaData}
            koreaData={koreaData}
            energyData={energyData}
            estateData={estateData}
          />
        </ProductHeldContainer>
      </MyMainPageContainer>
      <Footer />
    </>
  );
}
