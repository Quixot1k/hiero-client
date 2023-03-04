import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function Information({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput placeholder="First Name" />
      <TextInput placeholder="Last Name" />
      <TextInput placeholder="Age " />
      <TextInput placeholder="Gender" />
      <TextInput placeholder="Mobile" />
      <Button
        title="Next"
        onPress={() => {
          console.log("goto IntSpec");
          navigation.navigate("IntSpec");
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
