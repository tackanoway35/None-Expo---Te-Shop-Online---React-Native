import React from "react";
import { Image, Dimensions, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
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


import Swiper from 'react-native-swiper';

import Collection from './Collection';
import Categories from './Categories';
import TopProduct from './TopProduct';

import {connect} from 'react-redux';
import * as actionCreators from '../../../Redux/actionCreators';

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => navigation.navigate('DrawerOpen')}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Welcome to Te Shop</Title>
          </Body>
          <Right style={{ flex: 1 }}>
          </Right>
        </Header>

        <Header searchBar rounded>
          <Item style={{ flex: 8 }}>
            <Icon name="ios-search" />
            <Input placeholder="What do you want to buy?" />
          </Item>
          <Button small light onPress={() => this.search()} style={{ flex: 2, marginLeft: 5 }}>
            <Text>Search</Text>
          </Button>
        </Header>
      </View>
    )
  })

  constructor(props)
  {
    super(props);
    this.props.thunkFetchCategoriesTopProduct();
  }

  componentDidMount() {

  }

  render() {
    const { wrapperContent } = styles;
    return (
      <Container>
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

function mapStateToProps(state)
{
  return {
    categories : state.categoriesProduct.categories,
    topProducts : state.categoriesProduct.topProducts
  }
}

export default connect(mapStateToProps, actionCreators)(Home);