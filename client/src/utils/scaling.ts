import {Dimensions} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';

const windowWidth = Dimensions.get('window').width;

const FACTOR = 0.9;

export const adaptiveSize = (value: number) => {
  return moderateScale(windowWidth > 400 ? value : value * FACTOR);
};

export const adaptiveVerticalSize = (value: number) => {
  return moderateVerticalScale(windowWidth > 400 ? value : value * FACTOR);
};
