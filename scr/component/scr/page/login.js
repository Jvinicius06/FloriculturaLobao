import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

import Title from '../component/title'
import Divider from '../component/divider'
import Cadastro from '../component/login/cadastro'
import IconF from 'react-native-vector-icons/FontAwesome';

import { theme } from '../theme';

export default class Index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={require('../img/pp.png')}
          />
          <Title />
        </View>
        <View style={styles.content}>
          <Cadastro {...this.props}/>
          <Divider />
          <View style={{ marginHorizontal: 10, height: 45}}>
            <IconF.Button style={{ borderRadius: 10, height: 45 }} name="facebook" backgroundColor="#3b5998">
              <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
                Entrar com o Facebook
              </Text>
            </IconF.Button>
          </View>
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
  },
  header: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
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
