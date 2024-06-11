import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 4° Passo - aqui está sendo criado o provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// 5° Passo - agora é só usar o Redux no projeto. Como no componente userName.jsx
