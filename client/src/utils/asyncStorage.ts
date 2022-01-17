import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key.toString(), value.toString());
  } catch (error) {
    console.error('ASE', key, value, error);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      console.log('ASE', key, 'value not found');
    }
  } catch (error) {
    console.error('ASE', key, error);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};
