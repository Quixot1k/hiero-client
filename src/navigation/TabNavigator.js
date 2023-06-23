import {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialIcons} from "@expo/vector-icons";
import SessionScreen from "../screens/SessionScreen";
import SettingScreen from "../screens/SettingScreen";
import {useStore} from "../store";

export default function TabNavigator() {
  const updateIsLogged = useStore((state) => state.updateIsLogged);
  useEffect(() => {
    updateIsLogged(true)
  }, []);

  const Tab = createBottomTabNavigator();
  return (<Tab.Navigator
    screenOptions={{
      // tabBarShowLabel: false,
      tabBarActiveTintColor: "#000", tabBarInactiveTintColor: "gray",
    }}
  >
    <Tab.Screen
      name="Session"
      component={SessionScreen}
      options={{
        tabBarLabel: "Home", tabBarIcon: ({color}) => (<MaterialIcons name="home" size={26} color={color}/>),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        tabBarLabel: "Settings", tabBarIcon: ({color}) => (<MaterialIcons name="settings" size={26} color={color}/>),
      }}
    />
  </Tab.Navigator>);
}
