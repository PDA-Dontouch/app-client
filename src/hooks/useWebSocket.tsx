import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  joinRoom,
  leaveRoom,
  subscribeNowPrice,
  subscribeAskPrice,
} from '../store/webSocket/nowPrice.ts';
import { PriceType, SocketType } from '../types/socket.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';

interface WebSocketData {
  askPrice: SocketType;
  nowPrice: PriceType;
  ready: boolean;
}

const useWebSocketConnection = () => {
  const [askPrice, setAskPrice] = useState<SocketType>({
    message: {
      code: '',
      time: '',
      sellPrice: [],
      buyPrice: [],
      sellAmount: [],
      buyAmount: [],
    },
  });

  const [nowPrice, setNowPrice] = useState<PriceType>({
    message: {
      code: '',
      time: '',
      close: '',
      open: '',
      high: '',
      low: '',
    },
  });
  // const before = useSelector((state: RootState) => state.trading.selectCode[0]);
  const now = useSelector((state: RootState) => state.trading.selectCode);

  // useEffect(() => {
  //   leaveRoom(before);
  //   joinRoom(now);
  //   // setNowPrice(null);
  // }, []);

  useEffect(() => {
    const settingAskPrice = subscribeAskPrice((askPriceMessage: SocketType) => {
      setAskPrice(askPriceMessage);
    });

    const settingNowPrice = subscribeNowPrice((nowPriceMessage: PriceType) => {
      setNowPrice(nowPriceMessage);
    });

    return () => {
      settingAskPrice();
      settingNowPrice();
    };
  }, []);

  return { askPrice, nowPrice, ready: !!nowPrice };
};

const WebSocketContext = createContext<WebSocketData | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const webSocketData = useWebSocketConnection();

  return (
    <WebSocketContext.Provider value={webSocketData}>
      {children}
    </WebSocketContext.Provider>
  );
};

// 커스텀 훅
export const useWebSocket = (): WebSocketData => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
