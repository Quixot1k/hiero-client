import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
export default function Card({ type, add }) {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        add();
        setPressed(!pressed);
      }}
    >
      <View
        style={[
          styles.container,
          pressed ? { backgroundColor: "#000" } : { backgroundColor: "#fff" },
        ]}
      >
        <Text
          style={[styles.text, pressed ? { color: "#fff" } : { color: "#000" }]}
        >
          {type}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

styles = StyleSheet.create({
  container: {
    borderWidth: 1.2,
    borderRadius: 4,
    fontSize: 30,
    width: 110,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: 500,
  },
});
