import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import Button from '../../components/common/Button';
import Navbar from '../../components/common/Navbar';

const Container = styled.div`
  ${tw`h-[100%] px-7 py-40 box-border`}
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
  ${tw`w-11/12 py-2 text-3xl focus:outline-none border-b border-black`}
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;

  &:focus {
    ${tw`border-green40`}
  }
`;

const Title = styled.span`
  ${tw`text-2xl block mb-2`}
`;

const Unit = styled.span`
  ${tw`text-3xl ml-1`}
`;

const AssetInput = () => {
  const navigate = useNavigate();
  const [totalAssetNum, setTotalAssetNum] = useState<number>(0);
  const [totalAsset, setTotalAsset] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');

    if (
      ('0' <= value.charAt(value.length - 1) &&
        value.charAt(value.length - 1) <= '9') ||
      value.length === 0
    ) {
      const numericValue = Number(value);
      setTotalAssetNum(numericValue);
      const formattedValue = numericValue.toLocaleString();
      setTotalAsset(formattedValue);
    }
  };

  const handleSubmit = () => {
    navigate('/stocks', { state: totalAssetNum });
  };

  return (
    <>
      <Navbar
        name="back"
        type="back"
        onClick={() => {
          navigate(-1);
        }}
      />
      <Container>
        <ItemContainer>
          <Wrapper>
            <Title>투자금액 변경하기</Title>
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
          name="변경"
          status={totalAsset === '' ? 'disabled' : 'active'}
          onClick={handleSubmit}
        />
      </Container>
    </>
  );
};

export default AssetInput;
