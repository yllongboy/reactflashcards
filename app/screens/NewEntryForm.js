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
import themes, { colors } from '../styles/Default';
import LinearGradient from 'react-native-linear-gradient';


class NewEntryForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newWord: '',
      definition: ''
    };
  }

  get gradient () {
      return (
          <LinearGradient
            colors={['#16A085', '#F4D03F']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={themes.gradient}
          />
      );
  }

  render() {
    return (
      <ViewContainer>
        {this.gradient}
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
        <View style={styles.inputContainer}>
          <TextField
            label={'Enter a new word'}
            ref={'sit'}
            labelColor={'white'}
            highlightColor={'white'}
            autoCapitalize= "none"
            onChangeText={(text) => {
              this.state.newWord = text;
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextField
            label={'Definition'}
            labelColor={'white'}
            highlightColor={'white'}
            autoCapitalize= "none"
            onChangeText={(text) => {
              this.state.definition = text;
            }}
          />
        </View>


        <Spacer/>
        <View style={[styles.inputContainer, {borderBottomWidth: 0}]}>
          <Button onPress={() => this.saveData()} style={styles.buttonStyle8}>
            Add
          </Button>
        </View>

      </ViewContainer>
    )
  }

  clearInput() {
      this.setState({newWord: '', definition: ''})


  }

  async saveData() {
    if(!this.state.newWord || !this.state.definition) {
      if(Platform.OS == 'android')
        Alert.alert("Error", "All fields are Mandatory.")
      else
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
    borderBottomColor: "rgba(0,0,0,0.5)",
  },
  input: {
    height: 40,
    color: "white",
    padding: 5,
    fontSize: 16
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
  },
  buttonStyle8: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 22,
  },
})
module.exports = NewEntryForm
