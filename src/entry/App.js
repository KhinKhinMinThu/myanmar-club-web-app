import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoginPage from '../containers/login-page';
import { persistor, store } from './store';
// import SignupPage from '../containers/signup-page';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <div className="App">
        {/* <SignupPage /> */}
        <LoginPage />
      </div>
    </PersistGate>
  </Provider>
);

export default App;
