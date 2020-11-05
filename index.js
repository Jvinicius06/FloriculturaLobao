import { registerRootComponent } from 'expo';
//
import App from './scr/index';
//
// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in the Expo client or in a native build,
// // the environment is set up appropriately
// import { AppRegistry } from 'react-native';
// import App from './src';

// AppRegistry.registerComponent('floriculturalobao', () => App);
registerRootComponent(App);
