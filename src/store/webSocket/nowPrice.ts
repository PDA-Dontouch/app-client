import io from 'socket.io-client';
import { PriceType } from '../../types/socket';
const SERVER_URL = 'http://localhost:3000';

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

export const subscribeAskPrice = (callback: (message: PriceType) => void) => {
  socket.on('askPrice', (message: PriceType) => {
    callback(message);
  });

  return () => socket.off('askPrice');
};
