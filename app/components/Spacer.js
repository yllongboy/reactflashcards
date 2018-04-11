'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native';

export default class Spaer extends Component {
  render() {
    return (
      <View style={styles.spacer}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  spacer: {
    height: 10,
    width: 5
  },
})
