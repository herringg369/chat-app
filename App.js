import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from "./components/Start"
import Chat from "./components/Chat"
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component{
  constructor() {
    super()

  }

  render() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Start">
    <Stack.Screen name="Start" component={Start}></Stack.Screen>
    <Stack.Screen name="Chat" component={Chat}></Stack.Screen>
    </Stack.Navigator>

    <View>

    </View>
    </NavigationContainer>
  );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});
