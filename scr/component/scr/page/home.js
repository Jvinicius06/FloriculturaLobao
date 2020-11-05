import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

import HeaderHome from '../component/home/header'

import HomeHome from './home/index'

import { theme } from '../theme';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
    };
  }

  componentDidMount() {

  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <HeaderHome />
        {
          page === 'car' ? <Text>Car</Text> : <HomeHome />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
});
