import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { NativeRouter, Route, Link, DeepLinking  } from "react-router-native";

import { theme } from './theme'

import Login from './page/login';
import Home from './page/home';

const Splash = () => {
  console.log('Teste Debug');
  return(
    <NativeRouter>
      <StatusBar backgroundColor={theme.color.primary}/>
      <View style={styles.container}>
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

export default Splash;
