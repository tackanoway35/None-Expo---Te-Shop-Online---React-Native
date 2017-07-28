
import React from "react";
import { AppRegistry, Alert, StyleSheet, View, Image } from "react-native";
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

import ImagePicker from 'react-native-image-picker';

export default class ChangeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      imageBase64: null,
    }
  }

  chooseImage() {
    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: 'Select Avatar',
      customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    //Style
    const { wrapper, container, content } = styles;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Main')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Change Information</Title>
          </Body>
          <Right />
        </Header>
        <Content style={StyleSheet.flatten(wrapper)}>
          <View style={container}>
            <View style={content}>
              <Image style={{ width: 200, height: 200 }} source={this.state.avatarSource} />
              <Button
                onPress={() => this.chooseImage()}
              >
                <Text>Choose Image</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#D6D6D6'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10
  }

})