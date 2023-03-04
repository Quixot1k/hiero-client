import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function Location({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Location</Text>
      <Button
        title="Next"
        onPress={() => {
          console.log("goto Avatar");
          navigation.navigate("Avatar");
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
