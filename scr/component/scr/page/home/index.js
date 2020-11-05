import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

import { theme } from '../../theme';
import Itens from '../../component/home/itens';
import { getAllItens } from '../../models/itens';

export default class HomeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getAllItens();
  }

  getAllItens() {
    try {
      getAllItens()
        .then((d) => d.json())
        .then((data) => {
          this.setState({ data });
        })
        .catch((ee) => {
            throw new Error(ee);
        });
    } catch (e) {
      ToastAndroid.showWithGravity(
        e.menssage,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
      	<Itens data={data} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
