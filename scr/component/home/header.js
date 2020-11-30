import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Title from '../title';
import CarIcon from '../carIcon';

import { theme } from '../../theme';

export default class HeaderHome extends Component {
  render() {
    const { setPage } = this.props;
    return (
      <View style={styles.container}>
        <Pressable onPress={() => {
          AsyncStorage.removeItem('token');
          this.props.history.push("/")
        }}>
          <Icon style={styles.icon} name="menu" size={40} color="#FFF" />
        </Pressable>
        <Image
          style={styles.tinyLogo}
          source={require('../../img/pp.png')}
        />
        <Title style={{container: { transform: [{ scale: 0.8 }]}}} />
        <CarIcon onPress={() => {setPage('car')}} style={[styles.icon, styles.left]} name="shopping-cart" size={35} color="#FFF" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    padding: 5,
    backgroundColor: theme.color.primary,
    flexDirection: 'row',
    alignContent: 'center',
  },
  icon: {
    margin: 5,
  },
  left: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  tinyLogo: {
    marginLeft: 3,
    width: 50,
    height: 50,
    resizeMode: "cover",
  }
});
