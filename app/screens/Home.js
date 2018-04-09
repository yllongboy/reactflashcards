'use strict'

import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  AlertIOS
} from 'react-native'

import Button from '../components/Button';
import ButtonToggle from '../components/ButtonToggle';
import Spacer from '../components/Spacer';
import ViewContainer from '../components/ViewContainer'
import LinearGradient from 'react-native-linear-gradient';
import themes, { colors } from '../styles/Default';
import StatusBarBackground from '../components/StatusBarBackground'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ViewContainer>
        { this.gradient }
        <View style={styles.container}>
          <Button onPress={() => this._navigateToForm()} style={styles.buttonStyle8}>
            New Vocabulary
          </Button>
          <Spacer/>
          <Button onPress={() => this._navigateToCards()} style={styles.buttonStyle8}>
            Flash Cards
          </Button>
        </View>
      </ViewContainer>
    )
  }

  get gradient () {
      return (
          <LinearGradient
            colors={[colors.background0, colors.background1, colors.background2]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={themes.gradient}
          />
      );
  }

  _navigateToForm() {
    this.props.navigator.push({
      ident: "NewEntryForm"
    })
  }
  _navigateToCards() {
    this.props.navigator.push({
      ident: "Cards"
    })
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginLeft: 10,
    alignItems: "stretch",
    justifyContent: "center",
    flex: 1
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical:  9,
    paddingHorizontal: 15,
    overflow: "hidden",
    backgroundColor: "transparent"
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "400"
  },
  buttonStyle8: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 22,
  },
})
module.exports = Home
