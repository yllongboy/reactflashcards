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
import LinearGradient from 'react-native-linear-gradient';
import Spacer from '../components/Spacer';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import themes, { colors } from '../styles/Default';

const data = []
var mapObj = new Map()

class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      localStorageDataSource: null,

    }
    var collection = null;
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
        this.collection = mapObj;
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
            key={this.data}
            style={styles.listContainer}
            initialListSize={20}
            enableEmptySections={true}
            dataSource={this.state.localStorageDataSource}
            renderRow={(data, sectionID, rowID) => { return this._renderRow(data,rowID)}}
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
        {this.gradient}
        <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={() => this.props.navigator.pop()}>
            <View style={styles.innerHeaderContainer}>
            <Icon name="angle-left" size={30} style={styles.arrowIcon} />
            <Spacer/>
            <Text style={styles.headerText}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.renderList()}
      </ViewContainer>
    )
  }

  get gradient () {
      return (
          <LinearGradient
            colors={[colors.background3, colors.background4, colors.background5]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={themes.gradient}
          />
      );
  }

  _alert() {
    AlertIOS.alert('shit', 'tons of shit');
  }
  _renderRow(data, rowID) {
    var swipeoutBtns = [
      {
        text: 'Delete',
        autoClose: true,
        backgroundColor: 'red',
        close: 'true',
        onPress: async function() {
          await AsyncStorage.removeItem(data);
          this.collection.delete(data);
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          this.state.localStorageDataSource = ds.cloneWithRows(this.collection);

          this._alert();
        }.bind(this),
        right: [
          {
            text: 'Press Me',
            type: 'primary',
          }
        ],
      }
    ]
    return (
      <Swipeout right={swipeoutBtns} autoClose={true}  backgroundColor="transparent" onClose={() => console.log('s')}>
        <TouchableOpacity onPress={(event) => this._navigateToFlashCards(data,rowID)}>
          <View style={styles.listItemContainer}>
            <Text style={styles.listItem}>{data}</Text>
          </View>
        </TouchableOpacity>
      </Swipeout>


    )
  }

  async _navigateToFlashCards(data,rowID) {
    const value = await AsyncStorage.getItem(data);
    console.log("shit", rowID);
    this.props.navigator.push({
      ident: "FlashCards",
      data,
      value,
      rowID,
      collection: this.collection
    })
  }
}

const styles = StyleSheet.create({
  listContainer: {
    // marginTop: 20,
    flex: 1
  },
  listItemContainer: {
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25
  },
  listItem: {
    fontSize: 15,
    // color: '#A6AAAB',
    color: 'white',
    padding: 5
  },
  arrowIcon: {
    color: "white",
    fontWeight: 'bold'
  },
  headerText: {
    color: 'white',
    fontSize: 20
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
