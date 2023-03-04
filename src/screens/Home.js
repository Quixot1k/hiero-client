import { Button } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import SignUp from "./SignUp";
import Information from "./Information";
import IntSpec from "./IntSpec";
import Capacity from "./Capacity";
import Location from "./Location";
import Avatar from "./Avatar";

export default function Home() {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const stackStyle = {
    headerRight: () => (
      <Button
        onPress={() => {
          console.log("goto Login and claer navigation stack");
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Login" }],
            })
          );
        }}
        title="Login"
        color="#000"
      />
    ),
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="Information"
        component={Information}
        options={stackStyle}
      />
      <Stack.Screen name="IntSpec" component={IntSpec} options={stackStyle} />
      <Stack.Screen name="Capacity" component={Capacity} options={stackStyle} />
      <Stack.Screen name="Location" component={Location} options={stackStyle} />
      <Stack.Screen name="Avatar" component={Avatar} />
    </Stack.Navigator>
  );
}
