import React from 'react';
import 'antd/dist/antd.css'; // do not remove this
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router'; // react-router v4
import { persistor, store, history } from './store';
import {
  DEFAULT,
  LOGIN,
  SIGNUP,
  FORGOTPASSWORD,
  // RESETPASSWORD,
} from '../actions/location';
import LoginPage from '../containers/login-page';
import SignupPage2 from '../containers/signup-page2';
import ForgotPasswordPage from '../containers/forgotpwd-page';
// import ResetPasswordPage from '../containers/forgotpwd-page/reset-password';
import PrivatePath from '../containers/private-path';
import MainPage from '../containers/main-page';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Route exact path={DEFAULT} component={MainPage} />
            <Route path={LOGIN} component={LoginPage} />
            <Route path={SIGNUP} component={SignupPage2} />
            <Route path={FORGOTPASSWORD} component={ForgotPasswordPage} />

            <PrivatePath exact path="/:pathname/:id?" />
            {/*  for paths with more than 1 params
            <PrivatePath name="TEST" exact path="/:pathname/:name?/:name2?" /> */}

            {/* all other paths */}
            <PrivatePath path="*" />
          </Switch>
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;
