'use strict'

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Easing,
  Platform
} from 'react-native';

class Button extends Component {

  constructor(props, context) {
      super(props, context);

      const maxOpacity = 0.12;

      this.state = {
          maxOpacity,
          scaleValue: new Animated.Value(0.01),
          opacityValue: new Animated.Value(maxOpacity),
          animatedValue: new Animated.Value(0),
          buttonOpacity: new Animated.Value(1),
      };

      this.renderRippleView = this.renderRippleView.bind(this);
      this.onPressedIn = this.onPressedIn.bind(this);
      this.onPressedOut = this.onPressedOut.bind(this);
      this.onPressedOutShrinkButton = this.onPressedOutShrinkButton.bind(this);
  }

  onPressedIn() {
      Animated.timing(this.state.scaleValue, {
          toValue: 100,
          duration: 8000,
          easing: Easing.bezier(0.0, 0.0, 0.2, 1),
          useNativeDriver: Platform.OS === 'android',
      }).start();
  }
  onPressedOutShrinkButton() {
    this.state.animatedValue.setValue(0)
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS === 'android',
        easing: Easing.Linear
      }
    ).start(() => {this.onPressedIn();this.onPressedOut()})
  }
  onPressedOut() {
      Animated.timing(this.state.opacityValue, {
          toValue: 0,
          useNativeDriver: Platform.OS === 'android',
      }).start(() => {
          this.state.scaleValue.setValue(0.01);
          this.state.opacityValue.setValue(this.state.maxOpacity);
          this.state.buttonOpacity.setValue(0)
          this.onPress();
      });
  }
  renderRippleView() {
      const { size, color } = this.props;
      const { scaleValue, opacityValue } = this.state;

      const rippleSize = size * 2;

      return (
          <Animated.View
              style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: rippleSize,
                  height: rippleSize,
                  borderRadius: rippleSize / 2,
                  transform: [{ scale: scaleValue }],
                  opacity: opacityValue,
                  backgroundColor: color || 'black',
              }}
          />
      );
  }

  render() {
    const { name, size, color, ripple } = this.props;
    const containerSize = size * 2;
    const iconContainer = { width: containerSize, height: containerSize };
    const buttonWidth =  Dimensions.get('window').width - 40;

    let textStyle = [styles.buttonText, this.props.textStyle];
    if(ripple) {
      const movingMargin = this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [buttonWidth, 40]
      })
      const marginLeft = this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [10, buttonWidth / 2]
      })
      const marginRight = this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [10, buttonWidth / 2]
      })
      const borderRad = this.state.animatedValue.interpolate({
        inputRange: [0, 0.5 , 1],
        outputRange: [0, 10, 20]
      })
      const opacity = this.state.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.5, 0]
      })
      return (
          <TouchableWithoutFeedback
            onPressedIn={this.onPressedIn}
            onPressOut={this.onPressedOutShrinkButton}
            style={[styles.button, this.props.style]}
          >
              <Animated.View
                style={[styles.button,{
                  borderRadius: borderRad,
                  marginRight: marginRight,
                  marginLeft: marginLeft,
                  height: 40,
                  opacity: this.state.buttonOpacity,
                  width: movingMargin}]} >
                {this.renderRippleView()}
                <Animated.Text
                  style={[textStyle, {opacity}]} >
                    {this.props.children}
                </Animated.Text>
              </Animated.View>
          </TouchableWithoutFeedback>
      );
    } else {
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
  ripple: PropTypes.bool,
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
    backgroundColor: "#7EB3C4"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400"
  },
  iconContainer: {
      margin: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#7EB3C4"
  },
});

module.exports = Button
