import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function Location({ navigation }) {
  const handleNext = () => {
    console.log("goto Avatar");
    navigation.navigate("Avatar");
  };
  return (
    <View style={styles.container}>
      <Text>Location</Text>
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
