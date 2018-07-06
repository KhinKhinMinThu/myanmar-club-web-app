import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import LoginPage from '../containers/login-page';
// import SignupPage from '../containers/signup-page';
// import ProfilePage from '../containers/profile-page';
// import RenewalPage from '../containers/profile-page/renewal-page';

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
