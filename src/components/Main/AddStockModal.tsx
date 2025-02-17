import tw, { styled } from 'twin.macro';
import SearchBar from '../common/Stock/SearchBar';
import { useEffect, useRef, useState } from 'react';
import AddStock from './AddStock';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { stocksDatas } from '../../api/stocks';
import { StockDataResultType } from '../../types/stocks_product';
import { postHeldKRStock, postHeldUSStock } from '../../api/holding';

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
  ${tw`flex flex-col w-full gap-7 py-2`}
  box-sizing: border-box;
`;

const SearchResult = styled.div`
  ${tw`flex flex-col w-full gap-3 px-1`}
  height:280px;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const AddStatusContainer = styled.div`
  ${tw`flex flex-col gap-5 p-5 w-full`}
  box-sizing: border-box;
`;

const Inputs = styled.form`
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
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [selectedStock, setSelectedStock] = useState<SelectedStockType>({
    code: '',
    name: '',
  });
  const [searchResult, setSearchResult] = useState<StockDataResultType[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollStdRef = useRef<HTMLDivElement>(null);

  const user = useSelector((state: RootState) => state.user);

  function getSearchResult(searchTerm: string) {
    stocksDatas({
      searchWord: searchTerm,
      userId: user.user.id,
      dividendMonth: null,
      page: page,
      size: 10,
    }).then((data) => {
      setPage(page + 1);
      setSearchResult(searchResult.concat(data.data.response));
    });
  }

  function search(searchTerm: string) {
    stocksDatas({
      searchWord: searchTerm,
      userId: user.user.id,
      dividendMonth: null,
      page: 0,
      size: 10,
    }).then((data) => {
      setPage(0);
      setSearchResult(data.data.response);
    });
  }

  function onClickHandler(code: string, name: string) {
    setStatus('add');
    setSelectedStock({ code, name });
  }

  function onConfirmHandler() {
    const request = {
      userId: user.user.id,
      stockCode: selectedStock.code,
      stockPrice: Number(price),
      stockAmount: Number(amount),
      token: user.token,
    };

    if (
      '0' <= selectedStock.code.charAt(0) &&
      selectedStock.code.charAt(0) <= '9'
    ) {
      postHeldKRStock(request);
    } else {
      postHeldUSStock(request);
    }
    setModal(false);
  }

  function onScrollHandler() {
    if (scrollRef.current && scrollStdRef.current) {
      const stdRef = scrollStdRef.current.getBoundingClientRect();
      const sRef = scrollRef.current.getBoundingClientRect();

      if (stdRef.bottom >= sRef.bottom - 100) {
        getSearchResult(searchTerm);
      }
    }
  }

  function onChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) {
    setValue(e.currentTarget.value);
  }

  useEffect(() => {
    search(searchTerm);
  }, [searchTerm, status]);

  return (
    <>
      {status === 'search' ? (
        <AddStockModalContainer>
          <SearchBar modal={true} setSearchTerm={setSearchTerm} />
          <SearchResult ref={scrollStdRef} onScroll={onScrollHandler}>
            {searchResult.map((data, idx) => {
              return (
                <div key={idx}>
                  <AddStock
                    type="add"
                    code={data.symbol.replace(/\.ks$/, '')}
                    name={data.name}
                    onClick={onClickHandler}
                  />
                </div>
              );
            })}
            <div ref={scrollRef}></div>
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
          <Inputs
            onSubmit={(e) => {
              e.preventDefault();
              onConfirmHandler();
            }}
          >
            <InputContainer>
              <InputLabel>체결가</InputLabel>
              <Input
                inputMode="decimal"
                type="number"
                value={price}
                onChange={(e) => onChange(e, setPrice)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>보유 수량</InputLabel>
              <Input
                inputMode="numeric"
                type="number"
                value={amount}
                onChange={(e) => onChange(e, setAmount)}
              />
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
