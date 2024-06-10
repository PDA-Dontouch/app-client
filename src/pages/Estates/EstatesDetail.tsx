import { useNavigate, useParams } from "react-router-dom";
import DetailBanner from "../../components/common/Product/DetailBanner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getEstatesData } from "../../store/reducers/estates/estates";
import Navbar from "../../components/common/Navbar";

const EstatesDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const detail = useSelector((state: RootState) => state.estates.detail);

  useEffect(() => {
    dispatch(getEstatesData(parseInt(params.estates_id!)));
  }, [])

  return (
    <>
      <Navbar name="back" type="" onClick={() => navigate('/estates')} />
      <DetailBanner isEstates={false} tags={["태그", "태그", "태그"]} date="2024.05.13" title="의성군 외 총 993.40kW 태양광 담보" />
    </>
  );
};

export default EstatesDetail;