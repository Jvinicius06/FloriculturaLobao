// import 'react-native-gesture-handler'
import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Linking,
  Platform,
  AsyncStorage,
} from 'react-native';
import { NativeRouter, Route, Link, DeepLinking, Switch, Redirect } from "react-router-native";

import { theme } from './theme'

import Login from './page/login';
import Home from './page/home';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('ID')
      .then((login) => {
        this.setState({ login: login ? login : 'login' });
      })
  }

  render() {
    const { login } = this.state;
    return(
      <NativeRouter>
        <StatusBar backgroundColor={theme.color.primary}/>
        <View style={styles.container}>
          <DeepLinking/>
          <Route exact path="/">
            {login === null ?
              null :
              login === 'login' ?
              <Login /> :
              <Home />
            }
          </Route>
          <Route path="/login/:id" component={Login} />
          <Route path="/home" component={Home} />
        </View>
      </NativeRouter>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});



export default Splash;
