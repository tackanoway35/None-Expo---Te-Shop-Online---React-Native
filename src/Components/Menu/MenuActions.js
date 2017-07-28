import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { List, ListItem, Button, Text, Icon, Spinner } from 'native-base';

import { connect } from 'react-redux';
import * as actionCreators from '../../Redux/actionCreators';

const routes = [
    {
        action: "Order History",
        icon: 'paper'
    },
    {
        action: "Change Information",
        icon: 'person'
    },
];
class MenuActions extends Component {
    signOut() {
        this.props.thunkSignOut();
    }
    render() {
        //Style
        const {
            information, logOut, action, listItem
        } = styles;

        //Redux
        const { isLoadingSignOut } = this.props;
        return (
            <View style={information}>
                <View style={logOut}>
                    <Text>{`Xin chào ${this.props.profile.username}`}</Text>
                    {
                        isLoadingSignOut ?
                            <View>
                                <Button
                                    disabled
                                    rounded
                                    onPress={() => this.signOut()}
                                >
                                    <Text>Signing out&nbsp;&nbsp;</Text>
                                    <Spinner color = 'blue'/>
                                </Button>
                            </View>
                            :
                            <View>
                                <Button
                                    rounded
                                    onPress={() => this.signOut()}
                                >
                                    <Text>Sign out</Text>
                                </Button>
                            </View>
                    }

                </View>
                <View style={action}>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    style={StyleSheet.flatten(listItem)}
                                    button
                                    onPress={() => this.props.navigation.navigate(data.action)}>
                                    <Icon name={data.icon} style={{ color: 'blue' }} />
                                    <Text>&nbsp;{data.action}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoadingSignOut: state.signIn.isLoadingSignOut
    }
}
export default connect(mapStateToProps, actionCreators)(MenuActions)

const styles = StyleSheet.create({
    information: {
        flex: 1
    },
    logOut: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    action: {
        paddingTop: 20,
        flex: 4,
        justifyContent: 'center'
    },
    listItem: {
        borderBottomWidth: 0
    }
})