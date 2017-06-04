'use strict'

import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  ListView,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeout from 'react-native-swipeout';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

const data = []
var mapObj = new Map()

class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      localStorageDataSource: null,
      collection: null
    }
  }

  componentWillMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      data = keys;
      this.setState({loading: false});
      AsyncStorage.multiGet(keys, (err, stores) => {
       stores.map((result, i, store) => {
         // get at each store's key/value so you can work with it
         let key = store[i][0];
         let value = store[i][1];
         mapObj.set(key, value);
        });
        this.setState({collection: mapObj});
      });
    });
  }

  renderList() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state.localStorageDataSource = ds.cloneWithRows(data)
    console.log(data)
    if(this.state.loading) {
      return (<ActivityIndicator size='large' style={{height:80}} /> )
    } else {
      if (data.length > 0) {
        return (
          <ListView
            style={styles.listContainer}
            initialListSize={20}
            enableEmptySections={true}
            dataSource={this.state.localStorageDataSource}
            renderRow={(data) => { return this._renderRow(data)}}
          />
        )
      } else {
        return (
          <Text style={[styles.listContainer, {textAlign: 'center'}]}>No Records found</Text>
        )
      }
    }
  }

  render() {
    return (
      <ViewContainer>
        <StatusBarBackground/>
        <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={() => this.props.navigator.pop()}>
            <View style={styles.innerHeaderContainer}>
            <Icon name="angle-left" size={20} style={styles.arrowIcon} />
            <Spacer/>
            <Text>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.renderList()}
      </ViewContainer>
    )
  }

  alert() {
    AlertIOS.alert('shit', 'tons of shit');
  }
  _renderRow(data) {
    var swipeoutBtns = [
      {
        text: 'Button',
        right: [
          {
            text: 'Press Me',
            onPress: function(){ this.alert() },
            type: 'primary',
          }
        ],
      }
    ]
    return (

      <TouchableOpacity onPress={(event) => this._navigateToFlashCards(data)}>
        <View style={styles.listItemContainer}>
          <Text style={styles.listItem}>{data}</Text>
        </View>
      </TouchableOpacity>


    )
  }

  async _navigateToFlashCards(data) {
    const value = await AsyncStorage.getItem(data);
    this.props.navigator.push({
      ident: "FlashCards",
      data,
      value,
      collection: this.state.collection
    })
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    flex: 1
  },
  listItemContainer: {
    margin: 10,
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25
  },
  listItem: {
    fontSize: 15,
    color: '#A6AAAB',
    padding: 5
  },
  arrowIcon: {
    color: "green",
  },
  headerContainer: {
    margin: 10,
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25,
    paddingBottom: 10
  },
  innerHeaderContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
})
module.exports = Cards
