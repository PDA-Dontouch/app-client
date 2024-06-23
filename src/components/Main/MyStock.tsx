import tw, { styled } from 'twin.macro';
import MyStockProduct from './MyStockProduct';
import {
  HoldingStockType,
  StockDataResultType,
} from '../../types/stocks_product';
import Nothing from './Nothing';

type MyStockProps = {
  koreaData: HoldingStockType[] | StockDataResultType[];
  usaData: HoldingStockType[] | StockDataResultType[];
  realTimeKoreaPrice?: string[];
  realTimeUsPrice?: number[];
};

const Stocks = styled.div`
  ${tw`flex flex-col gap-4 w-full`}
`;

const StocksCountry = styled.div`
  ${tw`text-xs`}
`;

export default function MyStock({
  koreaData,
  usaData,
  realTimeKoreaPrice,
  realTimeUsPrice,
}: MyStockProps) {
  return (
    <>
      <Stocks>
        <StocksCountry>국내</StocksCountry>{' '}
        {koreaData.length === 0 ? (
          <Nothing />
        ) : (
          koreaData.map((stock, idx) => {
            return (
              <div key={idx}>
                <MyStockProduct
                  code={'stock' in stock ? stock.stock.symbol : stock.symbol}
                  name={'stock' in stock ? stock.stock.name : stock.name}
                  price={
                    'stock' in stock
                      ? (
                          stock.purchaseInfo.quantity *
                          (realTimeKoreaPrice
                            ? Number(realTimeKoreaPrice[idx])
                            : 1)
                        ).toLocaleString() + '원'
                      : '배당률 ' +
                        (stock.dividendYieldTtm * 100).toFixed(2) +
                        '%'
                  } // 실시간 가격
                  compare={
                    'stock' in stock
                      ? stock.purchaseInfo.quantity *
                          (realTimeKoreaPrice
                            ? Number(realTimeKoreaPrice[idx])
                            : 1) -
                        stock.purchaseInfo.totalPurchasePrice
                      : null
                  } // 수익률: 현재실시간 가격 - 현재까지 돈
                />
              </div>
            );
          })
        )}
      </Stocks>
      <Stocks>
        <StocksCountry>해외</StocksCountry>{' '}
        {usaData.length === 0 ? (
          <Nothing />
        ) : (
          usaData.map((stock, idx) => {
            return (
              <div key={idx}>
                <MyStockProduct
                  code={'stock' in stock ? stock.stock.symbol : stock.symbol}
                  name={'stock' in stock ? stock.stock.name : stock.name}
                  price={
                    'stock' in stock
                      ? (
                          stock.purchaseInfo.quantity *
                          (realTimeUsPrice ? realTimeUsPrice[idx] : 1)
                        ).toLocaleString() + '원'
                      : '배당률 ' +
                        (stock.dividendYieldTtm * 100).toFixed(2) +
                        '%'
                  } // 실시간 가격
                  compare={
                    'stock' in stock
                      ? stock.purchaseInfo.quantity *
                          (realTimeUsPrice ? realTimeUsPrice[idx] : 1) -
                        stock.purchaseInfo.totalPurchasePrice
                      : null
                  } // 수익률: 현재실시간 가격 - 현재까지 돈
                />
              </div>
            );
          })
        )}
      </Stocks>
    </>
  );
}
