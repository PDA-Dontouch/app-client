import { Dispatch, SetStateAction } from "react";
import tw, { styled } from "twin.macro";
import Tag from "./Tag";
import ProgressBar from "./Progressbar";

import Empty from '../../../assets/empty-heart.svg';
import Fill from '../../../assets/fill-heart.svg';

type ProductType = {
  id: number;
  name: string;
  profit_rate: number;
  period: number;
  recruited_cash: number;
  target_cash: number;
  tags: string[];
  image: string; 
};

interface ProductProps {
  data: ProductType;
  isLike: boolean;
  setIsLike: Dispatch<SetStateAction<boolean>>;
}

const Container = styled.div`${tw`flex gap-4 items-center`}`;

const ImgContainer = styled.div`${tw`relative w-fit h-[100px]`}`;

const Img = styled.img`${tw`w-[70px] h-[100px] rounded-8`}`;

const Heart = styled.img`${tw`absolute top-1 left-1`}`;

const ItemContainer = styled.div`
  ${tw`min-w-[240px] flex flex-col gap-2`}
`;

const MainText = styled.span`${tw`text-sm`}`;

const SubContainer = styled.div`${tw`flex gap-3`}`;

const SubText = styled.span`${tw`text-base`}`;

const MiniText = styled.span`${tw`text-xxs`}`;

const Product = ({ data, isLike, setIsLike }: ProductProps) => {
  const percentage = data.recruited_cash / data.target_cash * 100;
  
  return (
    <Container>
      <ImgContainer>
        <Img src={data.image} />
        {isLike ?
          <Heart src={Fill} onClick={() => setIsLike(false)} />
          :
          <Heart src={Empty} onClick={() => setIsLike(true)} />
        }
      </ImgContainer>
      <ItemContainer>
        <MainText>{data.name}</MainText>
        <SubContainer>
          <SubText>{data.profit_rate}%</SubText>
          <SubText>{data.period}개월</SubText>
        </SubContainer>
        <ProgressBar percentage={percentage} />
        <MiniText>
          {data.recruited_cash.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원 
          / {data.target_cash.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</MiniText>
        <Tag tags={data.tags} />
      </ItemContainer>
    </Container>
  );
};

export default Product;