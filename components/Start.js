import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
const backgroundImage = require("./BackgroundImage.png")

export default class Start extends React.Component{
  constructor() {
    super()
    
    this.state = {
        name: "",
        bgColor: ""
    }
  }

  changeBgColor(newColor) {
      this.setState({
          bgColor: newColor,
      })
  }

  colors = {
      color1: "#90ee90",
      color2: "#ADD8E6",
      color3: "#8A95A5",
      color4: "#FFD580",
  }
  /*
    <Button title="Start Chatting" style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF", backgroundColor: "#757083"}}
    onPress={() => 
        this.props.navigation.navigate('Chat', {
             name: this.state.name })}>
        </Button>

    Adds the entered username to the header by using the state
  */
  render() {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>

    <View style={styles.container}>
    <TextInput placeholder="Your Name:" 
    style={{ fontSize: 16, fontWeight: "300", color: "#757083", opacity: 0.5, }}
    value={this.state.name}
    onChangeText={(text) => this.setState({ name: text })}></TextInput>
    <Text style={styles.colorTitle}>Choose Background Color</Text>

    <View style={styles.colorsList}>
        <TouchableOpacity onPress={() => this.changeBgColor(this.colors.color1)}>
        <View style={styles.color1}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeBgColor(this.colors.color2)}>
        <View style={styles.color2}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeBgColor(this.colors.color3)}>
        <View style={styles.color3}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeBgColor(this.colors.color4)}>
        <View style={styles.color4}></View>
        </TouchableOpacity>
    </View>
    <Button title="Start Chatting" style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF", backgroundColor: "#757083"}}
    onPress={() => 
        this.props.navigation.navigate('Chat', {
             name: this.state.name,
             bgColor: this.state.bgColor
             })}>
        </Button>
    </View>
    </ImageBackground>
  );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      alignItems: "center",
      justifyContent: "space-around",
  },

  background: {
    flex: 1,

  },

  colorsList: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  color1: {
    backgroundColor: "#90ee90",
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  color2: {
    backgroundColor: "#ADD8E6",
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  color3: {
    backgroundColor: "#8A95A5",
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  color4: {
    backgroundColor: "#FFD580",
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  colorTitle: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "300",
    color: "#757083",
    opacity: 1
  }
});


/*
“Your name”: font size 16, font weight 300, font color #757083, 50% opacity
● “Choose background color”: font size 16, font weight 300, font color #757083, 100% opacity
● Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE
● Start chatting button: font size 16, font weight 600, font color #FFFFFF, button color #757083
*/