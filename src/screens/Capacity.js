import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function Capacity({ navigation }) {
  const handleNext = () => {
    console.log("goto Location");
    navigation.navigate("Location");
  };
  return (
    <View style={styles.container}>
      <Text>Split the cost</Text>
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
