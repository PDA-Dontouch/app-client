import tw, { styled } from 'twin.macro';
import logoImg from '../../assets/logo.svg';
import Delete from '../../assets/delete.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuantity } from '../../store/reducers/stocks/stocks';
import { AppDispatch, RootState } from '../../store/store';
import { InsertCombiStock } from '../../types/stocks_product';

interface StockProps {
  name: string;
  price: string;
  amount: number;
  symbol: string;
  onDelete: () => void;
  stock: InsertCombiStock;
  combiType: number;
}

const Wrapper = styled.div`
  ${tw`relative flex flex-col`}
`;

const DeleteImg = styled.img`
  ${tw`absolute top-[-5px] right-[-5px] cursor-pointer`}
`;

const Container = styled.div`
  ${tw`w-[calc(100% - 32px)] bg-gray-light px-4 py-3 rounded-14`}
`;

const ItemContainer = styled.div`
  ${tw`w-full flex justify-between`}
`;

const Item = styled.div`
  ${tw`flex gap-3 items-center`}
`;

const SubItem = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const Input = styled.input`
  ${tw`w-[50px] bg-gray-light border-0 border-solid border-b border-gray-dark focus:outline-none text-base text-end`}
`;

const Img = styled.img`
  ${tw`object-contain w-9 rounded-full`}
`;

const MainText = styled.span`
  ${tw`text-[0.9rem]`}
`;

const SubText = styled.span`
  ${tw`text-[0.8rem]`}
`;

const SelectStock = ({
  name,
  price,
  amount,
  symbol,
  onDelete,
  stock,
  combiType,
}: StockProps) => {
  const [newAmount, setNewAmount] = useState<number>(amount);
  const isKr = !isNaN(Number(symbol));
  const [newStock, setNewStock] = useState<InsertCombiStock>(stock);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setNewAmount(amount);
  }, [amount]);

  useEffect(() => {
    if (newStock) {
      dispatch(setQuantity({ data: newStock, combiType }));
    }
  }, [newStock, dispatch]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setNewAmount(numericValue);
    } else {
      setNewAmount(0);
    }
  };

  const handleBlur = () => {
    if (newAmount < 1) {
      setNewAmount(1);
      setNewStock({
        ...stock,
        quantity: 1,
      });
    } else {
      setNewStock({
        ...stock,
        quantity: newAmount,
      });
    }
  };

  return (
    <Wrapper>
      <DeleteImg src={Delete} onClick={onDelete} />
      <Container>
        <ItemContainer>
          <Item>
            <Img
              src={`https://file.alphasquare.co.kr/media/images/stock_logo/${isKr ? 'kr' : 'us'}/${symbol}.png`}
              onError={(e) => {
                e.currentTarget.src = logoImg;
              }}
            />
            <SubItem>
              <MainText>{name}</MainText>
              <SubText>
                {price
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                원
              </SubText>
            </SubItem>
          </Item>
          <Item>
            <Input
              type="number"
              value={newAmount === 0 ? '' : newAmount}
              onChange={handleAmountChange}
              onBlur={handleBlur}
              placeholder="0"
            />
            <MainText>주</MainText>
          </Item>
        </ItemContainer>
      </Container>
    </Wrapper>
  );
};

export default SelectStock;
