import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import {useEffect, useRef} from "react";
import registerForPushNotificationsAsync from "./src/utils/registerForPushNotificationsAsync";
// import * as TaskManager from "expo-task-manager";

const queryClient = new QueryClient();

// foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

// background
// const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';
// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({data, error, executionInfo}) => {
//   console.log('Received a notification in the background!');
//   // Do something with the notification data
//   console.log(data)
// });
// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK).then(err => {
//   console.log(err)
// });

export default function App() {
  const navigationRef = useRef(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      navigationRef.current?.navigate("ScheduleScreen_Notification")
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <StackNavigator/>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
