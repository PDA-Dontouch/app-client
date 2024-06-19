import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import tw, { css, styled } from 'twin.macro';

import useLike from '../../hooks/useLike';
import { AppDispatch, RootState } from '../../store/store';
import {
  buyEstates,
  getEstatesData,
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
import { BuyType } from '../../types/estates_product';

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
  ${tw`mt-14 pb-20 h-full overflow-y-scroll`}
`;

const BtnContainer = styled.div`
  ${tw`w-[100%] h-[56px] flex gap-4 px-6 fixed bottom-7 box-border z-[99]`}
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
  const { EstatesLikeArr, setLikeEstates } = useLike();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(getEstatesData(parseInt(params.estates_id!)));
    dispatch(getHoldingEstates(13));
  }, [dispatch, params.estates_id]);

  const clickBuyBtn = () => {
    if (value < 5000) {
      setError('최소 투자 금액은 5천원입니다.');
    } else {
      const data: BuyType = {
        userId: 13,
        estateFundId: clickData.id,
        inputCash: value,
        estateName: clickData.title,
        estateEarningRate: clickData.earningRate,
      };

      dispatch(buyEstates(data)).then((res) => {
        if ((res.payload as BuyEstatesResponse).data.success) {
          navigate('/result/estate');
        }
      });
    }
  };

  const clickCancelBtn = async () => {
    const data = {
      userId: 13,
      estateFundId: clickData.id,
      inputCash: value,
      estateName: clickData.title,
      estateEarningRate: clickData.earningRate,
    };

    dispatch(sellEstates(data)).then((res) => {
      if ((res.payload as BuyEstatesResponse).data.success) {
        navigate('/result/sell');
      }
    });
  };

  let isEstateHeld = false;
  let matchingEstate = null;

  if (holdingEstates && holdingEstates.length > 0) {
    isEstateHeld = holdingEstates.some(
      (estate) => estate.estateFundId === detail.estateId,
    );

    matchingEstate = holdingEstates.find(
      (estate) => estate.estateFundId === detail.estateId,
    );
  }

  return (
    <>
      <Navbar name="back" type="" onClick={() => navigate('/estates')} />
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
        <ExpertCheck data={detail} />
      </Container>
      <BtnContainer>
        <LikeBtn
          isLike={EstatesLikeArr.includes(detail.id)}
          setIsLike={() => setLikeEstates(detail.id)}
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
                onClick={clickCancelBtn}
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
