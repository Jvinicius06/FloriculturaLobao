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
import Iten from '../../component/home/iten';

import { getAllItens } from '../../models/itens';

export default class HomeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      iten: null,
    };
    this.setIten = this.setIten.bind(this);
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

  setIten(iten) {
    this.setState({ iten });
  }

  render() {
    const { data, iten } = this.state;
    const dataIten = data.filter((it) => it._id === iten);
    return (
      <View style={styles.container}>
        {
          iten === null ?
          <Itens data={data} setIten={this.setIten} /> :
          <Iten data={dataIten[0]} setIten={this.setIten} />
        }
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
