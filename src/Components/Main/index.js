import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import MainTab from './Main';
import Authentication from '../Authentication/Authentication';
import ChangeInfo from '../ChangeInfo/ChangeInfo';
import OrderHistory from '../OrderHistory/OrderHistory';
import Menu from '../Menu/Menu';

const { width } = Dimensions.get('window');
export default MainRouter = DrawerNavigator(
  {
    Main: { screen: MainTab },
    Authentication: { screen: Authentication },
    'Change Information': { screen: ChangeInfo },
    'Order History': { screen: OrderHistory }
  },
  {
    drawerWidth : width*0.7,
    contentComponent: props => <Menu {...props} />
  }
);