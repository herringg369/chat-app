import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Chat extends React.Component{
  constructor() {
    super()

  }

  render() {

    let name = this.props.route.params.name;

    const { bgColor } = this.props.route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: bgColor ? bgColor : "white" }}>
    <Text>{this.props.navigation.setOptions({ title: name })}</Text>

    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

// this.props.navigation.setOptions({ title: name });