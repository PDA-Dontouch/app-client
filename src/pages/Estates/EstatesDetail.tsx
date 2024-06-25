import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import tw, { css, styled } from 'twin.macro';

import { AppDispatch, RootState } from '../../store/store';
import {
  addLikeEstate,
  addLikeEstates,
  buyEstates,
  delLikeEstates,
  getEstatesData,
  getLikeEstates,
  removeLikeEstate,
  sellEstates,
} from '../../store/reducers/estates/estates';
import DetailBanner from '../../components/Estates/DetailBanner';
import Navbar from '../../components/common/Navbar';
import LikeBtn from '../../components/common/LikeBtn';
import Button from '../../components/common/Button';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import Purchase from '../../components/common/Product/Detail/Purchase';
import Cancel from '../../components/common/Product/Detail/Cancel';
import Dropdown from '../../components/common/Dropdown';
import DetailInfo from '../../components/Estates/DetailInfo';
import BasicInfo from '../../components/Estates/BasicInfo';
import InvestPoint from '../../components/Estates/InvestPoint';
import ExpertCheck from '../../components/Estates/ExpertCheck';
import { getHoldingEstates } from '../../store/reducers/estates/holding';
import {
  EstateBuyType,
  EstatesList,
  clickEstates,
} from '../../types/estates_product';
import CollateralStability from '../../components/Estates/CollateralStability';
import ScrollToTop from '../../hooks/ScrollToTop';

interface BuyEstatesResponse {
  data: {
    success: boolean;
    response: string | boolean;
    error: {
      errorMessage: string;
      httpStatus: string;
    } | null;
  };
}

const Container = styled.div`
  ${tw`w-full pt-14 pb-20`}
`;

const BtnContainer = styled.div`
  ${tw`w-[100%] h-[56px] flex gap-4 px-6 fixed bottom-4 box-border z-[99]`}
`;

const Hr = styled.div`
  ${tw`w-full h-2 bg-gray-light`}
`;

const EstatesDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const detail = useSelector((state: RootState) => state.estates.detail);
  const clickData = useSelector(
    (state: RootState) => state.estates.clickEstates,
  );
  const holdingEstates = useSelector(
    (state: RootState) => state.holdingEstates.datas,
  );
  const userId = useSelector((state: RootState) => state.user.user.id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const likeArr = useSelector((state: RootState) => state.estates.estatesLike);

  useEffect(() => {
    dispatch(getEstatesData(parseInt(params.estates_id!)));
    dispatch(getHoldingEstates(userId));
    dispatch(getLikeEstates(userId));
  }, [dispatch, params.estates_id]);

  let isEstateHeld = false;
  let matchingEstate = null;

  if (holdingEstates && holdingEstates.length > 0) {
    isEstateHeld = holdingEstates.some(
      (estate) => estate.estateId === detail.estateId,
    );

    matchingEstate = holdingEstates.find(
      (estate) => estate.estateId === detail.estateId,
    );
  }

  const clickBuyBtn = () => {
    if (value < 5000) {
      setError('최소 투자 금액은 5천원입니다.');
    } else {
      const data: EstateBuyType = {
        userId: userId,
        estateFundId: clickData.id,
        inputCash: value,
        estateName: clickData.title,
        estateEarningRate: clickData.earningRate,
      };

      dispatch(buyEstates(data)).then((res) => {
        if ((res.payload as BuyEstatesResponse).data.success) {
          navigate('/result/estate');
        } else {
          // 임시 에러 처리
          alert((res.payload as BuyEstatesResponse).data.error?.errorMessage);
        }
      });
    }
  };

  const clickCancleBtn = async () => {
    const data = {
      userId: userId,
      estateFundId: clickData.id,
      inputCash: matchingEstate?.inputCash || 0,
      estateName: clickData.title,
      estateEarningRate: clickData.earningRate,
    };

    dispatch(sellEstates(data)).then((res) => {
      if ((res.payload as BuyEstatesResponse).data.success) {
        navigate('/result/sell');
      }
    });
  };

  const handleLikeToggle = async (item: EstatesList) => {
    const data = {
      userId: userId,
      estateFundId: item.id,
    };

    const isLiked = likeArr.includes(item.id);

    if (isLiked) {
      dispatch(removeLikeEstate(item.id));
      await dispatch(delLikeEstates(data));
    } else {
      dispatch(addLikeEstate(item.id));
      await dispatch(addLikeEstates(data));
    }
  };

  return (
    <>
      <Navbar name="back" type="" onClick={() => window.history.back()} />
      <ScrollToTop />
      <Container>
        <DetailBanner isEstates={true} data={detail} />
        <Dropdown isEstates={true} profit_rate={clickData.earningRate} />
        <Hr />
        <InvestPoint data={detail} />
        <Hr />
        <BasicInfo data={detail} />
        <Hr />
        <DetailInfo data={detail} />
        <Hr />
        <CollateralStability data={detail} />
        <Hr />
        <ExpertCheck data={detail} />
      </Container>
      <BtnContainer>
        <LikeBtn
          isLike={likeArr.includes(detail.estateId)}
          setIsLike={() => handleLikeToggle(clickData)}
        />
        <Button
          name={
            isEstateHeld
              ? '취소하기'
              : clickData.currentInvest === clickData.totalAmountInvestments
                ? '모집이 완료되었습니다.'
                : '구매하기'
          }
          status={
            isEstateHeld
              ? 'plain'
              : clickData.currentInvest === clickData.totalAmountInvestments
                ? 'disabled'
                : 'estates'
          }
          onClick={() => setIsOpen(true)}
        />
      </BtnContainer>
      {isOpen && (
        <BottomUpModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          content={
            isEstateHeld ? (
              <Cancel
                amount={matchingEstate?.inputCash}
                period={clickData.length}
                profit={
                  ((clickData.earningRate || 0) *
                    (matchingEstate?.inputCash || 0)) /
                  100
                }
                btnType="plain"
                onClick={clickCancleBtn}
              />
            ) : (
              <Purchase
                period={clickData.length}
                earningRate={clickData.earningRate}
                btnType={value === 0 ? 'disabled' : 'estates'}
                onClick={clickBuyBtn}
                value={value}
                setValue={setValue}
                error={error}
                setError={setError}
              />
            )
          }
        />
      )}
    </>
  );
};

export default EstatesDetail;
