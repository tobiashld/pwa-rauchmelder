import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SnackbarProvider } from 'notistack';
import { CookiesProvider } from 'react-cookie';
import { QueryClientProvider,QueryClient } from 'react-query'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <CookiesProvider>
          <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal:"left",vertical:"top"}} disableWindowBlurListener preventDuplicate>
            <App status="online"/>
            {/* <ReactQueryDevtools /> */}
          </SnackbarProvider>
        </CookiesProvider>
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
serviceWorkerRegistration.register()
