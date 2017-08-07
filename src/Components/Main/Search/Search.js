import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
  Right
} from "native-base";

import HeaderComponent from '../Home/Header';

export default class Search extends React.Component {
  constructor(props)
  {
    super(props);
  }
  render() {
    //Style
    const { wrapper, content } = styles;
    return (
      <Container>
        <HeaderComponent navigation = {this.props.navigation}/>
        <Content padder style = { StyleSheet.flatten(wrapper) }>
          <View style = { content }>
            
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f4f1e6'
  },
  content : {
    backgroundColor : 'orange'
  }
})