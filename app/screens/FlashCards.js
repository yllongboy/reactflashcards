'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  AlertIOS,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
  Text
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel'
import Spacer from '../components/Spacer'
import SliderEntry from '../components/SliderEntry'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

const horizontalMargin = 20;
const slideWidth = 280;
const { width, height } = Dimensions.get('window');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

class FlashCards extends Component {
  constructor(props) {
    super(props)
    this.state= {
      modalVisible: true
    }
  }

  render() {
    console.log(this.props.data);
    var slides = this.moveRight();

    return (
      <ViewContainer>
        <StatusBarBackground/>
        <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={() => this.props.navigator.pop()}>
            <View style={styles.innerHeaderContainer}>
            <Icon name="angle-left" size={20} style={styles.arrowIcon} />
            <Spacer/>
            <Text>Backshit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.definitionWrap}>
          <Carousel
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            firstItem={4}
          >
              { slides }
          </Carousel>

        </View>
      </ViewContainer>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderModal() {
    this.setModalVisible(true)
  }

  moveRight() {
    let mapper = this.props.collection;
    var comp = []
    for (let key of mapper.keys()) {
      console.log(mapper.get(key), key);
      comp.push({title: mapper.get(key), subtitle: key});
    }
    // console.log('move right', data);
    var DynamicContent = comp.map(function(list) {
      return (
        <View style={{ flex:1}} key={list.type}>

          <View style={{flex:1, width:width, alignItems:'center', justifyContent:'center',}}>
            <Text>{list.name}</Text>
          </View>
        </View>
      );
    });

    return comp.map((entry, index) => {
        return (
            <SliderEntry
              key={`carousel-entry-${index}`}
              even={(index + 1) % 2 === 0}
              {...entry}
            />
        );
    });

  }
}

const styles = StyleSheet.create({
  mainContainer: {

  },
  wordContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  definitionWrap: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    margin: 20
  },
  arrowIcon: {
    color: "green"
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

module.exports = FlashCards
