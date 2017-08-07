import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { FormattedNumber } from 'react-native-globalize';
import { connect } from 'react-redux';
import * as actionCreators from '../../../Redux/actionCreators';

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
  Badge,
  List,
  ListItem,
  Thumbnail,
  Spinner
} from "native-base";

class Cart extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={{ height: 50 }}>
        <Left>
          <Button
            transparent
            onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Shopping Cart</Title>
        </Body>
        <Right />
      </Header>
    )
  })

  confirmOrder() {
    let { profile, cart } = this.props;
    if (Object.keys(profile).length == 0) {
      this.props.navigation.navigate("Authentication", { tabNavigator: 'Cart' });
    } else {
      let data = {
        admin_id: profile.admin_id,
        data: JSON.stringify(cart)
      };
      let url = "http://webbase.com.vn/ceramic/order-api/confirm-order";
      this.props.thunkConfirmOrder(url, data);
    }
  }

  deleteThisProduct(cartId) {
    //Call redux thunk to delete from cart
    Alert.alert(
      'Are you sure delete this product from your cart',
      null,
      [
        {
          text: 'Cancel', onPress: () => { }, style: 'cancel'
        },
        {
          text: 'Delete', onPress: () => {
            this.props.thunkDeleteFromCart(cartId);
          }
        }
      ],
      {
        cancelable: false
      }
    )
  }

  increaseQuantityProduct(cartId) {
    // this.props.acIncreaseQuantityCart(cartId);
    this.props.thunkIncreaseQuantityCart(cartId);
  }

  decreaseQuantityProduct(cartId) {
    // this.props.acDecreaseQuantityCart(cartId);
    this.props.thunkDecreaseQuantityCart(cartId);
  }

  render() {
    //Total price cart
    const { cart, order, profile } = this.props;
    var totalCartPrice = 0;
    if (cart.length > 0) {
      const arrTotalPrice = cart.map(e => {
        return e.product.price * e.quantity
      });
      totalCartPrice = arrTotalPrice.reduce((total, num) => {
        return total + num;
      });
    }

    //Get navigation params
    const { navigate } = this.props.navigation;
    //Server
    const server = 'http://webbase.com.vn/ceramic';

    //Style variable
    const {
      listItemWrapper, wrapper, image, left, right, row1, row2, row3,
      textShowDetail, iconClose, wrapperIconClose, row3column1, row3column2,
      listItemBody, wrapperTitle,
      textPrice,
    } = styles;

    return (
      <Container>

        <Content padder>
          <View style={{ height: 400, marginBottom: 8 }}>
            <List
              dataArray={cart}
              renderRow={(item, sectionID, rowID) => (
                <ListItem style={StyleSheet.flatten(listItemWrapper)}>
                  <Thumbnail square style={StyleSheet.flatten(image)} source={{ uri: server + item.product.image }} />
                  <Body style={StyleSheet.flatten(listItemBody)}>
                    <View style={row1}>
                      <View style={wrapperTitle}>
                        <Text>{item.product.title}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => this.deleteThisProduct(rowID)}
                        style={wrapperIconClose}
                      >
                        <Icon name="close" style={StyleSheet.flatten(iconClose)} />
                      </TouchableOpacity>

                    </View>
                    <View style={row2}>
                      <FormattedNumber
                        style={StyleSheet.flatten(textPrice)}
                        value={item.product.price}
                      />
                      <Text style={{ color: 'red' }}>VNĐ</Text>
                    </View>

                    <View style={row3}>
                      <View style={row3column1}>
                        <TouchableOpacity
                          onPress={() => this.decreaseQuantityProduct(rowID)}
                        >
                          <Icon name="remove" />
                        </TouchableOpacity>

                        <Text>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => this.increaseQuantityProduct(rowID)}
                        >
                          <Icon name="add" />
                        </TouchableOpacity>

                      </View>
                      <TouchableOpacity
                        onPress={() => this.showProductDetail(item)}
                        style={row3column2}
                      >
                        <Text style={StyleSheet.flatten(textShowDetail)}>SHOW DETAILS</Text>
                      </TouchableOpacity>
                    </View>
                  </Body>
                </ListItem>
              )}
            >
            </List>
          </View>

          {
            Object.keys(order.orders).length != 0
              ?
              <View>
                <Button
                  block
                  success
                  onPress={() => this.props.navigation.navigate("Payment", { total_amount: totalCartPrice, order_id : order.orders[0].id })}
                >
                  <Text>
                    Total :&nbsp;
                  </Text>
                  <FormattedNumber
                    style={{ color: 'white' }}
                    value={totalCartPrice}
                  />
                  <Text>
                    &nbsp;VNĐ Check out now
                  </Text>
                </Button>
              </View>
              :
              <View>
                {
                  order.isLoading
                    ?
                    <View>
                      <Button
                        disabled
                        block
                      >
                        <Text>Confirming order&nbsp;&nbsp;</Text>
                        <Spinner color="white"></Spinner>
                      </Button>
                    </View>
                    :
                    <View>
                      <Button
                        success
                        block
                        onPress={() => this.confirmOrder()}
                      >
                        <Text>Confirm order</Text>
                      </Button>
                    </View>
                }
              </View>
          }
        </Content>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  listItemWrapper: {
    marginLeft: 0,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: 10
  },

  listItemBody: {
    height: 100,
    justifyContent: 'space-between'
  },

  row1: {

    flexDirection: 'row',
    alignItems: 'center'
  },
  wrapperTitle: {

  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  wrapperIconClose: {
    flex: 1,
    alignItems: 'flex-end'
  },

  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  row3column1: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  row3column2: {
    flex: 3,
    alignItems: 'flex-end',
  },
  textShowDetail: {
    color: 'red',
    fontSize: 12,
  },
  textPrice: {
    fontSize: 14,
    color: 'red'
  },
  image: {
    width: 80,
    height: 100,
    marginLeft: 15
  }
})

function mapStateToProps(state) {
  return {
    cart: state.cart,
    order: state.order,
    profile: state.signIn.profile
  }
}

export default connect(mapStateToProps, actionCreators)(Cart)