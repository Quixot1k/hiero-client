import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useEffect} from "react";
import messaging from '@react-native-firebase/messaging';
import {Alert} from "react-native";

const queryClient = new QueryClient();
export default function App() {
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus && "enabled");
      }
    }

    // Request permission
    requestUserPermission().catch(err => console.log(err));
    // Register foreground handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    return unsubscribe;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
