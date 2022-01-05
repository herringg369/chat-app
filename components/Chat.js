import React from 'react';
import {  Platform, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'

import firebase from 'firebase'
import 'firebase/firestore'

export default class Chat extends React.Component{
  constructor() {
    super()

    this.state = {
      messages: [],
      uid: 0,
      user: "",
      text: "",
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

  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  this.referenceChatMessages = firebase.firestore().collection("messages");
}

async getMessages () {
  let messages = ''
  try {
    messages = await AsyncStorage.getItem('messages') || []
    this.setState({
      messages: JSON.parse(messages)
    })
  } catch (error) {
    console.log(error.message)
  }
}

async saveMessages () {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages))
  } catch (error) {
    console.log(error.message)
  }
}

async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages')
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message)
  }
}

/*
async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}
*/

componentDidMount() {
  const { name } = this.props.route.params

  this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      firebase.auth().signInAnonymously();
    }
    this.setState({
      uid: user.uid,
    });
    this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
  });
    
      //update user state with currently active user data
   this.getMessages()

   NetInfo.fetch().then(connection => {
     if (connection.isConnected) {
       console.log('online')
     } else {
       console.log('offline')
     }
   })
}

// Renders the basic app layout when the user is not online
renderInputToolbar(props) {
  if (this.state.isConnected == false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
}

  // previousState refers to messages before they're changed
  // append() is from gifted-chat, append() = appends new messages to the message object

  onCollectionUpdate = (querySnapshot) => {
    const messages = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      messages.push({
        text: data.text,
        createdAt: data.createdAt.toDate(),
        name: data.name,
      })
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.saveMessages();
    });
    this.addMessage()
  }

  /*
  onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }), () => {
    this.saveMessages();
  });
}
  */

  addMessage() {
    const message = this.state.messages
    this.referenceChatMessages.add({
      user: this.state.user,
      text: this.state.text
    });
  } 

  componentWillUnmount() {
    this.authUnsubscribe()
    this.unsubscribe()
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

    <button onClick={this.deleteMessages}>Delete Messages</button>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

// this.props.navigation.setOptions({ title: name });