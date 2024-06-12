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

const BtnContainer = styled.div`
  ${tw`w-[100%] h-[56px] flex gap-4 px-6 fixed bottom-7 box-border`}
`;

const Input = styled.input`
  ${tw`w-[50px] bg-gray-light border-0 border-solid border-b border-gray-dark focus:outline-none text-base text-end`}
`;

const EnergyDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const detail = useSelector((state: RootState) => state.energy.detail);
  const { likeArr, setLike } = useLike('energy');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEnergyData(parseInt(params.energy_id!)));
  }, []);

  return (
    <>
      <Navbar name="back" type="" onClick={() => navigate('/energy')} />
      <DetailBanner
        isEstates={false}
        tags={['태그', '태그', '태그']}
        date="2024.05.13"
        title="의성군 외 총 993.40kW 태양광 담보"
      />
      <BtnContainer>
        <LikeBtn
          isLike={likeArr.includes(parseInt(params.energy_id!)) ? true : false}
          setIsLike={() => setLike(parseInt(params.energy_id!))}
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
          content={<Purchase period="6" profit="205,100" btnType="energy" />}
        />
        // <BottomUpModal onClose={() => setIsOpen(false)} content={<Cancel amount={5000000} period={6} profit={205100} btnType="plain" />} />
      )}
      <Dropdown isEstates={false} />
    </>
  );
};

export default EnergyDetail;
