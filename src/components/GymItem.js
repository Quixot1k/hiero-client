import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

export default function gymObjItem({gymObj, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {/* info */}
          <View>
            <Text style={[{marginBottom: 3}, styles.textStyle]}>
              Address: {gymObj.address.length < 24 ? gymObj.address : gymObj.address.substring(0, 24) + "..."}
            </Text>
            <Text style={[{marginTop: 3}, styles.textStyle]}>
              Distance: {gymObj.distance.toFixed(2)} mi
            </Text>
          </View>
          <View>
            <AntDesign
              name="rightcircle"
              size={16}
              color="black"
              style={styles.textStyle}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    elevation: 4,
    marginVertical: 5,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    fontWeight: "400",
    fontSize: 15,
    color: "#000000",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
