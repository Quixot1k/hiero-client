import { Button } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import InfoScreen from "./InfoScreen";
import IntSpecScreen from "./IntSpecScreen";
import CapacityScreen from "./CapacityScreen";
import LocationScreen from "./LocationScreen";
import AvatarScreen from "./AvatarScreen";

export default function Home() {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const stackStyle = {
    headerRight: () => (
      <Button
        onPress={() => {
          console.log("goto LoginScreen and claer navigation stack");
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "LoginScreen" }],
            })
          );
        }}
        title="Home"
        color="#000"
      />
    ),
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={stackStyle}
      />
      <Stack.Screen
        name="IntSpecScreen"
        component={IntSpecScreen}
        options={stackStyle}
      />
      <Stack.Screen
        name="CapacityScreen"
        component={CapacityScreen}
        options={stackStyle}
      />
      <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={stackStyle}
      />
      <Stack.Screen name="AvatarScreen" component={AvatarScreen} />
    </Stack.Navigator>
  );
}
