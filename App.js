import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainRoute from './src/Components/Main/index';
import { Provider } from 'react-redux';
import store from './src/Redux/store';

import { FormattedWrapper } from 'react-native-globalize';

export default class App extends React.Component {
  render() {
    //Hide all warning
    console.disableYellowBox = true;
    return (
      <FormattedWrapper locale='vi' currency='VNĐ'>
        <Provider store={store}>
          <MainRoute />
        </Provider>
      </FormattedWrapper>
    );
  }
}