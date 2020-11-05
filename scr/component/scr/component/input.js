import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(text) {
    const { onChange } = this.props;
    this.setState({text});
    if (onChange) onChange(text);
  }

  render () {
    const { text } = this.state;
    const { placeholder } = this.props;
    return (
      <View style={styles.vinput} >
        <TextInput
          value={text}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={this.onChange}
          />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  vinput: {
    width: '100%',
    height: 53,
    paddingVertical: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#000',
  },
  textPlace: {
    color: '#aaa',
  },
});

export default Input;
