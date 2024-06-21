import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';

import useLike from '../../hooks/useLike';
import { AppDispatch, RootState } from '../../store/store';
import {
  buyEnergy,
  getEnergyData,
  sellEnergy,
} from '../../store/reducers/energy/energy';

import DetailBanner from '../../components/Estates/DetailBanner';
import Navbar from '../../components/common/Navbar';
import LikeBtn from '../../components/common/LikeBtn';
import Button from '../../components/common/Button';
import BottomUpModal from '../../components/common/Modal/BottomUpModal';
import Purchase from '../../components/common/Product/Detail/Purchase';
import Cancel from '../../components/common/Product/Detail/Cancel';
import Dropdown from '../../components/common/Dropdown';
import InvestPoint from '../../components/Energy/InvestPoint';
import BusinessInfo from '../../components/Energy/BusinessInfo';
import ProtectInvestor from '../../components/Energy/ProtectInvestor';
import Repayment from '../../components/Energy/Repayment';
import BasicInfo from '../../components/Energy/BasicInfo';
import { EnergyBuyType } from '../../types/energy_product';
import { getHoldingEnergy } from '../../store/reducers/energy/holding';

interface BuyEnergyResponse {
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

const EnergyDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const detail = useSelector((state: RootState) => state.energy.detail);
  const holdingEnergy = useSelector(
    (state: RootState) => state.holdingEnergy.datas,
  );
  const { EnergyLikeArr, setLikeEnergy } = useLike({ fundId: detail.energyId });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.user.id);
  const [value, setValue] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(getEnergyData(params.energy_id!));
    dispatch(getHoldingEnergy(userId));
  }, [dispatch, params.energy_id]);

  const clickBuyBtn = () => {
    if (value < 5000) {
      setError('최소 투자 금액은 5천원입니다.');
    } else {
      const data: EnergyBuyType = {
        userId: 1001,
        energyFundId: detail.energyId,
        inputCash: value,
        energyName: detail.title,
        energyEarningRate: detail.earningRate,
      };

      dispatch(buyEnergy(data)).then((res) => {
        if ((res.payload as BuyEnergyResponse).data.success) {
          navigate('/result/energy');
        } else {
          // 임시 에러 처리
          alert((res.payload as BuyEnergyResponse).data.error?.errorMessage);
        }
      });
    }
  };

  const clickCancleBtn = async () => {
    const data = {
      userId: userId,
      energyFundId: detail.energyId,
      inputCash: value,
      energyName: detail.title,
      energyEarningRate: detail.earningRate,
    };

    dispatch(sellEnergy(data)).then((res) => {
      if ((res.payload as BuyEnergyResponse).data.success) {
        navigate('/result/sell');
      }
    });
  };

  let isEnergyHeld = false;
  let matchingEnergy = null;

  if (holdingEnergy && holdingEnergy.length > 0) {
    isEnergyHeld = holdingEnergy.some(
      (energy) => energy.energyId === detail.energyId,
    );

    matchingEnergy = holdingEnergy.find(
      (energy) => energy.energyId === detail.energyId,
    );
  }

  return (
    <>
      <Navbar name="back" type="" onClick={() => navigate('/energy')} />
      <Container>
        <DetailBanner isEstates={false} data={detail} />
        <Dropdown isEstates={false} profit_rate={detail.earningRate} />
        <Hr />
        <InvestPoint data={detail} />
        <Hr />
        <BasicInfo data={detail} />
        <Hr />
        <BusinessInfo data={detail} />
        <Hr />
        <Repayment data={detail} />
        <Hr />
        <ProtectInvestor data={detail} />
      </Container>
      <BtnContainer>
        <LikeBtn
          isLike={EnergyLikeArr.includes(detail.energyId)}
          setIsLike={() => {}}
        />
        <Button
          name={
            isEnergyHeld
              ? '취소하기'
              : detail.sumOfInvestmentAndReservation === detail.fundingAmount
                ? '모집이 완료되었습니다.'
                : '구매하기'
          }
          status={
            isEnergyHeld
              ? 'plain'
              : detail.sumOfInvestmentAndReservation === detail.fundingAmount
                ? 'disabled'
                : 'energy'
          }
          onClick={() => setIsOpen(true)}
        />
      </BtnContainer>
      {isOpen && (
        <BottomUpModal
          onClose={() => setIsOpen(false)}
          content={
            isEnergyHeld ? (
              <Cancel
                amount={matchingEnergy?.inputCash}
                period={detail.investmentPeriod}
                profit={
                  ((detail.earningRate || 0) *
                    (matchingEnergy?.inputCash || 0)) /
                  100
                }
                btnType="plain"
                onClick={clickCancleBtn}
              />
            ) : (
              <Purchase
                period={detail.investmentPeriod}
                earningRate={detail.earningRate}
                btnType={value === 0 ? 'disabled' : 'energy'}
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

export default EnergyDetail;
