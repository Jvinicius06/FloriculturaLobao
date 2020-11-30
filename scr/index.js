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
import {
  NativeRouter,
  Route,
  Link,
  DeepLinking,
  Switch,
  Redirect,
} from "react-router-native";

import { theme } from './theme'
import { isLogin, setToken } from './models/api';

import Login from './page/login';
import Home from './page/home';
import Portal from './page/portal';

const CheckLogin = (props) => {
  const { history } = props;
  AsyncStorage.getItem('token')
    .then((token) => {
      setToken(token);
      isLogin()
      .then((b) => b.json())
      .then((b) => {
        if (b.status === true) {
          return history.push('/home');
        }
        history.push('/login');
      })
      .catch((e) => history.push('/login'))
    })
    .catch((e) => history.push('/login'));
  return null;
}

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
    };
  }

  render() {
    const { login } = this.state;
    return(
      <NativeRouter>
        <StatusBar backgroundColor={theme.color.primary}/>
        <View style={styles.container}>
          <Route path="/portal/:email" component={Portal} />
          <Route path="/portal" exact component={Portal} />
          <Route path="/token/:id" component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={CheckLogin} />
          <DeepLinking/>
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
