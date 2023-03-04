import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Kairos!</Text>
      <Text>Email</Text>
      <TextInput placeholder="Please Enter Your Email Address" />
      <Text>Password</Text>
      <TextInput placeholder="Please Enter Your Email Password" />
      <Button title="Sign In" />
      <Button title="Continue with Google" />
      <Button
        title="Haven't been one of our members?"
        onPress={() => {
          navigation.navigate("SignUp");
          console.log("goto SignUp");
        }}
      />
      <StatusBar style="auto" />
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
