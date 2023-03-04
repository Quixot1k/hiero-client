import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonActions } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <TextInput placeholder="Password Again" />
      <Button
        title="Sign Up"
        onPress={() => {
          console.log("goto Information and claer navigation stack");
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Information" }],
            })
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
