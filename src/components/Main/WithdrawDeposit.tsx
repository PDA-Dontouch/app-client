import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { depositWithdrawal } from '../../api/auth';
import { useEffect, useState } from 'react';

type ModalType = {
  type: 'withdrawal' | 'deposit';
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Container = styled.div`
  ${tw`flex flex-col w-full gap-7 items-end`}
`;

const Title = styled.div`
  ${tw`w-full text-center text-xl`}
`;

const PriceSection = styled.form`
  ${tw`flex flex-row gap-7 w-full`}
`;

const PriceTitle = styled.div`
  ${tw`w-[80px] bg-green px-3 py-4 text-white text-center`}
  border-radius: 12px;
`;

const PriceNumber = styled.div`
  ${tw`flex flex-row text-end w-full gap-3 px-3 py-4 bg-white`}
  border-radius: 12px;
`;

const PriceInput = styled.input`
  ${tw`w-full`}
  border: none;
  &:focus {
    outline: none;
  }
`;

const Confirm = styled.button`
  ${tw`text-red text-center bg-transparent w-fit p-2`}
  border: none;
`;

export default function WithdrawDeposit({ type, setModal }: ModalType) {
  const user = useSelector((state: RootState) => state.user);
  const [price, setPrice] = useState<number>(0);
  const [priceInput, setPriceInput] = useState<string>('');

  function onClick() {
    const cash = type === 'deposit' ? price : -1 * price;

    depositWithdrawal({
      userId: user.user.id,
      token: user.token,
      price: cash,
    }).then((data) => {
      setModal(false);
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onClick();
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/,/g, '');
    if (
      ('0' <= value.charAt(value.length - 1) &&
        value.charAt(value.length - 1) <= '9') ||
      value.length === 0
    ) {
      setPrice(Number(value));
      const formattedValue = Number(value).toLocaleString();

      setPriceInput(formattedValue);
    }
  }

  return (
    <Container>
      <Title>{type === 'deposit' ? '입금' : '출금'}</Title>
      <PriceSection onSubmit={(e) => onSubmit(e)}>
        <PriceTitle>금액</PriceTitle>
        <PriceNumber>
          <PriceInput
            inputMode="decimal"
            type="text"
            value={priceInput}
            onChange={(e) => onChangeHandler(e)}
          />
          원
        </PriceNumber>
      </PriceSection>
      <Confirm type={'submit'} onClick={onClick}>
        확인
      </Confirm>
    </Container>
  );
}
