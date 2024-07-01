import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import configureStore from './redux/store';


const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
