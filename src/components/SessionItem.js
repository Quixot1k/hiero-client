import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const {width: screenWidth} = Dimensions.get("window");
export default function SessionItem({name, startTime, endTime, location, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text style={styles.name}>{name + " " + " "}</Text>
          <Text style={styles.duration}>
            {startTime} to {endTime}
          </Text>
        </View>
        <Text style={styles.location}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0.8 * screenWidth,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 12,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 3,
  },
  firstRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
  },
  duration: {
    fontSize: 18,
  },
  location: {
    paddingLeft: 0.5,
    textDecorationLine: "underline",
  },
});
