import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function SessionItem({name, startTime, endTime, location}) {
  return (
    <TouchableOpacity>
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
    width: 310,
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
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
  duration: {
    fontSize: 18,
  },
  location: {
    paddingLeft: 0.5,
    textDecorationLine: "underline",
  },
});
