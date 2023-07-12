import {CommonActions, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ScreenHeaderButton from "../components/ScreenHeaderButton";
import AvatarScreen from "../screens/shared/AvatarScreen";
import BioScreen from "../screens/trainer/BioScreen";
import CapacityScreen from "../screens/shared/CapacityScreen";
import CertificationScreen from "../screens/trainer/CertificationScreen";
import InfoScreen from "../screens/shared/InfoScreen";
import ClientLocationScreen from "../screens/client/ClientLocationScreen";
import TrainerLocationScreen from "../screens/trainer/TrainerLocationScreen";
import LoginScreen from "../screens/shared/LoginScreen";
import BidScreen from "../screens/trainer/BidScreen";
import ProfileCreateScreen from "../screens/shared/ProfileCreateScreen";
import SignUpScreen from "../screens/shared/SignUpScreen";
import TabNavigator from "./TabNavigator";
import {useStore} from "../store";
import IntSpecScreen from "../screens/shared/IntSpecScreen";

export default function StackNavigator() {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const {role, isLogged} = useStore((state) => state);
  const headRightButton = () => (
    <ScreenHeaderButton
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
          title: "Training Locations",
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
      {/* After login */}
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      {/*<Stack.Screen*/}
      {/*  name="GymListScreen"*/}
      {/*  component={GymListScreen}*/}
      {/*  options={{headerTitle: "Gym"}}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="TrainerListScreen"*/}
      {/*  component={TrainerListScreen}*/}
      {/*  options={{headerTitle: "Trainer"}}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="ClientListScreen"*/}
      {/*  component={ClientListScreen}*/}
      {/*  options={{headerTitle: "Client"}}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="ScheduleScreen"*/}
      {/*  component={ScheduleScreen}*/}
      {/*  options={{headerTitle: "Schedule"}}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="ProfileUpdateScreen"*/}
      {/*  component={ProfileUpdateScreen}*/}
      {/*  options={{*/}
      {/*    title: "Update your profile",*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="SessionDetailScreen"*/}
      {/*  component={SessionDetailScreen}*/}
      {/*  options={{headerTitle: "Session Detail"}}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="ClientDetailScreen"*/}
      {/*  component={ClientDetailScreen}*/}
      {/*  options={{headerTitle: "Client Detail"}}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="TrainerDetailScreen"*/}
      {/*  component={TrainerDetailScreen}*/}
      {/*  options={{headerTitle: "Trainer Detail"}}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
}
