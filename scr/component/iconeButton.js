import React, { Component, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../theme';

const MyIconButton = ( props ) => {
  const { title, onPress, style, icon, disable } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPress : {},
        style,
        disable ? styles.disable : {},
      ]}
      onPress={() => { onPress() }}
    >
      {({ pressed }) => (
          <View style={[ styles.button, pressed ? styles.buttonPress : {}, style, disable ? styles.disable : {}]}
          >
            <Icon style={[styles.icon]} name={icon} size={23} color={pressed ? "#aaa" : "#FFF"} />
            <Text style={[styles.text, pressed ? styles.textPress : {}]}>
              {title || ''}
            </Text>
          </View>
        )
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
    display: 'flex',
    flexDirection: 'row',
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
  disable: {
    backgroundColor: '#bebebe',
  },
  icon: {
    width: 23,
    height: 23,
    marginRight: 20,
  }
});

export default MyIconButton;
