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
import { PriceType } from '../types/socket.ts';

interface WebSocketData {
  askPrice: PriceType;
  nowPrice: PriceType;
  ready: boolean;
}

const useWebSocketConnection = () => {
  const [askPrice, setAskPrice] = useState<PriceType>({
    response: {
      code: '',
      time: '',
      close: '',
      open: '',
      high: '',
      low: '',
    },
  });

  const [nowPrice, setNowPrice] = useState<PriceType>({
    response: {
      code: '',
      time: '',
      close: '',
      open: '',
      high: '',
      low: '',
    },
  });
  // const before = useSelector((state) => state.company.data[0]?.code);
  // const now = useSelector((state) => state.company.data[1]?.code);

  // useEffect(() => {
  //   leaveRoom(before);
  //   joinRoom(now);
  //   setNowPrice(null);
  // }, [before, now]);

  useEffect(() => {
    // leaveRoom('005930');
    joinRoom('005930');
    // setNowPrice(null);
  }, []);

  useEffect(() => {
    const settingAskPrice = subscribeAskPrice((askPriceMessage: PriceType) => {
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
