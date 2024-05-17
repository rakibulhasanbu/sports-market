import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import router from './router/index.tsx';
import { Provider } from 'react-redux';
import { persister, store } from './redux/app/store.ts';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <RouterProvider router={router} />
      </PersistGate>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        stacked
      // transition:Bounce
      />
    </Provider>
  </React.StrictMode>,
)
