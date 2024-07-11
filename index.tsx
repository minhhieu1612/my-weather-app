import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/app';
import { Provider } from 'react-redux';
import store from './src/store';

createRoot(document.getElementById('root') as Element).render(
  <Provider store={store}>
    <App />
  </Provider>
);
