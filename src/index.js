import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './redux/__store'
import FallbackLoader from './components/ui/fallback-loader/fallback-loader'

import './services/i18n/i18n';

const LazyApp = lazy(() => import("./App"))

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<FallbackLoader />}>
      <LazyApp />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
