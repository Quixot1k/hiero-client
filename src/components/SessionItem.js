import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {useStore} from "../store";
import {add, format} from "date-fns";

const {width: screenWidth} = Dimensions.get("window");
export default function SessionItem({onPress, sessionObj}) {

  const convertMilitaryTime = (dateString, timeString) => {
    const hour = timeString.substring(0, 2);
    const minute = timeString.substring(2, 4);
    return new Date(dateString + "T" + hour + ":" + minute);
  }

  const {role} = useStore((state) => state);
  const name = role === "client" ? sessionObj.trainerProfile.name : sessionObj.clientProfileList[0].name
  const startTime = format(convertMilitaryTime(sessionObj.session.startDate, sessionObj.session.startTime), "HH:mm");
  const endTime = format(add(convertMilitaryTime(sessionObj.session.startDate, sessionObj.session.startTime), {minutes: sessionObj.session.sessionTimeLength}), "HH:mm");

  return (
    <TouchableOpacity onPress={onPress} disabled={name === "Unavailable"}>
      <View style={[styles.container, name === "Unavailable" && {backgroundColor: "#efefef"}]}>
        <View style={{width: 0.675 * screenWidth}}>
          <View style={styles.firstRow}>
            <Text style={styles.name}>{name + " " + " "}</Text>
            <Text style={styles.duration}>
              {startTime} to {endTime}
            </Text>
          </View>
          <View>
            <Text style={styles.location}>{(sessionObj.location.address +
              ", " +
              sessionObj.location.city +
              ", " +
              sessionObj.location.state).length < 36 ? (sessionObj.location.address +
              ", " +
              sessionObj.location.city +
              ", " +
              sessionObj.location.state) : (sessionObj.location.address +
              ", " +
              sessionObj.location.city +
              ", " +
              sessionObj.location.state).substring(0, 36) + "..."}</Text>
          </View>
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
