import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

export default function ClientItem({avatar, name, onPress}) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text>Avatar</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.name}>{name}</Text>
        <AntDesign
          name="caretright"
          size={14}
          color="black"
          style={styles.arrow}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330,
    height: 75,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 14,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    marginVertical: 8,
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 60,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 26,
    textDecorationLine: "underline",
    marginRight: 80,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1.5,
  },
  arrow: {
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1.5,
  },
});
