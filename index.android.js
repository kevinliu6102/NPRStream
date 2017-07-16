import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  AsyncStorage,
} from 'react-native';
import qs from 'query-string';
import { CLIENT_ID, SECRET } from 'react-native-dotenv';
import MediaView from './MediaView';
import { convertToTimeStamp } from './utils';
import { tokenAxios } from './axiosInst';

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
      token: null,
      expire: null,
    };
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('tokenInfo')
      .then((tokenInfo) => {
        if (tokenInfo) {
          const values = JSON.parse(tokenInfo);
          this.setState({
            token: values.access_token,
            expire: values.expires_in,
          });
        }
      })
      .catch(err => console.log(err));

    Linking.getInitialURL()
      .then(event => this.handleOpenURL(event))
      .catch(err => console.error('Error getting initial URL:', err));
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.authCode !== null && this.state.authCode !== prevState.authCode) {
      this.requestTokens(this.state.authCode);
    }
  }

  requestTokens(authCode) {
    const params = qs.stringify({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: SECRET,
      code: authCode,
      redirect_uri: 'nprstream://home',
    });

    tokenAxios.post('https://api.npr.org/authorization/v2/token', params, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(({ data }) => {
        data.expires_in = convertToTimeStamp(data.expires_in); // eslint-disable-line
        this.setState({ token: data.access_token, expire: data.expires_in });
        AsyncStorage.setItem('tokenInfo', JSON.stringify(data)).catch(err => console.error(err));
      })
      .catch(err => console.log(err));
  }

  handleOpenURL(event) {
    if (event && event.url) {
      const query = qs.extract(event.url);
      const values = qs.parse(query);
      this.setState({ authCode: values.code });
    }
  }

  handleLogin() { // eslint-disable-line class-methods-use-this
    Linking.openURL(`https://api.npr.org/authorization/v2/authorize?client_id=${CLIENT_ID}&redirect_uri=nprstream%3A%2F%2Fhome&response_type=code&scope=listening.readonly&state=asdf`);
  }

  handleLogout() {
    AsyncStorage.removeItem('tokenInfo');
    this.setState({
      authCode: null,
      token: null,
      expire: null,
    });
  }

  render() {
    return (
      this.state.token && new Date() < this.state.expire
      ? <View>
        <MediaView
          token={this.state.token}
        />
        <Button
          title="Logout"
          onPress={this.handleLogout}
        />
      </View>
      : <View style={styles.container}>
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
