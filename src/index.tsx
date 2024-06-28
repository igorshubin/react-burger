import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/error-boundary/error-boundary';
import "normalize.css";
import './index.css';
import App from './components/app';
import {rootReducer} from './redux';
import {configureStore} from '@reduxjs/toolkit';

/**
 * https://redux-toolkit.js.org/introduction/getting-started
 */
const store = configureStore({
  reducer: rootReducer
});

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
