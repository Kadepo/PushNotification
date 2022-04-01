import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  showNotification,
  handleScheduleNotification,
} from './src/notification';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const getPushData = async message => {
    PushNotification.localNotification({
      channelId: 'channel-id',
      message: message.notification.body,
      title: message.notification.title,
    });
    console.log('message', message);
  };
  messaging().onMessage(getPushData);
  messaging().setBackgroundMessageHandler(getPushData);
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Push Notification</Text>
      <TouchableOpacity onPress={() => showNotification('hello', 'message')}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Click me to get notification</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          handleScheduleNotification('hello', 'showed after 5sec');
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>
            Click me to get notification after 5sec
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: 'blue',
    borderRadius: 24,
    marginTop: 16,
  },
  buttonTitle: {
    color: 'white',
  },
});
