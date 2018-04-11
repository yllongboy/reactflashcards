'use strict'
import React, {Component} from 'react'
import { StatusBar, StyleSheet } from 'react-native'

class StatusBarBackground extends Component {

  render() {
    return (
      <StatusBar translucent={true} backgroundColor={'rgba(0, 0, 0, 0.3)'} style={[styles.statusBarBackground, this.props.style || {}]}>
      </StatusBar>
    )
  }
}

const styles = StyleSheet.create({

  statusBarBackground: {
    height: 20,
    backgroundColor: "#1CD8D2"
  }

})

module.exports = StatusBarBackground
