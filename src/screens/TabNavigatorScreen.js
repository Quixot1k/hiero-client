import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import SessionScreen from "./SessionScreen";
import SettingScreen from "./SettingScreen";
import { loggedInChanged } from "../features/generalSlice";

export default function TabNavigatorScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loggedInChanged(true));
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Session"
        component={SessionScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
