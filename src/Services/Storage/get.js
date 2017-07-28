import { AsyncStorage } from 'react-native';
export default get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if(value !== null)
        {
            return JSON.parse(value);
        }
        return {};
    } catch (error) {
        console.log(error);
        return {};
    }
}