import React, { Component, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import { theme } from '../theme';

const MyButton = ( props ) => {
  const { title, onPress, style, disable } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPress : {},
        style,
        disable ? styles.disable : {},
      ]}
      onPress={() => { onPress() }}>
      {({ pressed }) =>
        <Text style={[styles.text, pressed ? styles.textPress : {}]}>
          {title || ''}
        </Text>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 45,
    backgroundColor: theme.color.secondary,
    borderRadius: 10,
    padding: 11,
    alignItems: 'center',
    marginVertical: 8,
  },
  disable: {
    backgroundColor: '#efefef',
  },
  buttonPress: {
    borderRadius: 10,
    width: '98%',
  },
  textPress: {
    color: '#aaa',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'GlacialIndifference-Regular',
  },
});

export default MyButton;
