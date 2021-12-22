import React from 'react';
import {  Platform, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { initializeApp } from "firebase/app";

import firebase from 'firebase/app'
import { CollectionReference, collection, getDocs } from 'firebase/firestore';

export default class Chat extends React.Component{
  constructor() {
    super()
    this.state = {
      messages: [],
    }

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCCCoZh_np4z81tktClSvO6HFWdQuTwQvQ",
      authDomain: "chatapp-98fab.firebaseapp.com",
      projectId: "chatapp-98fab",
      storageBucket: "chatapp-98fab.appspot.com",
      messagingSenderId: "420473406026",
      appId: "1:420473406026:web:7e8ec10057035bac42dcb3"
    };

  /*  
  How it's supposed to be done

  this.referenceMessages = firebase.firestore().collection("messages");
  */

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Stack overflow fix
  db.collection("messages").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
      });
  });
  }

  /* addMessage() {
    this.referenceMessages.add({
      text: 'Hello Mario',
      user: 'React Native2',
    });
  } */

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
    <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: bgColor}}>
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