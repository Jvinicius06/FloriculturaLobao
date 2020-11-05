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

import Title from '../component/title'
import Divider from '../component/divider'
import Cadastro from '../component/login/cadastro'
import IconF from 'react-native-vector-icons/FontAwesome';

import { theme } from '../theme';

const Facebook = () => {
  return (
    <View style={{ marginHorizontal: 10,  height: 45}}>
        <IconF.Button onPress={() => {Linking.openURL('https://lobao.djjoaoo.live/login/facebook')}} style={{ paddingHorizontal: 20, borderRadius: 10, height: 45 }} name="facebook" backgroundColor="#3b5998">
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
    const { match } = this.props;
    if (match) {
      const { id } = match.params
      AsyncStorage.setItem('ID', id)
        .then(() => {
          console.log('redirect to home')
          this.props.history.push("/home")
          // this.setState({ loading: false, login: true});
        })
        .catch(() => {this.setState({ loading: false })})
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) return null;
    return (
      <View style={styles.container1}>
        <ScrollView>
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
              <Facebook />
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
