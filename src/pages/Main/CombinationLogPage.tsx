import tw, { styled } from 'twin.macro';
import Navbar from '../../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import GreenBarTitle from '../../components/common/GreenBarTitle';
import { useEffect, useRef, useState } from 'react';
import MainCombiBox from '../../components/Main/MainCombiBox';
import { CombinationPurchasedType } from '../../types/stocks_product';
import { getCombinationPurchased } from '../../api/stocks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CombinationLogContainer = styled.div`
  ${tw`flex flex-col px-5 py-22 gap-8 w-full h-[100vh]`}
  box-sizing: border-box;
`;

const CombinationContainer = styled.div`
  ${tw`flex flex-col gap-7 px-2`}
  height: 600px;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const Combination = styled.div`
  ${tw`flex flex-col items-start gap-1 w-full`}
  box-sizing: border-box;
`;

const PurchaseDate = styled.div`
  ${tw`text-black40 text-xs`}
`;

export default function CombinationLogPage() {
  const navigate = useNavigate();
  const [stockComb, setStockComb] = useState<CombinationPurchasedType[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const offset = new Date().getTimezoneOffset() * 60000;
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollStdRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    getCombinationPurchased({ userId: user.user.id, page: 0, size: 2 }).then(
      (data) => {
        if (data.data.success) {
          data.data.response.sort((a, b) => {
            return new Date(b.date) < new Date(a.date) ? -1 : 1;
          });
          setStockComb(data.data.response);
        }
      },
    );
  }, [user.user.id]);

  function getCombi(page: number) {
    getCombinationPurchased({ userId: user.user.id, page: page, size: 2 }).then(
      (data) => {
        if (data.data.success) {
          data.data.response.sort((a, b) => {
            return new Date(b.date) < new Date(a.date) ? -1 : 1;
          });
          setStockComb((prev) => [...prev, ...data.data.response]);
          setPage(page + 1);
        }
      },
    );
  }

  function onScrollHandler() {
    if (scrollRef.current && scrollStdRef.current) {
      const stdRef = scrollStdRef.current.getBoundingClientRect();
      const sRef = scrollRef.current.getBoundingClientRect();
      if (stdRef.bottom >= sRef.bottom - 1) {
        getCombi(page);
      }
    }
  }

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
        <CombinationContainer ref={scrollStdRef} onScroll={onScrollHandler}>
          <GreenBarTitle text="구매 조합 내역" />
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
          <div ref={scrollRef}></div>
        </CombinationContainer>
      </CombinationLogContainer>
      <Footer />
    </>
  );
}
