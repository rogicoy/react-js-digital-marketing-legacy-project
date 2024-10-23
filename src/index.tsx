/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// apollo graphql provider
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'utils/apolloClient';

// load mock apis
import '_mockApis';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store, persister } from 'store';

// style + assets
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://removed
serviceWorker.unregister();
