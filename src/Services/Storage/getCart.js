import { AsyncStorage } from 'react-native';

export default getCart = async () => {
    try {
        const carts = await AsyncStorage.getItem('@carts');
        if (carts !== null) {
            return JSON.parse(carts); //Json object
        }
        return [];
    } catch (error) {
        return [];
    }
}