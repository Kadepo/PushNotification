import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const showNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    title: title,
    message: message,
  });
};

const handleScheduleNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    channelId: 'channel-id',
    title: title,
    message: message,
    date: new Date(Date.now() + 5 * 1000),
  });
};

export { showNotification, handleScheduleNotification };
