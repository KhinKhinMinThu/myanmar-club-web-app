import React from 'react';
import 'antd/dist/antd.css'; // do not remove this
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router'; // react-router v4
import { persistor, store, history } from './store';

import PrivatePath from '../containers/authentication/private-path';
import PublicPath from '../containers/authentication/public-path';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            {/* all other paths */}
            <PrivatePath exact path="/portal/:pathname/:id?" />
            {/*  for paths with more than 1 params
            <PrivatePath name="TEST" exact path="/:pathname/:name?/:name2?" /> */}

            {/* all other paths */}
            <PublicPath path="*" />
          </Switch>
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;
