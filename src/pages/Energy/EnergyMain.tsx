import { useDispatch, useSelector } from "react-redux";
import tw, { css, styled } from "twin.macro";

import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import SortButton from "../../components/common/SortButton";
import Product from "../../components/common/Product/Product";

import { addLikeEnergy, delEnergyLike, delLikeEnergy, getEnergyDatas, setEnergyLike } from "../../store/reducers/energy/energy";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomUpModal from "../../components/common/Modal/BottomUpModal";

const Container = styled.div`
  ${tw`w-[calc(100% - 56px)] mt-14 mb-16 px-7 py-8 flex flex-col gap-5`}
`;

const BtnContainer = styled.div`
  ${tw`flex w-full h-fit justify-end gap-3`}
`;

const MainText = styled.span`
  ${tw`w-fit text-xl`}
  ${css`
    box-shadow: inset 0 -10px 0 rgba(82, 147, 208, 0.5);
    line-height: 26px;
  `}
`;

const SubText = styled.span`${tw`text-lg`}`;

const ItemContainer = styled.div`
  ${tw`flex flex-col gap-8`}
`;

const EnergyMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const energyDatas = useSelector((state: RootState) => state.energy.datas);
  const [sortByProfit, setSortByProfit] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEnergyDatas());
  }, [])

  const sortDataByProfit = () => {
    setSortByProfit(!sortByProfit);
  };

  const data = [
    {
      id: 1,
      name: "의성군 외 총 993.40kW 태양광 담보",
      profit_rate: 6.50,
      period: 8,
      recruited_cash: 99000000,
      target_cash: 140000000,
      tags:["수익안정형", "수익안정형", "수익안정형"],
      image: "https://kr1-sec-api-storage.cloud.toast.com/v1/AUTH_f102c9c0b0c1467bb71ee822a2fa9751/solarpublic/prodImage/A000458/2024060310/20240603105542092_580.png", 
    },
    {
      id: 2,
      name: "의성군 외 총 993.40kW 태양광 담보",
      profit_rate: 10.50,
      period: 8,
      recruited_cash: 99000000,
      target_cash: 140000000,
      tags:["수익안정형", "수익안정형", "수익안정형"],
      image: "https://kr1-sec-api-storage.cloud.toast.com/v1/AUTH_f102c9c0b0c1467bb71ee822a2fa9751/solarpublic/prodImage/A000458/2024060310/20240603105542092_580.png", 
    },{
      id: 3,
      name: "의성군 외 총 993.40kW 태양광 담보",
      profit_rate: 12.50,
      period: 8,
      recruited_cash: 99000000,
      target_cash: 140000000,
      tags:["수익안정형", "수익안정형", "수익안정형"],
      image: "https://kr1-sec-api-storage.cloud.toast.com/v1/AUTH_f102c9c0b0c1467bb71ee822a2fa9751/solarpublic/prodImage/A000458/2024060310/20240603105542092_580.png", 
    },{
      id: 4,
      name: "의성군 외 총 993.40kW 태양광 담보",
      profit_rate: 14.50,
      period: 8,
      recruited_cash: 99000000,
      target_cash: 140000000,
      tags:["수익안정형", "수익안정형", "수익안정형"],
      image: "https://kr1-sec-api-storage.cloud.toast.com/v1/AUTH_f102c9c0b0c1467bb71ee822a2fa9751/solarpublic/prodImage/A000458/2024060310/20240603105542092_580.png", 
    },{
      id: 5,
      name: "의성군 외 총 993.40kW 태양광 담보",
      profit_rate: 16.50,
      period: 8,
      recruited_cash: 99000000,
      target_cash: 140000000,
      tags:["수익안정형", "수익안정형", "수익안정형"],
      image: "https://kr1-sec-api-storage.cloud.toast.com/v1/AUTH_f102c9c0b0c1467bb71ee822a2fa9751/solarpublic/prodImage/A000458/2024060310/20240603105542092_580.png", 
    },
  ]

  const sortedData = sortByProfit ? [...data].sort((a, b) => b.profit_rate - a.profit_rate) : data;
  // const sortedData = sortByProfit ? [...energyDatas].sort((a, b) => b.profit_rate - a.profit_rate) : energyDatas;

  const likeArr = useSelector((state: RootState) => state.energy.likes);

  const setLike = (energy_id: number) => {
    if (likeArr.includes(energy_id)) {
      dispatch(delEnergyLike(energy_id));
      // const data = {
      //   token: "token",
      //   energy_id: energy_id
      // }

      // dispatch(delLikeEnergy(data))
      //   .then((res) => {
      //     if (res.payload.success === true) {
      //       dispatch(delEnergyLike(energy_id));
      //     }
      //   })
    } else {
      dispatch(setEnergyLike(energy_id));
      // const data = {
      //   token: "token",
      //   energy_id: energy_id
      // }
  
      // dispatch(addLikeEnergy(data))
      //   .then((res) => {
      //     if (res.payload.success === true) {
      //       dispatch(setEnergyLike(energy_id));
      //     }
      //   })
    }
  }

  return (
    <>
      <Navbar name="박유진" type="main" />
      <Container>
        <MainText>신재생에너지</MainText>
        <BtnContainer>
          <SortButton isEstates={false} isSelect={!sortByProfit} title="최신순" onClick={() => setSortByProfit(false)} />
          <SortButton isEstates={false} isSelect={sortByProfit} title="수익률순" onClick={sortDataByProfit} />
        </BtnContainer>
        <ItemContainer>
          <SubText>모집 중</SubText>
          {sortedData.map((item, idx) => 
            <div key={item.id}>
              <Product isEstates={false} data={item} isLike={likeArr.includes(item.id) ? true : false} setIsLike={() => setLike(item.id)} />
            </div>
          )}
        </ItemContainer>
      </Container>
      <Footer />
    </>
  );
};

export default EnergyMain;