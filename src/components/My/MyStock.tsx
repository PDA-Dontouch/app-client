import tw, { styled } from 'twin.macro';
import MyStockProduct, { MyStockProductType } from './MyStockProduct';

type MyStockProps = {
  koreaDate: MyStockProductType[];
  usaDate: MyStockProductType[];
};

const Stocks = styled.div`
  ${tw`flex flex-col gap-4 w-full`}
`;

const StocksCountry = styled.div`
  ${tw`text-xs`}
`;

export default function MyStock({ koreaDate, usaDate }: MyStockProps) {
  return (
    <>
      <Stocks>
        <StocksCountry>국내</StocksCountry>{' '}
        {koreaDate.map((stock, idx) => {
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
        {usaDate.map((stock, idx) => {
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
