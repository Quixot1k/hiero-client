import {
  View,
  SafeAreaView,
  Text,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function AvatarScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AvatarScreen</Text>
      <Button
        title="🥳 Congratulation 🎉"
        onPress={() => {
          console.log("Done");
        }}
      />
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
