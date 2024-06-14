import tw, { styled } from 'twin.macro';
import SearchBar from '../common/Stock/SearchBar';
import { useEffect, useState } from 'react';
import AddStock from './AddStock';

type ProductsHeldPageProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type SelectedStockType = {
  code: string;
  name: string;
};

type CancelConfirmBtnProps = {
  type: 'cancel' | 'confirm';
};

const AddStockModalContainer = styled.div`
  ${tw`flex flex-col w-full gap-7 p-5`}
  box-sizing: border-box;
`;

const SearchResult = styled.div`
  ${tw`flex flex-col w-full gap-3 px-1`}
  height:250px;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const AddStatusContainer = styled.div`
  ${tw`flex flex-col gap-5 p-5 w-full`}
  box-sizing: border-box;
`;

const Inputs = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const InputContainer = styled.div`
  ${tw`flex flex-row gap-4`}
`;

const InputLabel = styled.div`
  ${tw`text-white bg-green p-3 text-sm text-center`}
  width:80px;
  border-radius: 12px;
`;

const Input = styled.input`
  ${tw`bg-white text-sm w-full p-3`}
  border: none;
  border-radius: 12px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const CancelConfirm = styled.div`
  ${tw`flex flex-row p-2 gap-4 justify-end`}
  box-sizing: border-box;
`;

const CancelConfirmBtn = styled.button<CancelConfirmBtnProps>`
  ${tw`text-center bg-transparent w-fit`}
  ${({ type }) => {
    return type === 'cancel' ? tw`text-black` : tw`text-red`;
  }}
  border:none;
`;

export default function AddStockModal({ setModal }: ProductsHeldPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [status, setStatus] = useState<'search' | 'add'>('search');
  const [price, setPrice] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [selectedStock, setSelectedStock] = useState<SelectedStockType>({
    code: '',
    name: '',
  });

  function onClickHandler(code: string, name: string) {
    setStatus('add');
    setSelectedStock({ code, name });
  }

  function onConfirmHandler() {
    setModal(false);
  }

  useEffect(() => {
    console.log(searchTerm);
  });

  return (
    <>
      {status === 'search' ? (
        <AddStockModalContainer>
          <SearchBar modal={true} setSearchTerm={setSearchTerm} />
          <SearchResult>
            <AddStock
              type="add"
              code="005930"
              name="삼성전자"
              onClick={onClickHandler}
            />
            <AddStock
              type="add"
              code="005930"
              name="삼성전자"
              onClick={() => {}}
            />
            <AddStock
              type="add"
              code="005930"
              name="삼성전자"
              onClick={() => {}}
            />
            <AddStock
              type="add"
              code="005930"
              name="삼성전자"
              onClick={() => {}}
            />
          </SearchResult>
        </AddStockModalContainer>
      ) : (
        <AddStatusContainer>
          <AddStock
            type="cancel"
            code={selectedStock.code}
            name={selectedStock.name}
            onClick={() => {
              setStatus('search');
            }}
          />
          <Inputs>
            <InputContainer>
              <InputLabel>체결가</InputLabel>
              <Input value={price} />
            </InputContainer>
            <InputContainer>
              <InputLabel>보유 수량</InputLabel>
              <Input value={amount} />
            </InputContainer>
          </Inputs>
          <CancelConfirm>
            <CancelConfirmBtn
              type="cancel"
              onClick={() => {
                setStatus('search');
              }}
            >
              취소
            </CancelConfirmBtn>
            <CancelConfirmBtn type="confirm" onClick={onConfirmHandler}>
              확인
            </CancelConfirmBtn>
          </CancelConfirm>
        </AddStatusContainer>
      )}
    </>
  );
}
