import { CommonActions, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import AvatarScreen from "./AvatarScreen";
import BioScreen from "./BioScreen";
import CapacityScreen from "./CapacityScreen";
import CertificationScreen from "./CertificationScreen";
import InfoScreen from "./InfoScreen";
import IntSpecScreen from "./IntSpecScreen";
import LocationScreen from "./LocationScreen";
import TrainerLocationScreen from "./TrainerLocationScreen";
import LoginScreen from "./LoginScreen";
import BidScreen from "./BidScreen";
import ProfileScreen from "./ProfileScreen";
import SignUpScreen from "./SignUpScreen";
import TabNavigatorScreen from "./TabNavigatorScreen";
import ProfileUpdateScreen from "./ProfileUpdateScreen";
import GymListScreen from "./GymListScreen";
import TrainerListScreen from "./TrainerListScreen";
import ClientListScreen from "./ClientListScreen";
import ScheduleScreen from "./ScheduleScreen";
import ClientDetailScreen from "./ClientDetailScreen";
import TrainerDetailScreen from "./TrainerDetailScreen";

export default function StackNavigatorScreen() {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const { role, loggedIn } = useSelector((state) => state.general);

  const headRightButton = () => (
    <ScreenHeaderBtn
      handlePress={() => {
        console.log("goto StackNavigatorScreen and claer navigation stack");
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "LoginScreen" }],
          })
        );
      }}
    />
  );

  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      {/* General */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerTitle: "Sign Up",
        }}
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
          title: role == "client" ? "Interest" : "Speciality",
          headerRight: loggedIn ? null : headRightButton,
        }}
      />
      <Stack.Screen
        name="CapacityScreen"
        component={CapacityScreen}
        options={{
          title: role == "client" ? "Split the cost" : "Grow your clientele",
          headerRight: headRightButton,
        }}
      />
      <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{ title: "Location", headerRight: headRightButton }}
      />
      <Stack.Screen
        name="TrainerLocationScreen"
        component={TrainerLocationScreen}
        options={{
          title: "Training Location",
          headerRight: loggedIn ? null : headRightButton,
        }}
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
      {/* Only for trainer */}
      <Stack.Screen
        name="CertificationScreen"
        component={CertificationScreen}
        options={{ title: "Certification", headerRight: headRightButton }}
      />
      <Stack.Screen
        name="BioScreen"
        component={BioScreen}
        options={{ title: "Bio", headerRight: headRightButton }}
      />
      <Stack.Screen
        name="BidScreen"
        component={BidScreen}
        options={{ title: "Set your terms", headerRight: headRightButton }}
      />
      {/* Successfully sign in */}
      <Stack.Screen
        name="TabNavigatorScreen"
        component={TabNavigatorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GymListScreen"
        component={GymListScreen}
        options={{ headerTitle: "Gym" }}
      />
      <Stack.Screen
        name="TrainerListScreen"
        component={TrainerListScreen}
        options={{ headerTitle: "Trainer" }}
      />
      <Stack.Screen
        name="ClientListScreen"
        component={ClientListScreen}
        options={{ headerTitle: "Client" }}
      />
      <Stack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ headerTitle: "Schedule" }}
      />
      <Stack.Screen
        name="ProfileUpdateScreen"
        component={ProfileUpdateScreen}
        options={{
          title: "Update your profile",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ClientDetailScreen"
        component={ClientDetailScreen}
        options={{ headerTitle: "Client Detail" }}
      ></Stack.Screen>
      <Stack.Screen
        name="TrainerDetailScreen"
        component={TrainerDetailScreen}
        options={{ headerTitle: "Trainer Detail" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
