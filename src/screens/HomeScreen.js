import { Button } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import InfoScreen from "./InfoScreen";
import IntSpecScreen from "./IntSpecScreen";
import CapacityScreen from "./CapacityScreen";
import LocationScreen from "./LocationScreen";
import AvatarScreen from "./AvatarScreen";
import ProfileScreen from "./ProfileScreen";

export default function Home() {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const { role } = useSelector((state) => state.general);

  const headRightButton = () => (
    <Button
      onPress={() => {
        console.log("goto HomeScreen and claer navigation stack");
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
  );

  return (
    <Stack.Navigator>
      {/* General */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: "Sign Up", headerRight: headRightButton }}
      />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{ title: "Information", headerRight: headRightButton }}
      />
      <Stack.Screen
        name="IntSpecScreen"
        component={IntSpecScreen}
        options={{
          title: role == "customer" ? "Interest" : "Speciality",
          headerRight: headRightButton,
        }}
      />
      <Stack.Screen
        name="CapacityScreen"
        component={CapacityScreen}
        options={{
          title: role == "customer" ? "Split the cost" : "Grow your clientele",
          headerRight: headRightButton,
        }}
      />
      <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{ title: "Location", headerRight: headRightButton }}
      />
      <Stack.Screen
        name="AvatarScreen"
        component={AvatarScreen}
        options={{
          title: "Upload a profile picture",
          headerRight: headRightButton,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Your profile", headerRight: headRightButton }}
      />
      {/* Only for provider */}
    </Stack.Navigator>
  );
}
