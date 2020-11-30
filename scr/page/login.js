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
} from 'react-native';
import { Redirect } from "react-router-native";
import MyButton from '../component/button';

import Title from '../component/title'
import Divider from '../component/divider'
import Cadastro from '../component/login/cadastro'
import IconF from 'react-native-vector-icons/FontAwesome';

import { theme } from '../theme';
import DeviceInfo from 'react-native-device-info';

const Facebook = () => {
  return (
    <View style={{ marginHorizontal: 10,  height: 45}}>
        <IconF.Button onPress={() => {Linking.openURL(
            `https://lobao.djjoaoo.live/login/facebook?deviceId=${DeviceInfo.getUniqueId()}`
          )}} style={{ paddingHorizontal: 20, borderRadius: 10, height: 45,backgroundColor: '#3b5998' }} name="facebook" backgroundColor="">
            <Text style={{ paddingHorizontal: 10, fontFamily: 'Arial', fontSize: 15 }}>
              Entrar com o Facebook
            </Text>
        </IconF.Button>
    </View>
  )
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { match, history } = this.props;
    // console.log(match);
    if ('id' in match.params) {
      const { id } = match.params;
      console.log(id);
      AsyncStorage.setItem('token', id)
        .then(() => history.replace('/'))
        .catch(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { history, match } = this.props;
    console.log(match);
    if (loading) return null;
    return (
      <View style={styles.container1}>
        <View style={styles.header}>
          <Image
          style={styles.tinyLogo}
          source={require('../img/pp.png')}
          />
          <Title />
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              <Cadastro {...this.props}/>
              <Divider />
              <Facebook />
              <MyButton
                title="Já tem conta? Entrar"
                styleView={{paddingHorizontal: 8}}
                style={styles.buttonPortal}
                styleText={styles.buttonPortalText}
                onPress={() => {
                  history.push("/portal");
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.foother}>
          <Text style={styles.footherText}>Ao Clicar em "Criar um Conta", ou via Facebook, você concorda com os nossos</Text>
          <Text style={styles.footherText}>
            <Text style={styles.footherTextLink}>Termos de Uso</Text>
            {' e '}
            <Text style={styles.footherTextLink}>Politicas de Privacidade</Text>
          </Text>
        </View>
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
    height: 200,
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
    width: 120,
    height: 120,
  },
  textFF: {
    fontSize: 23,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: 'playlist-script',
  }
});
