// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // Імпорт компоненту App
import { BrowserRouter } from 'react-router-dom'; // Імпорт BrowserRouter для маршрутизації
import { Provider } from 'react-redux'; // Імпорт Provider для підключення Redux
import { store } from './redux/store'; // Імпорт Redux store
import './index.css'; // Імпорт CSS-стилів

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* Обгортка Provider для доступу до Redux */}
      <BrowserRouter>
        {' '}
        {/* Обгортка BrowserRouter для маршрутизації */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
