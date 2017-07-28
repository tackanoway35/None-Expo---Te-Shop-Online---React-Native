import { AsyncStorage } from 'react-native';

export default removeByKey = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        
    }
}