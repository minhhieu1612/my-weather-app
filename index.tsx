import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/app';
import { Provider } from 'react-redux';
import store from './src/store';
// import 'src/critical.scss';

const rootEle = document.getElementById('root') as Element;

rootEle.addEventListener('click', function (e) {
  console.log(e)
  // e.stopImmediatePropagation();
});


function /*#__PURE__*/letDoSomething() {

  // let do something
}

createRoot(rootEle).render(
  <Provider store={store}>
    <App />
  </Provider>
);
