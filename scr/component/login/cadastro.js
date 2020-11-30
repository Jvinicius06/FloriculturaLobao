import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from 'react-native';

import Input from '../input';
import MyButton from '../button';

import { register } from '../../models/api';

import { theme } from '../../theme';

class Cadastro extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
      };
      this.setFormData = this.setFormData.bind(this);
      this.register = this.register.bind(this);
  }

  setFormData(kind, value) {
    this.setState({ [kind]: value });
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

  check() {
    const emailRX = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i
    return new Promise((resolve, reject) => {
      const { email, name, lastName, password } = this.state;
      if (name.length < 3) reject('Nome deve ter no minimo 3 caracteres!');
      if (lastName.length < 3) reject('O sobrenome deve ter no minimo 3 caracteres!');
      if (password.length < 6) reject('A senha deve ter no minimo 6 caracteres!');
      if (emailRX.test(email)) {
        resolve();
      } else reject('Email não valido!');
    });
  }

  register() {
    const { history } = this.props;
    const { password, name, lastName, email } = this.state;
    this.check()
    .then(() => {
      register({ password, name, lastName, email })
        .then((b) => b.json())
        .then((b) => {
          console.log(b);
          if (b.status === true) {
            history.replace(`/portal/${email}`)
          } else {
            this.menssage(b.msg)
          }
        })
        .catch((e) => {
          this.menssage(String(e))
        });
    })
    .catch((e) => {
      this.menssage(String(e))
    });
  }

  render() {
    const { lastName, name, email, password } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.textCC}>Cadastre-se</Text>
        <View style={styles.container}>
          <View style={[styles.container, { flexDirection: 'row', paddingHorizontal: 0}]}>
            <View style={[styles.container50, { paddingRight: 3}]}>
              <Input placeholder="Nome" value={name} onChangeText={(e) => this.setFormData('name', e)}/>
            </View>
            <View style={[styles.container50, { paddingLeft: 3}]}>
              <Input placeholder="Sobrenome" value={lastName} onChangeText={(e) => this.setFormData('lastName', e)}/>
            </View>
          </View>
          <Input autoCapitalize="none" placeholder="E-Mail" value={email} onChangeText={(e) => this.setFormData('email', e)}/>
          <Input secureTextEntry autoCapitalize="none" placeholder="Senha" value={password} onChangeText={(e) => this.setFormData('password', e)}/>
          <MyButton
            title="Criar uma Conta"
            onPress={this.register}
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
