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

import Input from '../input';
import { theme } from '../../theme';
import { getUrlImage } from '../../models/itens';

const Card = (props) => {
  const { data } = props;
  return (
    <Pressable style={styles.card} onPress={() => {
      console.log(data.name);
    }}>
      <Image
        style={styles.tinyLogo}
        source={{uri: getUrlImage(data.image_path)}}
      />
      <Text>{data.name}</Text>
      <Text>{`R$: ${data.price.toFixed(2)}`}</Text>
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
    const { data } = this.props;
    const re = new RegExp(searchText, 'giu');
    const dataFilter = searchText.length === 0 ? data : data.filter((iten) => re.test(iten.name));
    return (
      <View style={styles.container}>
        <Search onChange={this.onChangeSeach} />
        <ScrollView>
          <View style={styles.myView}>
            {
              data.length == 0 ? <ActivityIndicator size="large" color="#0000ff" /> :
              dataFilter.map((iten) => <Card key={iten.name} data={iten} />)
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
  scroll: {

  },
  search: {
    paddingHorizontal: 10,
    width: '100%',
    height: 60,
    backgroundColor: theme.color.primary,
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
