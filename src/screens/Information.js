import { View, Text, TextInput, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function Information({ navigation }) {
  const handleNext = () => {
    console.log("goto IntSpec");
    navigation.navigate("IntSpec");
  };
  return (
    <View style={styles.container}>
      <TextInput placeholder="First Name" style={styles.textInput} />
      <TextInput placeholder="Last Name" style={styles.textInput} />
      <TextInput placeholder="Age " style={styles.textInput} />
      <TextInput placeholder="Gender" style={styles.textInput} />
      <TextInput
        placeholder="Mobile"
        style={[styles.textInput, { marginBottom: 10 }]}
      />
      <PrimaryButton title="Next" onPress={handleNext} />
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
  textInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    height: 50,
    width: 260,
    marginTop: 25,
    paddingLeft: 15,
    fontSize: 17,
  },
});
