import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
} from 'react-native';
import { CLIENT_ID } from 'react-native-dotenv';
import { extractQuery, parseAuthCode } from './utils';

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

export default class NPRStream extends Component {
  constructor() {
    super();
    this.state = {
      authCode: null,
    };
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    Linking.getInitialURL()
      .then(url => this.handleOpenURL(url))
      .catch(err => console.error('Error getting initial URL:', err));
    Linking.addEventListener('url', this.handleOpenURL);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.authCode !== null && this.state.authCode !== prevState.authCode) {
  //     this.requestTokens(this.state.authCode);
  //   }
  // }

  handleOpenURL(url) {
    if (url) {
      const query = extractQuery(url);
      const authCode = parseAuthCode(query);
      console.log('auth code is', authCode);
      this.setState({ authCode });
    }
  }

  handleLogin() { // eslint-disable-line class-methods-use-this
    Linking.openURL(`https://api.npr.org/authorization/v2/authorize?client_id=${CLIENT_ID}&redirect_uri=nprstream%3A%2F%2Fhome&response_type=code&scope=identity.readonly&state=asdf`);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button
          title="Login to NPR"
          onPress={this.handleLogin}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('NPRStream', () => NPRStream);
