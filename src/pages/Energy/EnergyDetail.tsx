import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';

import useLike from '../../hooks/useLike';
import { AppDispatch, RootState } from '../../store/store';
import { getEnergyData } from '../../store/reducers/energy/energy';

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
  const { EstatesLikeArr, setLikeEstates, EnergyLikeArr, setLikeEnergy } =
    useLike();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEnergyData(params.energy_id!));
  }, []);

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
          isLike={EnergyLikeArr.includes(detail.energyId) ? true : false}
          setIsLike={() => setLikeEnergy(detail.energyId)}
        />
        <Button
          name="구매하기"
          status="energy"
          onClick={() => setIsOpen(true)}
        />
      </BtnContainer>
      {isOpen && (
        <BottomUpModal
          onClose={() => setIsOpen(false)}
          content={
            <Purchase
              period={detail.investmentPeriod}
              profit={200000}
              btnType="energy"
            />
          }
        />
        // <BottomUpModal onClose={() => setIsOpen(false)} content={<Cancel amount={5000000} period={6} profit={205100} btnType="plain" />} />
      )}
    </>
  );
};

export default EnergyDetail;
