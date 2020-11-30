import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  AsyncStorage,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { Redirect } from "react-router-native";
import MyButton from '../component/button';

import Title from '../component/title'
import Divider from '../component/divider'
import LoginView from '../component/login/login'
import IconF from 'react-native-vector-icons/FontAwesome';
import { loginByEmail } from '../models/api';

import { theme } from '../theme';

export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.sendLogin = this.sendLogin.bind(this);
  }

  menssage(msg) {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }

  sendLogin(value) {
    const { history } = this.props;
    const { email, password } = value;
    loginByEmail(email, password)
      .then((b) => b.json())
      .then((b) => {
        if (b.status === 'true') {
          AsyncStorage.setItem('token', b.token, (err) => {
            if (!err) {
              history.push('/');
            } else {
              this.menssage(err);
            }
          })
        } else {
          this.menssage(b.msg)
        }
      })
      .catch((e) => {
        this.menssage(e);
      });
  }

  render() {
    const { loading } = this.state;
    const { history } = this.props;
    return (
      <View style={styles.container1}>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={require('../img/pp.png')}
            />
          <Title style={{textFF: styles.textFF, textLL: styles.textLL}}/>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              <LoginView onSend={this.sendLogin} {...this.props}/>
              <MyButton
                title="Cadastre-se"
                styleView={{paddingHorizontal: 8}}
                style={styles.buttonPortal}
                styleText={styles.buttonPortalText}
                onPress={() => {
                  history.goBack();
                }}
              />
              <View style={styles.foother}>
                <Text style={styles.footherText}>Não compartilhe suas senha com ninguem! </Text>
                <Text style={styles.footherText}>
                  <Text style={styles.footherTextLink}>Esqueci minha senha!</Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonPortal: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonPortalText: {
    color: '#000',
  },
  foother: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  footherText: {
    textAlign: 'center',
    fontSize: 10,
  },
  footherTextLink: {
    color: '#fff',
  },
  container1: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.color.primary,
    flex: 1,
  },
  header: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  content: {
    width: '100%',
    flex: 1,
    backgroundColor: theme.color.primary
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  textFF: {
    fontSize: 33,
  },
  textLL: {
    fontSize: 23,

  },
});
