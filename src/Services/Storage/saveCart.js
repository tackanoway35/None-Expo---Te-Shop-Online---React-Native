import { AsyncStorage } from 'react-native';
export default saveCart = async (cartArray) => {
    try {
        await AsyncStorage.setItem('@carts', JSON.stringify(cartArray))    
    } catch (error) {
        console.log(error);
    }
}