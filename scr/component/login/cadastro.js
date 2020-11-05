import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

import Input from '../input';
import MyButton from '../button';

import { theme } from '../../theme';

class Cadastro extends Component {
  render() {
    const { history } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.textCC}>Cadastre-se</Text>
        <View style={styles.container}>
          <View style={[styles.container, { flexDirection: 'row', paddingHorizontal: 0}]}>
            <View style={[styles.container50, { paddingRight: 3}]}>
              <Input placeholder="Nome"/>
            </View>
            <View style={[styles.container50, { paddingLeft: 3}]}>
              <Input placeholder="Sobre Nome"/>
            </View>
          </View>
          <Input placeholder="E-Mail"/>
          <Input placeholder="Senha"/>
          <MyButton
            title="Criar uma Conta"
            onPress={() => {
              // history.push('/home')
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container50: {
    width: '50%',
  },
  textCC: {
    color: '#fff',
    margin: 30,
    fontSize: 30,
    fontFamily: 'GlacialIndifference-Regular',
  }
});

export default Cadastro;
