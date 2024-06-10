import { useNavigate, useParams } from "react-router-dom";
import DetailBanner from "../../components/common/Product/DetailBanner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getEstatesData } from "../../store/reducers/estates/estates";
import Navbar from "../../components/common/Navbar";
import LikeBtn from "../../components/common/LikeBtn";
import Button from "../../components/common/Button";
import tw, { styled } from "twin.macro";
import useLike from "../../hooks/useLike";

const BtnContainer = styled.div`
  ${tw`w-[100%] h-[60px] flex gap-4 px-6 fixed bottom-7 box-border`}
`;

const EstatesDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const detail = useSelector((state: RootState) => state.estates.detail);
  const { likeArr, setLike } = useLike("estates");

  useEffect(() => {
    dispatch(getEstatesData(parseInt(params.estates_id!)));
  }, [])

  return (
    <>
      <Navbar name="back" type="" onClick={() => navigate('/estates')} />
      <DetailBanner isEstates={true} tags={["태그", "태그", "태그"]} date="2024.05.13" title="의성군 외 총 993.40kW 태양광 담보" />
      <BtnContainer>
        <LikeBtn isLike={likeArr.includes(parseInt(params.estates_id!)) ? true : false} setIsLike={() => setLike(parseInt(params.estates_id!))} />
        <Button name="구매하기" status="estates" onClick={() => {}} />
      </BtnContainer>
    </>
  );
};

export default EstatesDetail;