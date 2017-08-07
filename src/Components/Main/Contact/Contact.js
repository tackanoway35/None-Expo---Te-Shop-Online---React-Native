import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
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

const { width } = Dimensions.get("window");
const marker = {
  latitude: 20.993683,
  longitude: 105.808432,
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 20.993823,
        longitude: 105.808494,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  render() {
    //Style
    const { map, information, wrapper, content, icon } = styles;
    return (
      <Container>
        <Content padder style={StyleSheet.flatten(wrapper)}>
          <View style={content}>
            <View style={map}>
              <MapView
                region = {this.state.region}
                style = {{ height: 340, width: width - 10 }}
              >
                <MapView.Marker
                  coordinate={ marker }
                  title="Te Shop Online"
                  description="Đẹp Độc Lé"
                />
              </MapView>
            </View>

            <View style={information}>
              <Card>
                <CardItem>
                  <Icon active name="home" style = { icon }/>
                  <Right>
                    <Text>235 Nguyễn Trãi TX - HN</Text>
                  </Right>
                </CardItem>

                <CardItem>
                  <Icon active name="call" style = { icon }/>
                  <Right>
                    <Text>01652880097</Text>
                  </Right>
                </CardItem>

                <CardItem>
                  <Icon active name="mail" style = { icon }/>
                  <Right>
                    <Text>teshoponline@gmail.com</Text>
                  </Right>
                </CardItem>
              </Card>
            </View>
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
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    height: 340,
  },
  information: {

  },
  icon : {
    color : 'green'
  }
})