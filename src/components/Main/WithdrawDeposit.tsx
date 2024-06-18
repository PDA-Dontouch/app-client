import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { depositWithdrawal } from '../../api/auth';

type ModalType = {
  type: 'withdraw' | 'deposit';
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
  function getAccountAmount() {
    // depositWithdrawal({userId: user.user.id, token : user.token, })
  }

  function onSubmit() {
    setModal(false);
  }

  return (
    <Container>
      <Title>{type === 'deposit' ? '입금' : '출금'}</Title>
      <PriceSection>
        <PriceTitle>금액</PriceTitle>
        <PriceNumber>
          <PriceInput />원
        </PriceNumber>
      </PriceSection>
      <Confirm type={'submit'} onSubmit={onSubmit} onClick={onSubmit}>
        확인
      </Confirm>
    </Container>
  );
}
