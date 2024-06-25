import io from 'socket.io-client';
import { PriceType, SocketType } from '../../types/socket';
const SERVER_URL = '/';

const socket = io(SERVER_URL);

export const joinRoom = (stockCode: string) => {
  if (stockCode) {
    socket.emit('joinRoom', stockCode);
  }
};

export const leaveRoom = (stockCode: string) => {
  if (stockCode) {
    socket.emit('leaveRoom', stockCode);
  }
};

export const subscribeNowPrice = (callback: (message: PriceType) => void) => {
  socket.on('nowPrice', (message: PriceType) => {
    callback(message);
  });

  return () => socket.off('nowPrice');
};

export const subscribeAskPrice = (callback: (message: SocketType) => void) => {
  socket.on('askPrice', (message: SocketType) => {
    callback(message);
  });

  return () => socket.off('askPrice');
};
