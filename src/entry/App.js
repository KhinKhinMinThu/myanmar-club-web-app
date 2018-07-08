import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
// import LoginPage from '../containers/login-page';
// import SignupPage from '../containers/signup-page';
import SignupPage2 from '../containers/signup-page2';
// import ProfilePage from '../containers/profile-page';
// import RenewalPage from '../containers/profile-page/renewal-page';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <div className="App">
        {/* <LoginPage /> */}
        {/* <ProfilePage /> */}
        {/* <RenewalPage /> */}
        <SignupPage2 />
      </div>
    </PersistGate>
  </Provider>
);

export default App;
