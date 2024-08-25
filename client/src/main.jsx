import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// importing store from redux/store , and creating a react-redux provider for wrapping our app
import { store,persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // wrapping our whole app in redux provider and passing our global store as prop so that any copmponent can use it
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </Provider>,
  </PersistGate>
    

)
