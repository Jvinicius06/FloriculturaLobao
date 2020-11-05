import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  BackHandler,
  ToastAndroid,
} from 'react-native';

import { theme } from '../../theme';
import MyButton from '../button';
import MyIconButton from '../iconeButton';
import { getUrlImage } from '../../models/itens';

import car from '../../models/car';

export default class Iten extends Component {
  constructor(props) {
    super(props);
    this.pushBack = this.pushBack.bind(this);
    this.addIten = this.addIten.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.pushBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.pushBack);
  }

  addIten(uuid) {
    car.addIten(uuid)
      .then(() => {

      })
      .catch((e) => {
        ToastAndroid.showWithGravityAndOffset(
          e,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
  }

  pushBack() {
    const { setIten } = this.props;
    setIten(null);
    return true;
  }

  render() {
    const { setIten, data } = this.props;
    return (
      <ScrollView>
        <View style={[styles.container, { marginTop: 30, width: '100%'}]}>
          <View style={styles.container}>
            <Text style={[styles.title, { fontSize: 22 }]}>{data.name}</Text>
            <Image
              style={styles.tinyLogo}
              source={{uri: getUrlImage(data.image_path)}}
            />
            <Text style={[styles.title, styles.price]}>{`R$${data.price.toFixed(2)}`}</Text>
            <Text style={[styles.title, styles.quant]}>{`Qtd.:${data.quant}`}</Text>
            <Text style={[styles.title, styles.quant]}>{`${data.descp}`}</Text>
            <MyIconButton
              style={{ backgroundColor: theme.color.primary }}
              title={data.quant <= 0 ? "Item não disponivel" : "Adicionar ao Carrinho"}
              disable={data.quant <= 0}
              icon="shopping-cart"
              onPress={() => { this.addIten(data._id) }}
            />
            <MyButton title="Continuar comprando" onPress={() => { setIten(null); }}/>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    marginBottom: 50,
    alignItems: 'center',
    overflow: 'scroll',
    display: 'flex',
    width: Dimensions.get('window').width * 0.8,
    flex: 1,
  },
  tinyLogo: {
    marginBottom: 10,
    resizeMode: 'contain',
    height: Dimensions.get('window').width * 0.8,
    width: '100%',
  },
  price: {
    fontFamily: 'GlacialIndifference-Bold',
    height: 'auto',
  },
  quant: {
    height: 'auto',
    width: '100%',
  },
  title: {
    fontFamily: 'GlacialIndifference-Regular',
    textAlign: 'left',
    fontSize: 16,
    margin: 10,
    height: 'auto',
    color: '#000',
  },
});
