import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import Sound from 'react-native-sound';
import PropTypes from 'prop-types';

class MediaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: null,
      currSong: null,
      index: 0,
    };

    this.getRecommendations = this.getRecommendations.bind(this);
    this.playCurrSong = this.playCurrSong.bind(this);
  }

  componentDidMount() {
    if (this.props.token) {
      this.getRecommendations(this.props.token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const notHaveSong = this.state.currSong === null;
    const recommendationsChanged = prevState.recommendations !== this.state.recommendations;
    // Condition to start playing
    if (notHaveSong && recommendationsChanged) {
      this.changeSong();
    }
  }

  componentWillUnmount() {
    if (this.state.currSong) {
      this.state.currSong.release();
    }
  }

  getRecommendations(token) {
    const app = this;
    axios.get('https://api.npr.org/listening/v2/recommendations?channel=npr', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        app.setState({ recommendations: data.items });
      })
      .catch(err => console.error('Error fetching recs:', err));
  }

  changeSong() {
    const uri = this.state.recommendations[this.state.index].links.audio[0].href;
    const currSong = new Sound(uri, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('Song error:', err);
      } else {
        this.playCurrSong(currSong);
      }
    });
    this.setState({ currSong, index: this.state.index + 1 });
  }

  playCurrSong(currSong) {
    console.log(currSong.getDuration());
    currSong.play((success) => {
      console.log(success);
      console.log(success ? 'Successful' : 'Fail');
    });
  }

  render() {
    return (
      <View>
        <Text
          title="Logged In"
        />
      </View>
    );
  }
}

MediaView.propTypes = {
  token: PropTypes.string.isRequired,
};

export default MediaView;
