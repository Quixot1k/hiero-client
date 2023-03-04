import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
export default function Login({ navigation }) {
  const handleSignUp = () => {
    console.log("goto Information and claer navigation stack");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Information" }],
      })
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.text}>Email</Text>
        <TextInput placeholder="Email" style={styles.textInput} />
      </View>
      <View style={styles.group}>
        <Text style={styles.text}>Password</Text>
        <TextInput placeholder="Password" style={styles.textInput} />
      </View>
      <View style={styles.group}>
        <Text style={styles.text}>Password</Text>
        <TextInput placeholder="Password Again" style={styles.textInput} />
      </View>
      <PrimaryButton title={"Sign Up"} onPress={handleSignUp} />
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
  group: {
    flexWrap: "wrap",
    margin: 10,
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
