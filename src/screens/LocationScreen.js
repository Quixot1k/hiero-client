import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function LocationScreen({ navigation }) {
  const handleNext = () => {
    console.log("goto AvatarScreen");
    navigation.navigate("AvatarScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>LocationScreen</Text>
      <PrimaryButton title="Next" onPress={handleNext} />
    </SafeAreaView>
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
