import {CommonActions, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import AvatarScreen from "../screens/AvatarScreen";
import BioScreen from "../screens/BioScreen";
import CapacityScreen from "../screens/CapacityScreen";
import CertificationScreen from "../screens/CertificationScreen";
import InfoScreen from "../screens/InfoScreen";
import IntSpecScreen from "../screens/IntSpecScreen";
import ClientLocationScreen from "../screens/ClientLocationScreen";
import TrainerLocationScreen from "../screens/TrainerLocationScreen";
import LoginScreen from "../screens/LoginScreen";
import BidScreen from "../screens/BidScreen";
import ProfileCreateScreen from "../screens/ProfileCreateScreen";
import SignUpScreen from "../screens/SignUpScreen";
import TabNavigator from "./TabNavigator";
import ProfileUpdateScreen from "../screens/ProfileUpdateScreen";
import GymListScreen from "../screens/GymListScreen";
import TrainerListScreen from "../screens/TrainerListScreen";
import ClientListScreen from "../screens/ClientListScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import ClientDetailScreen from "../screens/ClientDetailScreen";
import TrainerDetailScreen from "../screens/TrainerDetailScreen";
import {useStore} from "../store";

export default function StackNavigator() {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const {role, isLogged} = useStore((state) => state);
  const headRightButton = () => (
    <ScreenHeaderBtn
      handlePress={() => {
        console.log("go back to LoginScreen and clear navigation stack");
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: "LoginScreen"}],
          })
        );
      }}
    />
  );

  return (
    <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
      {/* General */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: "Home"}}
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
        options={{title: "Information", headerRight: headRightButton}}
      />
      <Stack.Screen
        name="IntSpecScreen"
        component={IntSpecScreen}
        options={{
          title: role === "client" ? "Interest" : "Speciality",
          headerRight: isLogged ? null : headRightButton,
        }}
      />
      <Stack.Screen
        name="CapacityScreen"
        component={CapacityScreen}
        options={{
          title: role === "client" ? "Split the cost" : "Grow your clientele",
          headerRight: headRightButton,
        }}
      />
      <Stack.Screen
        name="ClientLocationScreen"
        component={ClientLocationScreen}
        options={{title: "Location", headerRight: headRightButton}}
      />
      <Stack.Screen
        name="TrainerLocationScreen"
        component={TrainerLocationScreen}
        options={{
          title: "Training Location",
          headerRight: isLogged ? null : headRightButton,
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
        name="ProfileCreateScreen"
        component={ProfileCreateScreen}
        options={{title: "Your profile", headerRight: headRightButton}}
      />
      {/* Only for trainer */}
      <Stack.Screen
        name="CertificationScreen"
        component={CertificationScreen}
        options={{title: "Certification", headerRight: headRightButton}}
      />
      <Stack.Screen
        name="BioScreen"
        component={BioScreen}
        options={{title: "Bio", headerRight: headRightButton}}
      />
      <Stack.Screen
        name="BidScreen"
        component={BidScreen}
        options={{title: "Set your terms", headerRight: headRightButton}}
      />
      {/* Successfully sign in */}
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GymListScreen"
        component={GymListScreen}
        options={{headerTitle: "Gym"}}
      />
      <Stack.Screen
        name="TrainerListScreen"
        component={TrainerListScreen}
        options={{headerTitle: "Trainer"}}
      />
      <Stack.Screen
        name="ClientListScreen"
        component={ClientListScreen}
        options={{headerTitle: "Client"}}
      />
      <Stack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{headerTitle: "Schedule"}}
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
        options={{headerTitle: "Client Detail"}}
      ></Stack.Screen>
      <Stack.Screen
        name="TrainerDetailScreen"
        component={TrainerDetailScreen}
        options={{headerTitle: "Trainer Detail"}}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
