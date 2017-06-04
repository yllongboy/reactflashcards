'user strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  AlertIOS,
  AsyncStorage,
  Text
} from 'react-native'

import TextField from 'react-native-md-textinput';
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

class NewEntryForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newWord: '',
      definition: ''
    };
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
        <View style={styles.inputContainer}>
          <TextField
            label={'Enter a new word'}
            ref={'sit'}
            highlightColor={'#009688'}
            autoCapitalize= "none"
            onChangeText={(text) => {
              this.state.newWord = text;
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextField
            label={'Definition'}
            highlightColor={'#009688'}
            autoCapitalize= "none"
            onChangeText={(text) => {
              this.state.definition = text;
            }}
          />
        </View>


        <Spacer/>
        <View style={[styles.inputContainer, {borderBottomWidth: 0}]}>
          <Button onPress={() => this.saveData()}>
            Add
          </Button>
        </View>

      </ViewContainer>
    )
  }

  clearInput() {
      this.setState({newWord: '', definition: ''})


  }

  showPopUp(message) {

  }
  async saveData() {
    if(!this.state.newWord || !this.state.definition) {
      AlertIOS.alert("All fields are Mandatory.")
    } else {

        try {
          let value = await AsyncStorage.getItem(this.state.newWord);
          if (!value) {
            try {
              await AsyncStorage.setItem(this.state.newWord, this.state.definition);
              this.clearInput();
              Alert.alert(
                'Alert Title','atak'
              )
            } catch (error) {
              AlertIOS.alert("Error occurred while saving...", error.toString());
            }
          } else {
            AlertIOS.alert(this.state.newWord, "already exist.");
          }
        } catch (error) {
          AlertIOS.alert(error.toString())
        }
    }
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
    borderBottomColor: "rgba(92,94,94,0.5)",
  },
  input: {
    height: 40,
    color: "#A6AAAB",
    padding: 5,
    fontSize: 16
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
module.exports = NewEntryForm
