import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Routers from './Routers';
import { WebSocketProvider } from './hooks/useWebSocket';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebSocketProvider>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
