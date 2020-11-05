import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import car from '../models/car';

class CarIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      len: 0,
    };
    this.update = this.update.bind(this);
    car.on('update', this.update);
  }

  update() {
    this.setState({});
  }

  componentWillUnmount() {
    car.off('update', this.update);
  }

  render() {
    const { onPress } = this.props;
    const len = car.length();
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <Icon style={[styles.icon, styles.left]} name="shopping-cart" size={35} color="#FFF" />
        {
          len > 0 ?
          (<View style={styles.not}>
            <Text style={styles.notText}>{len}</Text>
          </View>) : null
        }
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginLeft: 'auto',
    marginRight: 10,
    paddingTop: 7,
  },
  not: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 10,
    left: 26,
  },
  notText: {
    marginTop: 1,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'GlacialIndifference-Bold',
    fontSize: 11,
  },
});

export default CarIcon;
