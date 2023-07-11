import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const {width: screenWidth} = Dimensions.get("window");
export default function SessionItem({name, startTime, endTime, location, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={name === "Unavailable"}>
      <View style={[styles.container, name === "Unavailable" && {backgroundColor: "#efefef"}]}>
        <View>
          <View style={styles.firstRow}>
            <Text style={styles.name}>{name + " " + " "}</Text>
            <Text style={styles.duration}>
              {startTime} to {endTime}
            </Text>
          </View>
          <Text style={styles.location}>{location}</Text>
        </View>
        <View>
          <MaterialIcons name="more-vert" size={20} color="black"/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0.8 * screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
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
    marginBottom: 8,
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
