import React, { Component } from 'react';
import {
  Button,
} from 'react-native';
import axios from 'axios';
import Sound from 'react-native-sound';
import PropTypes from 'prop-types';

class MediaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: null,
      currTrack: null,
      index: 0,
      paused: false,
    };

    this.getRecommendations = this.getRecommendations.bind(this);
    this.playCurrTrack = this.playCurrTrack.bind(this);
    this.handleBtnPress = this.handleBtnPress.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    if (this.props.token) {
      this.getRecommendations(this.props.token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const notHaveTrack = this.state.currTrack === null;
    const recommendationsChanged = prevState.recommendations !== this.state.recommendations;
    // Condition to start playing
    if (notHaveTrack && recommendationsChanged) {
      this.changeTrack();
    }
  }

  componentWillUnmount() {
    if (this.state.currTrack) {
      this.state.currTrack.release();
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

  changeTrack() {
    const uri = this.state.recommendations[this.state.index].links.audio[0].href;
    const currTrack = new Sound(uri, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('Track error:', err);
      } else {
        console.log('Playing next track');
        this.playCurrTrack(currTrack);
      }
    });
    this.setState({ currTrack, index: this.state.index + 1 });
  }

  playCurrTrack(currTrack) {
    console.log(currTrack.getDuration());
    currTrack.play(this.handlePlay);
  }

  handlePlay(success) {
    if (success && this.state.index < this.state.recommendations.length - 1) {
      this.changeTrack();
    } else {
      console.log('Failed to play audio');
    }
  }

  handleBtnPress() {
    this.setState({ paused: !this.state.paused });
    if (this.state.paused) {
      this.playCurrTrack(this.state.currTrack);
    } else {
      this.state.currTrack.pause();
    }
  }

  render() {
    return (
      <Button
        title={this.state.paused ? 'Play' : 'Pause'}
        onPress={this.handleBtnPress}
      />
    );
  }
}

MediaView.propTypes = {
  token: PropTypes.string.isRequired,
};

export default MediaView;
