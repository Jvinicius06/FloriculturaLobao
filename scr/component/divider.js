import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line}/>
      <Text style={styles.textPlace}> OU </Text>
      <View style={styles.line}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
    width: '100%',
    height: 30,
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  line: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 1,
    height: 2,
    backgroundColor: '#fff',
  },
  textPlace: {
    color: '#fff',

  },
});

export default Divider;
