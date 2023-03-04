import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function Avatar({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Avatar</Text>
      <Button
        title="Congratulation!!!"
        onPress={() => {
          console.log("Done");
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
