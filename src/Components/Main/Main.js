import React, { Component } from "react";
import Home from "./Home/route";
import Cart from "./Cart/route";
import Search from "./Search/Search";
import Contact from './Contact/Contact';

import MyTab from './MyTab';
import { TabNavigator } from "react-navigation";

import global from '../../Services/global';
import { View } from 'react-native';
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label,
  Badge
} from "native-base";

export default (MainTab = TabNavigator(
  {
    Home: { screen: Home },
    Cart: { screen: Cart },
    Search: { screen: Search },
    Contact: { screen: Contact }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarComponent: MyTab
  }
));