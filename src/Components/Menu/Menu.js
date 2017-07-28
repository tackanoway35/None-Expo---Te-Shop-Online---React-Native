import React from "react";
import { AppRegistry, Image, StatusBar, View, StyleSheet } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
import userImage from '../../Upload/images/user.png';
import MenuSignIn from './MenuSignIn';
import MenuActions from './MenuActions';
import { connect } from 'react-redux';

class Menu extends React.Component {
  render() {
    //Redux
    const { profile } = this.props;
    var mainJSX = <View></View>
    if (Object.keys(profile).length > 0) {
      mainJSX = <MenuActions profile = { profile } navigation = { this.props.navigation }/>
    } else {
      mainJSX = <MenuSignIn navigation = { this.props.navigation }/>
    }
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Image
              square
              style={{}}

              source={userImage}
            />
          </Image>

          {mainJSX}
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.signIn.profile
  }
}
export default connect(mapStateToProps)(Menu);