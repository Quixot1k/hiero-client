import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import {useEffect, useRef} from "react";
import registerForPushNotificationsAsync from "./src/utils/registerForPushNotificationsAsync";

const queryClient = new QueryClient();

// foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

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
      console.log(response);
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
