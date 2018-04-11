'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';

class Button extends Component {

  render() {
    let textStyle = [styles.buttonText, this.props.textStyle];
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={() => this.onPress()}
        style={[styles.button, this.props.style]}
      >
        <Text style={textStyle}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    )
  }

  onPress() {
    if(this.props.enabled) {
      this.props.onPress();
    }
  }

}

Button.propTypes = {
  onPress: PropTypes.func,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  activeOpacity: PropTypes.number,
  enabled: PropTypes.bool,
  children: PropTypes.string
}

Button.defaultProps = {
  onPress: () => {},
  style: {},
  textStyle: {},
  activeOpacity: 0.8,
  enabled: true
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    paddingVertical:  9,
    paddingHorizontal: 15,
    overflow: "hidden",
    backgroundColor: "transparent"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400"
  }
});

module.exports = Button
