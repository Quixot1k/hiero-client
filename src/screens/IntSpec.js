import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function IntSpec({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>What are your interests</Text>
      <Button
        title="Next"
        onPress={() => {
          console.log("goto Capacity");
          navigation.navigate("Capacity");
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
