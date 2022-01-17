import {CommonActions} from '@react-navigation/native';
import {navigationRef} from '../services/NavigationService';

export const timeoutNavigation = (navigator, route, screen, timeout = 100) => {
  try {
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screen}],
      }),
    );
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    navigator.navigate(route as never, {screen} as never);
  }, timeout);
};
