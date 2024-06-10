import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import tw, { css, styled } from "twin.macro";

import useLike from "../../hooks/useLike";
import { AppDispatch, RootState } from "../../store/store";
import { getEstatesData } from "../../store/reducers/estates/estates";
import DetailBanner from "../../components/common/Product/DetailBanner";
import Navbar from "../../components/common/Navbar";
import LikeBtn from "../../components/common/LikeBtn";
import Button from "../../components/common/Button";
import BottomUpModal from "../../components/common/Modal/BottomUpModal";
import Purchase from "../../components/common/Product/Purchase";
import Cancel from "../../components/common/Product/Cancel";

const Container = styled.div`${tw`h-full overflow-y-scroll`}`;

const BtnContainer = styled.div`
  ${tw`w-[100%] h-[56px] flex gap-4 px-6 fixed bottom-7 box-border`}
`;

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
      <Container>
        <DetailBanner isEstates={true} tags={["태그", "태그", "태그"]} date="2024.05.13" title="의성군 외 총 993.40kW 태양광 담보" />
        
      </Container>
      <BtnContainer>
        <LikeBtn isLike={likeArr.includes(parseInt(params.estates_id!)) ? true : false} setIsLike={() => setLike(parseInt(params.estates_id!))} />
        <Button name="구매하기" status="estates" onClick={() => setIsOpen(true)} />
      </BtnContainer>
      {isOpen && (
        <BottomUpModal onClose={() => setIsOpen(false)} content={<Purchase period="6" profit='205,100' btnType="estates" />} />
        // <BottomUpModal onClose={() => setIsOpen(false)} content={<Cancel amount={5000000} period={6} profit={205100} btnType="plain" />} />
      )}
    </>
  );
};

export default EstatesDetail;