import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import CombiBox, { StockType } from '../../components/common/Stock/CombiBox';
import { ItemType } from '../../components/common/Stock/StockContainer';
import GreenBarTitle from '../../components/common/GreenBarTitle';

const CombinationLogContainer = styled.div`
  ${tw`flex flex-col px-5 pt-14 pb-22 gap-8 w-full`}
  box-sizing: border-box;
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

const dummyData1: ItemType = {
  code: '005931',
  name: '삼성전자',
  price: 60000,
  amount: 50,
  total_price: 3000000,
  growth_score: 50,
  safe_score: 50,
  dividend_score: 50,
  personalized_score: 50,
};

const dummyData2: ItemType = {
  code: '005932',
  name: '삼성전자',
  price: 60000,
  amount: 50,
  total_price: 3000000,
  growth_score: 50,
  safe_score: 50,
  dividend_score: 50,
  personalized_score: 50,
};

const stocks: ItemType[] = [dummyData, dummyData1, dummyData2];
const stocks1: ItemType[] = [dummyData, dummyData1, dummyData2];
const stocks2: ItemType[] = [dummyData, dummyData1, dummyData2];

const stockComb: StockType = {
  combination1: {
    diviend_income: 1000,
    stocks: stocks,
  },
  combination2: {
    diviend_income: 1000,
    stocks: stocks1,
  },
  combination3: {
    diviend_income: 1000,
    stocks: stocks2,
  },
};

export default function CombinationLogPage() {
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
      <CombinationLogContainer>
        <GreenBarTitle text="구매 조합 내역" />
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
      </CombinationLogContainer>

      <Footer />
    </>
  );
}
