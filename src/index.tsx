import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './services/redux';
import {BrowserRouter as Router} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/error-boundary/error-boundary';
import App from './components/app';

import "normalize.css";
import './index.css';

/**
 * DOCS: https://practicum.yandex.ru/learn/react/courses/6441f7e7-93d6-4080-8c0a-4a4592d217d8/sprints/272768/topics/a41defff-0d49-4064-9b0b-7819d835ccbd/lessons/15a39cf4-ef79-4536-ada2-12519ff8db40/
 * FIGMA: https://www.figma.com/design/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0-1&t=m9YBL9BZGW6hYKrJ-0
 * CSS: https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/
 */

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  /*<React.StrictMode>*/
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ErrorBoundary>
  /*</React.StrictMode>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
