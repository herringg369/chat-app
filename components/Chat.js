import React from 'react';
import {  Platform, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

export default class Chat extends React.Component{
  constructor() {
    super()
    this.state = {
      messages: [],
    }
  }

  // message format

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'http://placeimg.com/140/140/any',
          },
        },

        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ]
    })
  }

  /*
     {
    _id: 2,
    text: 'This is a system message',
    createdAt: new Date(),
    system: true,
   },
  */

  // previousState refers to messages before they're changed
  // append() is from gifted-chat, append() = appends new messages to the message object

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
  }

// Gifted chat has it's own component that is provided with user info, messages, and what to do when send is pressed

/*
{ Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}

allows for a fix for android phones not loading keyboard correctly
*/

  render() {

    let name = this.props.route.params.name;

    const { bgColor } = this.props.route.params;

  return (
    <View style={{ flex: 1, width: "100%", height: "100%"}}>
    <GiftedChat 
    messages={this.state.messages}
    onSend={messages => this.onSend(messages)}
    user={{
      _id: 1
    }} />

    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

// this.props.navigation.setOptions({ title: name });