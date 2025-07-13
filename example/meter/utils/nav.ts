
import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

// add you all screen name  
// or you can make type from screen names object: export type RouteType =  typeof screens[keyof typeof screens]
export type RouteType =  "screen1" | "screen1"

export const navigationRef = createNavigationContainerRef();

export class nav {
  static push(name: RouteType, params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  }

  static reset(routeName: RouteType, params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.reset({index: 0, routes: [{name: routeName, params}]});
    }
  }

  static pop() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.dispatch(StackActions.pop());
    }
  }

  static navigate<T>(name: RouteType, params?: T) {
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(name, params);
    }
  }

  static back() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }

  static replace(name: RouteType, params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  }
}
  