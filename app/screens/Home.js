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
import Spacer from '../components/Spacer';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ViewContainer>
        <StatusBarBackground />
        <View style={styles.container}>
          <Button
            onPress={() => this._navigateToForm()}
            ripple={true}
            color="blue"
            size="20"
            >
            New Vocabulary
          </Button>
          <Spacer/>
          <Button
            onPress={() => this._navigateToCards()}
            ripple={true}
            color="green"
            size="20"
          >
            Flash Cards
          </Button>
        </View>
      </ViewContainer>
    )
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
    backgroundColor: "#7EB3C4"
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "400"
  }
})
module.exports = Home
