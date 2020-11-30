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
  const { title, onPress, style, disable, styleText, styleView } = props;
  return (
    <View style={[styles.view, styleView]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPress : {},
          style,
          disable ? styles.disable : {},
        ]}
        onPress={() => { if (onPress) onPress() }}>
        {({ pressed }) =>
          <Text style={[styles.text, pressed ? styles.textPress : {}, styleText]}>
            {title || ''}
          </Text>
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 45,
    backgroundColor: theme.color.secondary,
    alignItems: 'center',
    borderRadius: 10,
    padding: 11,
    marginVertical: 8,
  },
  view: {
    // padding: 11,
    width: '100%',
  },
  disable: {
    backgroundColor: '#efefef',
  },
  buttonPress: {
    borderRadius: 10,
    width: '100%',
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
