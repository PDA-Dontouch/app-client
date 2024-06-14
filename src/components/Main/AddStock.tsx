import tw, { styled } from 'twin.macro';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';

export type AddStockype = {
  type: 'add' | 'cancel';
  code: string;
  name: string;
  onClick: (code: string, name: string) => void;
};

type StockImgProps = {
  code: string;
};

type BtnImgProps = {
  img: string;
};

const AddStockContainer = styled.div`
  ${tw`flex flex-row p-3 w-full justify-between items-center bg-white`}
  box-shadow: 2px 2px 4px 0px rgb(0,0,0,0.15);
  border-radius: 12px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  ${tw`flex flex-row gap-3 items-center w-auto`}
  overflow:hidden;
`;

const StockImg = styled.div<StockImgProps>`
  ${({ code }) =>
    '0' <= code[0] && code[0] <= '9'
      ? `background-image:url("https://file.alphasquare.co.kr/media/images/stock_logo/kr/${code}.png");`
      : `background-image:url("https://file.alphasquare.co.kr/media/images/stock_logo/us/${code}.png");`}

  width: 35px;
  height: 35px;
  border-radius: 20px;
  background-size: contain;
`;

const StockName = styled.div`
  ${tw`text-sm`}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 12rem;
`;

const AddBtn = styled.button<BtnImgProps>`
  ${({ img }) => {
    return `background-image: url(${img})`;
  }};
  border: none;
  ${tw`w-6 h-6 bg-transparent`}
`;

export default function AddStock({ type, code, name, onClick }: AddStockype) {
  return (
    <AddStockContainer>
      <LeftSection>
        <StockImg code={code}></StockImg>
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
