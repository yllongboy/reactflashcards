'use strict'

import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components'
import Home from '../screens/Home';
import Cards from '../screens/Cards';
import NewEntryForm from '../screens/NewEntryForm';
import FlashCards from '../screens/FlashCards';

class AppNavigator extends Component {

  constructor(props) {
    super(props);
  }

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }
    switch(route.ident) {
      case "Home":
        return (
          <Home
            {...globalNavigatorProps}
          />
        )
      case "Cards":
        return (
          <Cards
            {...globalNavigatorProps}
          />
        )
      case "NewEntryForm":
        return (
          <NewEntryForm
            {...globalNavigatorProps}
          />
        )
        case "FlashCards":
          return (
            <FlashCards
              data={route.data}
              value={route.value}
              collection={route.collection}
              {...globalNavigatorProps}
            />
          )
      default:
        return (
          <Text>Unknown View</Text>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        renderScene={this._renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight })} />
    )
  }
}

module.exports = AppNavigator
