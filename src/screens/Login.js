import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Kairos!</Text>
      <View style={styles.group}>
        <Text style={styles.text}>Email</Text>
        <TextInput placeholder="Email" style={styles.textInput} />
      </View>
      <View style={[styles.group, { marginBottom: 10 }]}>
        <Text style={styles.text}>Password</Text>
        <TextInput placeholder="Password" style={styles.textInput} />
      </View>
      <PrimaryButton title={"Sign In"} />
      <Button title="Continue with Google" />
      <Button
        title="Haven't been one of our members?"
        onPress={() => {
          navigation.navigate("SignUp");
          console.log("goto SignUp");
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
  header: {
    fontSize: 45,
    marginBottom: 45,
  },
  group: {
    flexWrap: "wrap",
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    marginLeft: 3,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    height: 50,
    width: 260,
    marginTop: 10,
    paddingLeft: 15,
    fontSize: 17,
  },
});
