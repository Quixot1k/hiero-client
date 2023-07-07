import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const {width: screenWidth} = Dimensions.get("window");
export default function ClientItem({clientObj, onPress}) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image source={{uri: clientObj.imageName}} style={{
          borderRadius: 30,
          height: 60,
          width: 60,
        }}/>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View style={{width: 180}}>
          <Text style={styles.name}>{clientObj.name}</Text>
        </View>
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
    width: 0.8 * screenWidth,
    height: 75,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 14,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 3,
    marginVertical: 8,
  },
  avatar: {
    borderColor: "#000",
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 3,
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
