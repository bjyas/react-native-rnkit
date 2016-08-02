/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {PopupDatePicker} from '../'

class rnkitExample extends Component {
  constructor(props){
    super(props);
    this.state  = {
      date: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <PopupDatePicker date={this.state.date} onDateChange={d=>this.setState({date: d})}></PopupDatePicker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rnkitExample', () => rnkitExample);
