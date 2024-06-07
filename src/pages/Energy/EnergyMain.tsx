import tw, { css, styled } from "twin.macro";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import SortButton from "../../components/common/SortButton";
import Product from "../../components/common/Product/Product";
import { useState } from "react";

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
  const [isLike, setIsLike] = useState(false);
  const data = [
    {
      id: 1,
      name: "의성군 외 총 993.40kW 태양광 담보",
      profit_rate: 14.50,
      period: 8,
      recruited_cash: 99000000,
      target_cash: 140000000,
      tags:["수익안정형", "수익안정형", "수익안정형"],
      image: "https://kr1-sec-api-storage.cloud.toast.com/v1/AUTH_f102c9c0b0c1467bb71ee822a2fa9751/solarpublic/prodImage/A000458/2024060310/20240603105542092_580.png", 
    },
    {
      id: 2,
      name: "의성군 외 총 993.40kW 태양광 담보",
      profit_rate: 14.50,
      period: 8,
      recruited_cash: 99000000,
      target_cash: 140000000,
      tags:["수익안정형", "수익안정형", "수익안정형"],
      image: "https://kr1-sec-api-storage.cloud.toast.com/v1/AUTH_f102c9c0b0c1467bb71ee822a2fa9751/solarpublic/prodImage/A000458/2024060310/20240603105542092_580.png", 
    },{
      id: 3,
      name: "의성군 외 총 993.40kW 태양광 담보",
      profit_rate: 14.50,
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
      profit_rate: 14.50,
      period: 8,
      recruited_cash: 99000000,
      target_cash: 140000000,
      tags:["수익안정형", "수익안정형", "수익안정형"],
      image: "https://kr1-sec-api-storage.cloud.toast.com/v1/AUTH_f102c9c0b0c1467bb71ee822a2fa9751/solarpublic/prodImage/A000458/2024060310/20240603105542092_580.png", 
    },
  ]
  const list = [];

  return (
    <>
      <Navbar name="박유진" type="main" />
      <Container>
        <MainText>신재생에너지</MainText>
        <BtnContainer>
          <SortButton isSelect={true} title="최신순" />
          <SortButton isSelect={false} title="수익률순" />
        </BtnContainer>
        <ItemContainer>
          <SubText>모집 중</SubText>
          {data.map((item, idx) => 
            <div key={item.id}>
              <Product data={item} isLike={isLike} setIsLike={setIsLike} />
            </div>
          )}
        </ItemContainer>
      </Container>
      <Footer />
    </>
  );
};

export default EnergyMain;