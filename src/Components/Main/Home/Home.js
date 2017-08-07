import React from "react";
import { Image, Dimensions, StyleSheet, View, ScrollView, TouchableOpacity,TextInput } from 'react-native';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Item,
  Input,
} from "native-base";

import HeaderComponent from './Header';

import Swiper from 'react-native-swiper';

import Collection from './Collection';
import Categories from './Categories';
import TopProduct from './TopProduct';

import { connect } from 'react-redux';
import * as actionCreators from '../../../Redux/actionCreators';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.thunkFetchCategoriesTopProduct();
  }
  
  componentDidMount() {

  }

  render() {
    const { wrapperContent } = styles;
    return (
      <Container>
        <HeaderComponent navigation = {this.props.navigation}/>
        <ScrollView style={{ flex: 1 }}>
          <View style={wrapperContent}>
            <Collection />
            <Categories navigation={this.props.navigation} categories={this.props.categories} />
            <TopProduct navigation={this.props.navigation} topProducts={this.props.topProducts} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const { width, height } = Dimensions.get('window');

var styles = StyleSheet.create({
  wrapperContent: {
    backgroundColor: '#f4f1e6',
    flex: 1,
  }
})

function mapStateToProps(state) {
  return {
    categories: state.categoriesProduct.categories,
    topProducts: state.categoriesProduct.topProducts
  }
}

export default connect(mapStateToProps, actionCreators)(Home);