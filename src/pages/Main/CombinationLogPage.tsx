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
  ${tw`flex flex-col gap-7 p-2`}
  height: 600px;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const Combination = styled.div`
  ${tw`flex flex-col items-start gap-1 w-full`}
  box-sizing: border-box;
`;

const PurchaseDate = styled.div`
  ${tw`text-black40 text-xs ms-2`}
`;

export default function CombinationLogPage() {
  const navigate = useNavigate();
  const [stockComb, setStockComb] = useState<CombinationPurchasedType[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const offset = new Date().getTimezoneOffset() * 60000;
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollStdRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // 데이터를 더 불러올 수 있는지 확인하는 상태

  useEffect(() => {
    setIsFetching(true);
    getCombinationPurchased({ userId: user.user.id, page: 0, size: 2 }).then(
      (data) => {
        if (data.data.success) {
          const sortedData = data.data.response;
          const uniqueData = removeDuplicateDates(sortedData);
          setStockComb(uniqueData);
          setPage(1);
          setHasMore(uniqueData.length > 0);
        }
        setIsFetching(false);
      },
    );
  }, [user.user.id]);

  function getCombi(page: number) {
    setIsFetching(true);
    getCombinationPurchased({ userId: user.user.id, page: page, size: 2 }).then(
      (data) => {
        if (data.data.success) {
          const newCombinations = data.data.response;
          const combinedData = [...stockComb, ...newCombinations];
          const uniqueData = removeDuplicateDates(combinedData);
          setStockComb(uniqueData);
          setPage(page + 1);
          setHasMore(newCombinations.length > 0);
        }
        setIsFetching(false);
      },
    );
  }

  function removeDuplicateDates(data: CombinationPurchasedType[]) {
    const uniqueData = data.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.date === item.date),
    );
    return uniqueData;
  }

  function onScrollHandler() {
    if (scrollRef.current && scrollStdRef.current && !isFetching && hasMore) {
      const stdRef = scrollStdRef.current.getBoundingClientRect();
      const sRef = scrollRef.current.getBoundingClientRect();
      if (stdRef.bottom >= sRef.bottom - 10) {
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
                <PurchaseDate>{data.date.toString()}</PurchaseDate>
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
