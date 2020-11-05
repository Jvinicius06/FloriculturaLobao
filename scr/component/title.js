import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const Title = (props) => {
  const { style } = props;
  const { container, textFF, textLL } = style || {};
  console.log('container - ', container);
  return (
    <View style={[styles.container, container]}>
      <Text style={[styles.textFF, textFF]}>Floricultura</Text>
      <Text style={[styles.textLL, textLL]}>LOBÃO</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFF: {
    fontSize: 23,
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'playlist-script',
  },
  textLL : {
    color: '#333333',
    fontFamily: 'GlacialIndifference-Regular',
  },
});

export default Title;
