import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddldware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

import { tempSetUser, check } from './modules/user';

const sagaMiddleware = createSagaMiddldware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// app.js 에서 유즈이펙트로 처리해도 된다. 하지만 렌더링된 이후에 실행되기 떄문에
// 약간의 아주 짧은 깜빡ㅂ임 현상이 나타날 수 있음

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안함

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('localstorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();
// 사가미들웨어 런 호출된 이후 로드유저를 호출하는것이 중요하다. loaduser를 먼저 호출하면
// 액션이 디스패치했을 때 사가에서 이를 제대로 처리하지 않음

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
