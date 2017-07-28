
import React from "react";
import { AppRegistry, Alert } from "react-native";
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1
} from "native-base";
export default class OrderHistory extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Main')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Order History</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Hello world</Text>
        </Content>
      </Container>
    );
  }
}