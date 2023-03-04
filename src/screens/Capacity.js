import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function Capacity({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Split the cost</Text>
      <Button
        title="Next"
        onPress={() => {
          console.log("goto Location");
          navigation.navigate("Location");
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
