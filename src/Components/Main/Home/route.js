import React, {Component} from 'react';
import Home from './Home';
import { StackNavigator } from 'react-navigation';

import ProductDetail from '../ProductDetail/ProductDetail';
import ListProduct from '../ListProduct/ListProduct';
import ScratchCard from '../ModePayment/ScratchCard';
import LocalCard from '../ModePayment/LocalCard';
import CreditCard from '../ModePayment/CreditCard';

export default (HomeNav = StackNavigator({
    HomeView : { screen : Home },
    ProductDetail : { screen : ProductDetail },
    ListProduct : { screen : ListProduct },
    ScratchCard : { screen : ScratchCard },
    LocalCard : { screen : LocalCard },
    CreditCard : { screen : CreditCard },
}));
