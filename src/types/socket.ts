export type PriceType = {
  message: {
    code: string;
    time: string;
    close: string;
    open: string;
    high: string;
    low: string;
  };
};

export type SocketType = {
  message: {
    code: string;
    time: string;
    sellPrice: [];
    buyPrice: [];
    sellAmount: [];
    buyAmount: [];
  };
};

export type postOrderData = {
  stockName: string;
  stockCode: string;
  userId: number;
  price: number;
  amount: number;
};
