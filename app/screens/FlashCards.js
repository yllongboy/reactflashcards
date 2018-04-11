'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  AlertIOS,
  Platform,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
  Text
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel'
import Spacer from '../components/Spacer'
import SliderEntry from '../components/SliderEntry'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import themes, { colors } from '../styles/Default';
import { BlurView, VibrancyView } from 'react-native-blur'


const { width, height } = Dimensions.get('window');

class FlashCards extends Component {
  constructor(props) {
    super(props)
    this.state= {
      modalVisible: true,
      slider1ActiveSlide: this.props.rowID,
    }
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
      return (
          <SliderEntry
            data={item}
            even={(index + 1) % 2 === 0}
            parallax={true}
            parallaxProps={parallaxProps}
          />
      );
  }

  get gradient () {
      return (
          <LinearGradient
            colors={[colors.background6, colors.background7]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={themes.gradient}
          />
      );
  }

  render() {
    console.log(this.props.data);
    console.log(parseInt(this.props.rowID));
    var slides = this.moveRight();

    return (
      <ViewContainer>
        { this.gradient }
        <StatusBarBackground/>
        <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={() => this.props.navigator.pop()}>
            <View style={styles.innerHeaderContainer}>
            <Icon name="angle-left" size={30} style={styles.arrowIcon} />
            <Spacer/>
            <Text style={styles.headerText}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.definitionWrap}>
          <Carousel
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            firstItem={parseInt(this.props.rowID)}
            renderItem={this._renderItemWithParallax}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.6}
            hasParallaxImages={true}
            enableMomentum={false}
            containerCustomStyle={themes.slider}
            contentContainerCustomStyle={themes.sliderContentContainer}
            scrollEndDragDebounceValue={Platform.OS === 'ios' ? 0 : 100}
            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
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
      let imahe = 'https://d4n5pyzr6ibrc.cloudfront.net/media/27FB7F0C-9885-42A6-9E0C19C35242B5AC/4785B1C2-8734-405D-96DC23A6A32F256B/thul-90efb785-97af-5e51-94cf-503fc81b6940.jpg'
      comp.push({title: key, subtitle: mapper.get(key), illustration: imahe});
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
              data={entry}
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
    // backgroundColor: colors.background1
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
    // margin: 10,
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
