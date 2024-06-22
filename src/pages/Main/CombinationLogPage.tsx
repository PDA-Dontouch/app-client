import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import { useEffect, useState } from 'react';
import MainCombiBox from '../../components/Main/MainCombiBox';
import { CombinationPurchasedType } from '../../types/stocks_product';
import { getCombinationPurchased } from '../../api/stocks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CombinationLogContainer = styled.div`
  ${tw`flex flex-col px-5 pt-14 pb-22 gap-8 w-full`}
  box-sizing: border-box;
`;

const CombinationContainer = styled.div`
  ${tw`flex flex-col gap-7 items-center w-full`}
`;

const Combination = styled.div`
  ${tw`flex flex-col items-start gap-1 w-full`}
  box-sizing:border-box;
`;

const PurchaseDate = styled.div`
  ${tw`text-black40 text-xs`}
`;

export default function CombinationLogPage() {
  const navigate = useNavigate();
  const [stockComb, setStockComb] = useState<CombinationPurchasedType[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const offset = new Date().getTimezoneOffset() * 60000;
  useEffect(() => {
    getCombinationPurchased({ userId: user.user.id, token: user.token }).then(
      (data) => {
        if (data.data.success) {
          data.data.response.sort((a, b) => {
            return new Date(b.date) < new Date(a.date) ? -1 : 1;
          });
          setStockComb(data.data.response);
        }
      },
    );
  }, [user.token, user.user.id]);

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
          {stockComb.map((data, idx) => {
            return (
              <Combination key={idx}>
                <PurchaseDate>
                  {new Date(new Date(data.date).getTime() - offset)
                    .toISOString()
                    .replace('T', ' ')
                    .replace('.000Z', '')}
                </PurchaseDate>
                <MainCombiBox {...data} />
              </Combination>
            );
          })}
        </CombinationContainer>
      </CombinationLogContainer>

      <Footer />
    </>
  );
}
