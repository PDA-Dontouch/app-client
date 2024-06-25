import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import Button from '../components/common/Button';
import BasicModal from '../components/common/Modal/BasicModal';
import { postType } from '../store/reducers/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { save } from 'react-cookies';
import { saveAsset } from '../api/auth';

const Container = styled.div`
  ${tw`h-[100vh] px-7 py-40 box-border`}
`;

const ItemContainer = styled.div`
  ${tw`w-full h-full flex flex-col justify-between mb-4`}
`;

const Wrapper = styled.div`
  ${tw`w-full flex flex-col gap-9`}
`;

const InputWrapper = styled.div`
  ${tw`relative w-full flex items-center`}
`;

const Input = styled.input`
  ${tw`w-11/12 py-2 text-3xl focus:outline-none border-b border-black text-end`}
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;

  &:focus {
    ${tw`border-green40`}
  }
`;

const Title = styled.span`
  ${tw`text-[1.4rem] block mb-2`}
`;

const Unit = styled.span`
  ${tw`text-3xl ml-1`}
`;

const AssetInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalScore } = location.state || { totalScore: 0 };
  const [totalAssetNum, setTotalAssetNum] = useState<number>(0);
  const [totalAsset, setTotalAsset] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');

    if (
      ('0' <= value.charAt(value.length - 1) &&
        value.charAt(value.length - 1) <= '9') ||
      value.length === 0
    ) {
      setTotalAssetNum(Number(value));
      const formattedValue = Number(value).toLocaleString();

      setTotalAsset(formattedValue);
    }
  };

  const handleSubmit = () => {
    dispatch(
      postType({
        token: user.token,
        userId: user.user.id,
        totalScore: totalScore,
      }),
    ).unwrap();

    saveAsset({ userId: user.user.id, cash: totalAssetNum, token: user.token });
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <div
          style={{
            zIndex: 10,
            position: 'fixed',
          }}
        >
          <BasicModal
            type={user.user.investmentType}
            onClick={() => navigate('/')}
            isOpen={showModal}
          />
        </div>
      )}
      <Container>
        <ItemContainer>
          <Wrapper>
            <Title>나의 총 자산은?</Title>
            <InputWrapper>
              <Input
                type="text"
                value={totalAsset}
                onChange={handleInputChange}
                inputMode="decimal"
                placeholder=""
              />
              <Unit>원</Unit>
            </InputWrapper>
          </Wrapper>
        </ItemContainer>
        <Button
          name="완료"
          status={totalAsset === '' ? 'disabled' : 'active'}
          onClick={handleSubmit}
        />
      </Container>
    </>
  );
};

export default AssetInput;
