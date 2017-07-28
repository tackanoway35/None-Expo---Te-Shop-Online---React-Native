import React from "react";
import { AppRegistry, Alert, StyleSheet, Dimensions, View, Image } from "react-native";
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
  H1,
  Footer,
  Input
} from "native-base";

import { connect } from 'react-redux';
import * as actionCreators from '../../Redux/actionCreators';

import SignIn from './SignIn';
import SignUp from './SignUp';
class Authentication extends React.Component {
  signInView()
  {
    this.props.acGoSignIn();
  }

  signUpView()
  {
    this.props.acGoSignUp();
  }

  render() {
    //Style
    const {
      footer, btnSignInActive, btnSignInInActive, btnSignUpActive, btnSignUpInActive,
      content, emailInput, passwordInput, nameInput,
      viewEmailInput, viewPasswordInput, viewNameInput,
      textActive, textInActive,
      container
    } = styles;
    //Redux
    const { authenticationStatus } = this.props;

    const mainJSX = authenticationStatus ? <SignIn navigation = { this.props.navigation }/> : <SignUp />;

    return (
      <Container style={StyleSheet.flatten(container)}>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title>Welcome to TeShop</Title>
          </Body>
        </Header>
        {mainJSX}
        <Footer style={StyleSheet.flatten(footer)}>
          <Button 
            style={ authenticationStatus ? StyleSheet.flatten(btnSignInActive) : StyleSheet.flatten(btnSignInInActive)}
            onPress={() => this.signInView()}  
          >
            <Text style={ authenticationStatus ? StyleSheet.flatten(textActive) : StyleSheet.flatten(textInActive)}>Sign In</Text>
          </Button>
          <Button 
            style={authenticationStatus ? StyleSheet.flatten(btnSignUpInActive) : StyleSheet.flatten(btnSignUpActive)}
            onPress={() => this.signUpView()}  
          >
            <Text style={ authenticationStatus ? StyleSheet.flatten(textInActive) : StyleSheet.flatten(textActive)}>Sign Up</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFF',
    margin: 15
  },
  btnSignInActive : {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 1,
    flex: 1,
    justifyContent: 'center'    
  },
  btnSignInInActive : {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 1,
    flex: 1,
    justifyContent: 'center',
    backgroundColor : '#fff',
    borderWidth : 1,
    borderColor : 'blue'
  },
  btnSignUpActive : {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 1,
    flex: 1,
    justifyContent: 'center'    
  },
  btnSignUpInActive : {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 1,
    flex: 1,
    justifyContent: 'center',
    backgroundColor : '#fff',
    borderWidth : 1,
    borderColor : 'blue'
  },
  textActive : {
    textAlign : 'center',
  },
  textInActive : {
    textAlign : 'center',
    color: 'blue'
  }
})

function mapStateToProps(state)
{
  return {
    signIn : state.signIn,
    signUp : state.signUp,
    authenticationStatus : state.authenticationStatus
  }
}

export default connect(mapStateToProps, actionCreators)(Authentication)