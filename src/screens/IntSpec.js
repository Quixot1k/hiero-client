import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function IntSpec({ navigation }) {
  const handleNext = () => {
    console.log("goto Capacity");
    navigation.navigate("Capacity");
  };
  return (
    <View style={styles.container}>
      <Text>What are your interests</Text>
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
});
