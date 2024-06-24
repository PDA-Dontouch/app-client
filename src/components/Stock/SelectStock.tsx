import tw, { styled } from 'twin.macro';
import logoImg from '../../assets/logo.svg';
import Delete from '../../assets/delete.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalInvestment } from '../../store/reducers/stocks/stocks';
import { RootState } from '../../store/store';

interface StockProps {
  name: string;
  price: string;
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
  ${tw`flex gap-3 items-center text-[1rem]`}
`;

const SubItem = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const Input = styled.div`
  ${tw`w-[50px] bg-gray-light border-0 focus:outline-none text-end`}
`;

const Img = styled.img`
  ${tw`w-10 h-10 rounded-full`}
`;

const MainText = styled.span`
  ${tw`text-[0.9rem]`}
`;

const SubText = styled.span`
  ${tw`text-[0.8rem]`}
`;

const SelectStock = ({ name, price, amount, symbol, onDelete }: StockProps) => {
  const [newAmount, setNewAmount] = useState<number>(0);
  const isKr = !isNaN(Number(symbol));

  useEffect(() => {
    setNewAmount(amount);
  }, [amount]);

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
            <Input>{newAmount}</Input>
            <MainText>주</MainText>
          </Item>
        </ItemContainer>
      </Container>
    </Wrapper>
  );
};

export default SelectStock;
