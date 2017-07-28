import { AsyncStorage } from 'react-native';
export default saveToLocal = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
    
}