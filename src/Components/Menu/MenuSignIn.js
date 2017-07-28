import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

class MenuSignIn extends Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems : 'center' }}>
                <View>
                    <Button
                        rounded
                        style={{ marginTop: 20 }}
                        onPress={() => this.props.navigation.navigate('Authentication')}
                    >
                        <Text>Sign In</Text>
                    </Button>
                </View>

            </View>
        );
    }
}
export default MenuSignIn;  
