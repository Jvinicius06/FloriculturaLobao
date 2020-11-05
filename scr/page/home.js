import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  BackHandler,
} from 'react-native';

import HeaderHome from '../component/home/header'

import HomeHome from './home/home'
import Car from './home/car'

import { theme } from '../theme';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
    };
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  setPage(page) {
    this.setState({ page });
  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <HeaderHome setPage={this.setPage} />
        {
          page === 'car' ?
          <Car setPage={this.setPage} /> :
          <HomeHome setPage={this.setPage} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
