import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import CombiBox, { StockType } from '../../components/common/Stock/CombiBox';
import { ItemType } from '../../components/common/Stock/StockContainer';

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

const CombinationContainer = styled.div`
  ${tw`flex flex-col gap-7`}
`;

const Combination = styled.div`
  ${tw`flex flex-col items-start gap-1 w-fit px-3`}
`;

const PurchaseDate = styled.div`
  ${tw`text-black40 text-xs`}
`;

const dummyData: ItemType = {
  code: '005930',
  name: '삼성전자',
  price: 60000,
  amount: 50,
  total_price: 3000000,
  growth_score: 50,
  safe_score: 50,
  dividend_score: 50,
  personalized_score: 50,
};

const stocks: ItemType[] = [dummyData, dummyData, dummyData];

const stockComb: StockType = {
  combination1: {
    diviend_income: 1000,
    stocks: stocks,
  },
  combination2: {
    diviend_income: 1000,
    stocks: stocks,
  },
  combination3: {
    diviend_income: 1000,
    stocks: stocks,
  },
};

export default function MyPurchasePage() {
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
            구매 조합 내역
            <GreenBar />
          </Title>
        </TitleContainer>
        <CombinationContainer>
          <Combination>
            <PurchaseDate>2024.03.06 12:56:30</PurchaseDate>
            <CombiBox data={stockComb} />
          </Combination>
          <Combination>
            <PurchaseDate>2024.03.06 12:56:30</PurchaseDate>
            <CombiBox data={stockComb} />
          </Combination>
        </CombinationContainer>
      </MyLikePageContainer>

      <Footer />
    </>
  );
}
