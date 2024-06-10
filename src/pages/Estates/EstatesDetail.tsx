import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import tw, { styled } from "twin.macro";

import useLike from "../../hooks/useLike";
import { AppDispatch, RootState } from "../../store/store";
import { getEstatesData } from "../../store/reducers/estates/estates";
import DetailBanner from "../../components/common/Product/DetailBanner";
import Navbar from "../../components/common/Navbar";
import LikeBtn from "../../components/common/LikeBtn";
import Button from "../../components/common/Button";
import BottomUpModal from "../../components/common/Modal/BottomUpModal";
import ModalItem from "../../components/common/Modal/ModalItem";

const BtnContainer = styled.div`
  ${tw`w-[100%] h-[56px] flex gap-4 px-6 fixed bottom-7 box-border`}
`;

const InfoContainer = styled.div`${tw`w-full flex flex-col gap-6`}`;

const InfoItem = styled.div`${tw`w-full flex flex-col gap-3`}`;

const TextItem = styled.div`${tw`w-full flex flex-col items-center gap-[2px]`}`;

const ModalText = styled.span`${tw`text-xs text-black40`}`;

const Purchase = () => {
  return (
    <InfoContainer>
      <InfoItem>
        <ModalItem title="투자 금액" content="" isModify={true} isStock={false} />
        <ModalItem title="투자 기간" content="8개월" isModify={false} isStock={false} />
        <ModalItem title="기대 수익" content="206,182원 (세후)" isModify={false} isStock={false} />
      </InfoItem>
      <Button name="구매하기" status="estates" onClick={() => {}} />
      <TextItem>
        <ModalText>구매 시 오픈 전까지 취소 가능합니다.</ModalText>
        <ModalText>금액 변경은 취소 후 다시 구매해주십시오.</ModalText>
      </TextItem>
    </InfoContainer>
  );
};

const EstatesDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const detail = useSelector((state: RootState) => state.estates.detail);
  const { likeArr, setLike } = useLike("estates");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEstatesData(parseInt(params.estates_id!)));
  }, [])

  return (
    <>
      <Navbar name="back" type="" onClick={() => navigate('/estates')} />
      <DetailBanner isEstates={true} tags={["태그", "태그", "태그"]} date="2024.05.13" title="의성군 외 총 993.40kW 태양광 담보" />
      <BtnContainer>
        <LikeBtn isLike={likeArr.includes(parseInt(params.estates_id!)) ? true : false} setIsLike={() => setLike(parseInt(params.estates_id!))} />
        <Button name="구매하기" status="estates" onClick={() => setIsOpen(true)} />
      </BtnContainer>
      {isOpen && (
        <BottomUpModal onClose={() => setIsOpen(false)} content={<Purchase />} />
      )}
    </>
  );
};

export default EstatesDetail;