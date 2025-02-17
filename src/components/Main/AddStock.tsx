import tw, { styled } from 'twin.macro';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
import logoImg from '../../assets/logo.svg';

export type AddStockType = {
  type: 'add' | 'cancel';
  code: string;
  name: string;
  onClick: (code: string, name: string) => void;
};

type BtnImgProps = {
  img: string;
};

const AddStockContainer = styled.div`
  ${tw`flex flex-row p-3 w-full justify-between items-center bg-white`}
  box-shadow: 1px 1px 2px 0px rgb(0,0,0,0.05);
  border-radius: 12px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  ${tw`flex flex-row gap-3 items-center w-auto`}
  overflow:hidden;
`;

const StockImg = styled.img`
  ${tw`rounded-full`}
  width: 35px;
  height: 35px;
  background-size: contain;
`;

const StockName = styled.div`
  ${tw`text-sm`}
`;

const AddBtn = styled.button<BtnImgProps>`
  ${({ img }) => {
    return `background-image: url(${img})`;
  }};
  border: none;
  ${tw`w-6 h-6 bg-transparent`}
`;

export default function AddStock({ type, code, name, onClick }: AddStockType) {
  return (
    <AddStockContainer>
      <LeftSection>
        <StockImg
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/${'0' <= code.charAt(0) && code.charAt(0) <= '9' ? 'kr' : 'us'}/${code}.png`}
          onError={(e) => {
            e.currentTarget.src = logoImg;
          }}
        />
        <StockName>{name}</StockName>
      </LeftSection>
      {type === 'add' ? (
        <AddBtn img={plus} onClick={() => onClick(code, name)} />
      ) : (
        <AddBtn img={minus} onClick={() => onClick(code, name)} />
      )}
    </AddStockContainer>
  );
}
