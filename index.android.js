/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AppNavigator from './app/navigation/AppNavigator'

export default class flashcards extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AppNavigator
            initialRoute={{ident: 'Home'}} />
    );
  }
}


AppRegistry.registerComponent('flashcards', () => flashcards);
