import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import Input from '../input';
import { theme } from '../../theme';
import { getUrlImage } from '../../models/itens';

const Card = (props) => {
  const { data, setIten } = props;
  const Eff = data.quant > 0 ? View : Grayscale;
  return (
    <Pressable style={styles.card} onPress={() => {
      setIten(data._id);
    }}>
      <Eff>
        <Image source={{uri: getUrlImage(data.image_path)}} style={styles.tinyLogo} />
      </Eff>
      <Text>{data.name}</Text>
      <Text>{data.quant > 0 ? `R$: ${data.price.toFixed(2)}` : 'Item não mais disponivel!'}</Text>
    </Pressable>
  );
}

const Search = (props) => {
  const { onChange } = props;
  return (
    <View style={styles.search}>
      <Input onChange={onChange} placeholder="⠀🔍 O que você procura ?"/>
    </View>
  );
}

export default class Itens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.onChangeSeach = this.onChangeSeach.bind(this);
  }

  onChangeSeach(value) {
    this.setState({ searchText: value });
  }

  render() {
    const { searchText } = this.state;
    const { data, setIten } = this.props;
    const loading = data.length == 0;
    const re = new RegExp(searchText, 'giu');
    const dataFilter = searchText.length === 0
    ? data.sort((a, b) => {
      if (b.name > a.name) {
        return -1;
      }
      if (b.name < a.name) {
        return 1;
      }
      return 0;
    })
    : data.filter((iten) => re.test(iten.name));
    return (
      <View style={styles.container}>
        <Search onChange={this.onChangeSeach} />
        <ScrollView>
          <View style={[styles.myView, loading ? styles.myViewLoading : {}]}>
            {
              loading ? <ActivityIndicator size="large" color="#aaa" /> :
              dataFilter.map((iten) => <Card key={iten.name} data={iten} setIten={setIten} />)
            }
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
    backgroundColor: '#fff',
  },
  off: {
    display: 'none',
  },
  search: {
    paddingHorizontal: 10,
    width: '100%',
    height: 60,
    backgroundColor: theme.color.primary,
  },
  myViewLoading: {
    marginTop: Dimensions.get('window').height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myView: {
    margin: 10,
    marginBottom: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
  },
  card: {
    width: '49%',
    marginVertical: 20,
  },
  tinyLogo: {
    height: Dimensions.get('window').width / 2,
    resizeMode: "cover"
  },
});
