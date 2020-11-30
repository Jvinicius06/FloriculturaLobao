import React, { Component, useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ToastAndroid,
  BackHandler,
  ScrollView,
} from 'react-native';

import { theme } from '../../theme';
import Itens from '../../component/home/itens';
import Iten from '../../component/home/iten';
import MyButton from '../../component/button';

import { getAllItens, getUrlImage } from '../../models/itens';
import myCar from '../../models/car';

class CartIten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itenData: null,
    };
    this.padding;
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { data } = this.props;
    this.padding = myCar.getDataIten(data.iten)
      .then((itenData) => {
        console.log('itenData -', itenData);
        this.setState({ itenData });
      })
  }

  // const [itenData, setItenData] = useState(null);
  // const { data } = props;
  // let padding;
  // useEffect(() => {
  //
  //   return function cleanup() {
  //     padding = null;
  //   };
  // },[itenData]);

  getPrice() {
    const { itenData } = this.state;
    const { data } = this.props;
    const price = parseFloat(itenData.price);
    const quant = parseFloat(data.quant);
    return parseFloat(price * quant).toFixed(2);
  }

  render() {
    const { itenData } = this.state;
    const { data } = this.props;

    if (itenData === null) return null;
    return (
      <View style={styles.carIten}>
        <Image
        style={styles.tinyLogo}
        source={{uri: getUrlImage(itenData.image_path)}}
        />
        <View style={styles.divTitle}>
          <Text style={styles.carItenTitle} ellipsizeMode='tail' numberOfLines={1}>{itenData.name}</Text>
          <Text style={styles.carItenTitle}>{`R$: ${this.getPrice()}`}</Text>
        </View>
        <View style={styles.carItenQuant}>
          <MyButton title="-" onPress={() => myCar.removeIten(data.iten)} styleView={styles.carItenQuantButton} style={styles.carItenQuantButton2}/>
          <Text style={styles.carItenQuantTitle}>{data.quant}</Text>
          <MyButton title="+" onPress={() => myCar.addIten(data.iten)} styleView={styles.carItenQuantButton} style={styles.carItenQuantButton2} />
        </View>
      </View>
    );
  }
}

export default class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      iten: null,
    };
    this.setIten = this.setIten.bind(this);
    this.pushBack = this.pushBack.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.getAllItens();
    BackHandler.addEventListener("hardwareBackPress", this.pushBack);
    myCar.on('update', this.update);
  }

  update() {
    this.setState({});
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.pushBack);
    myCar.off('update', this.update);
    myCar.clear();
  }

  pushBack() {
    const { setPage } = this.props;
    setPage('home');
    return true;
  }

  getAllItens() {

  }

  setIten(iten) {
    this.setState({ iten });
  }

  render() {
    const { data, iten } = this.state;
    const dataIten = data.filter((it) => it._id === iten);
    const dd = myCar.getItens();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTT}>Carrinho</Text>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View>
              {
                dd.length > 0 ?
                (dd.map((iten) => <CartIten key={iten.iten} data={iten}/>)) :
                (
                  <View>
                    <Text style={styles.notIten} numberOfLines={2}> Nenhum Iten Adiciona ao seu carrinho!</Text>
                    <MyButton title="Voltar para loja!" onPress={this.pushBack} style={{backgroundColor: theme.color.primary, marginTop: 10}} />
                  </View>
                )
              }
            </View>
          </ScrollView>
          <View style={styles.total}>
            {
              dd.length > 0 ?
              (
                <View style={styles.totalContent}>
                  <Text>Total R$:{`${myCar.getTotal()}`}</Text>
                  <MyButton title="Finalizar compra" onPress={this.pushBack} style={{backgroundColor: theme.color.primary, marginTop: 10}} />
                </View>
              ) : null
            }
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
    alignItems: 'center',
    flex: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  total: {
    height: 115,
    paddingTop: 15,
    alignItems: 'center',
    borderTopColor: '#efefef',
    borderTopWidth: 1,
  },
  totalContent: {
    width: '90%',
  },
  notIten: {
    width: 200,
    textAlign: 'center',
    fontSize: 17,
    marginTop: 30,
  },
  tinyLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  divTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carItenTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: 'left',
    marginHorizontal: 15,
    height: 30,
    width: 180,
  },
  carIten: {
    height: 70,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    display: 'flex',
    flexDirection: 'row',
  },
  carItenQuant: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    marginLeft: 10,
    marginRight: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  carItenQuantTitle: {
    textAlign: 'center',
    width: 27,
  },
  carItenQuantButton: {
    width: 40,
    height: 40,
    margin: 0,
  },
  carItenQuantButton2: {
    marginTop: 0,
    width: '100%',
    height: '100%',
    padding: 6,
    backgroundColor: theme.color.primary,
  },
  headerTT: {
    paddingTop: 7,
    fontFamily: theme.text.family,
    fontSize: 33,
    color: '#fff',
    paddingLeft: 13,
  },
  header: {
    paddingHorizontal: 10,
    width: '100%',
    height: 60,
    backgroundColor: theme.color.primary,
  },
});
