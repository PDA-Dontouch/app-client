import tw, { styled } from 'twin.macro';
import MyStockProduct, { MyStockProductType } from './MyStockProduct';

type MyStockProps = {
  koreaData: MyStockProductType[];
  usaData: MyStockProductType[];
};

const Stocks = styled.div`
  ${tw`flex flex-col gap-4 w-full`}
`;

const StocksCountry = styled.div`
  ${tw`text-xs`}
`;

export default function MyStock({ koreaData, usaData }: MyStockProps) {
  return (
    <>
      <Stocks>
        <StocksCountry>국내</StocksCountry>{' '}
        {koreaData.map((stock, idx) => {
          return (
            <div key={idx}>
              <MyStockProduct
                code={stock.code}
                name={stock.name}
                price={stock.price}
                compare={stock.compare}
              />
            </div>
          );
        })}
      </Stocks>
      <Stocks>
        <StocksCountry>해외</StocksCountry>{' '}
        {usaData.map((stock, idx) => {
          return (
            <div key={idx}>
              <MyStockProduct
                code={stock.code}
                name={stock.name}
                price={stock.price}
                compare={stock.compare}
              />
            </div>
          );
        })}
      </Stocks>
    </>
  );
}
