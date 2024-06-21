import tw, { styled } from "twin.macro";
import logoImg from '../../assets/logo.svg';
import Delete from '../../assets/delete.svg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotalInvestment } from "../../store/reducers/stocks/stocks";
import { RootState } from "../../store/store";

interface StockProps {
  name: string;
  price: number;
  amount: number;
  symbol: string;
  onDelete: () => void;
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
  ${tw`flex gap-2 items-center`}
`;

const SubItem = styled.div`
  ${tw`flex flex-col gap-1`}
`;

const Input = styled.input`
  ${tw`w-[50px] bg-gray-light border-0 border-solid border-b border-gray-dark focus:outline-none text-base text-end`}
`;

const Img = styled.img`
  ${tw`w-10 h-10 rounded-full`}
`;

const MainText = styled.span`${tw`text-base`}`;

const SubText = styled.span`${tw`text-sm`}`;

const SelectStock = ({ name, price, amount, symbol, onDelete }: StockProps) => {

  const [newAmount, setNewAmount] = useState<number>(0);
  const isKr = !isNaN(Number(symbol));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setNewAmount(value);
    }
  };

  useEffect(() => {
    setNewAmount(amount);
  }, [amount])


  return (
    <Wrapper>
      <DeleteImg src={Delete} onClick={onDelete} />
      <Container>
        <ItemContainer>
          <Item>
            <Img src={`https://file.alphasquare.co.kr/media/images/stock_logo/${isKr ? 'kr' : 'us'}/${symbol}.png`}
                  onError={(e) => {
                    e.currentTarget.src = logoImg;
                  }} />
            <SubItem>
              <MainText>{name}</MainText>
              <SubText>{price}원</SubText>
            </SubItem>
          </Item>
          <Item>
            <Input value={newAmount} onChange={handleAmountChange}/>
            <MainText>주</MainText>
          </Item>
        </ItemContainer>
      </Container>
    </Wrapper>
  );
};

export default SelectStock;