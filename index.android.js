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
  View,
  Button,
  Linking,
} from 'react-native';

export default class NPRStream extends Component {
  componentDidMount() {
    Linking.getInitialURL()
      .then(event => this.handleOpenURL(event))
      .catch(console.error);
    Linking.addEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    console.log('open url', event);
    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button title="HI THERE"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

AppRegistry.registerComponent('NPRStream', () => NPRStream);
