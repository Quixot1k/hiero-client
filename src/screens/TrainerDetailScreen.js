import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Schedule from "../components/Schedule";

const { width: screenWidth } = Dimensions.get("window");
export default function TrainerDetailScreen({ route }) {
  const { trainerObj } = route.params;
  const [mode, setMode] = useState({
    calendarVisible: true,
    bidVisible: true,
  });
  const [session, setSession] = useState({
    sessionId: -1,
    startTime: new Date(),
    endTime: new Date(),
  });
  const [sessionList, setSessionList] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* head */}
        <View style={styles.header}>
          <View flexDirection="row" alignItems="center">
            <View style={styles.image}></View>
            <Text style={styles.title}>{trainerObj.trainerProfile.name}</Text>
          </View>
          <Text style={styles.title}>
            ${trainerObj.trainerProfile.minimumBid}
          </Text>
        </View>
        {/* calender */}
        <View style={styles.section}>
          <View style={styles.sectionBtn}>
            <TouchableOpacity
              onPress={() => {
                if (mode.calendarVisible == true) {
                  setMode({ ...mode, calendarVisible: false });
                } else {
                  setMode({ ...mode, calendarVisible: true });
                }
              }}
            >
              <View
                style={
                  mode.calendarVisible && { transform: [{ rotate: "90deg" }] }
                }
              >
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Upcoming Sessions:
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            {mode.calendarVisible && (
              <View style={{ marginTop: 6 }}>
                <Schedule />
              </View>
            )}
          </View>
        </View>
        {/* bid */}
        <View style={styles.section}>
          <View style={styles.sectionBtn}>
            <TouchableOpacity
              onPress={() => {
                if (mode.bidVisible == true) {
                  setMode({ ...mode, bidVisible: false });
                } else {
                  setMode({ ...mode, bidVisible: true });
                }
              }}
            >
              <View
                style={mode.bidVisible && { transform: [{ rotate: "90deg" }] }}
              >
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Place Bid:
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            {mode.bidVisible && (
              <View style={{ marginTop: 10 }}>
                {/* Start Time */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <View style={{ width: 80 }}>
                    <Text style={{ fontSize: 16 }}>Start Time:</Text>
                  </View>
                  <DateTimePicker
                    value={session.startTime}
                    mode={"datetime"}
                    onChange={(event, selectedDate) => {
                      setSession({ ...session, startTime: selectedDate });
                    }}
                  />
                </View>
                {/* End Time */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <View style={{ width: 80 }}>
                    <Text style={{ fontSize: 16 }}>End Time:</Text>
                  </View>
                  <DateTimePicker
                    value={session.endTime}
                    mode={"datetime"}
                    onChange={(event, selectedDate) => {
                      setSession({ ...session, endTime: selectedDate });
                    }}
                  />
                </View>
                {/* Pannel */}
                <View style={styles.pannelWrapper}>
                  <PrimaryButton
                    title={"Add"}
                    paddingHorizontal={20}
                    paddingVertical={8}
                    marginTop={0}
                    marginBottom={0}
                    onPress={() => {
                      setSession({ ...session, sessionId: sessionList.length });
                      setSessionList([...sessionList, session]);
                    }}
                  />
                  <View style={styles.inputBtnGroup}>
                    <TextInput placeholder="$$" style={styles.textInput} />
                    <PrimaryButton
                      title={"Deal"}
                      paddingHorizontal={20}
                      paddingVertical={8}
                      marginTop={0}
                      marginBottom={0}
                      onPress={() => {
                        console.log(sessionList);
                      }}
                    />
                  </View>
                </View>
                {/* List */}
                <View style={styles.listWrapper}>
                  {sessionList.map((sessionObj, index) => (
                    <View key={index} style={styles.sessionWrapper}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.sessionText}>
                          From {format(sessionObj.startTime, "yyyy-M-d hh:mm")}{" "}
                        </Text>
                        <Text style={styles.sessionText}>
                          To {format(sessionObj.endTime, "yyyy-M-d hh:mm")}
                        </Text>
                        <View style={{ marginLeft: 10 }}>
                          <MaterialIcons
                            name="cancel"
                            size={18}
                            color="darkred"
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
    marginTop: 20,
    width: screenWidth,
  },
  header: {
    width: screenWidth - 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1.5,
  },
  section: {
    marginVertical: 15,
    marginBottom: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
    width: screenWidth - 40,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
  },
  sectionBtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textInput: {
    width: 70,
    height: 35.5,
    fontSize: 17,
    textAlign: "center",
    borderRadius: 6,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    marginRight: 10,
  },
  pannelWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 14,
  },
  inputBtnGroup: {
    flexDirection: "row",
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  listWrapper: {
    marginTop: 16,
    alignItems: "center",
  },
  sessionWrapper: {
    backgroundColor: "#fcfcfc",
    width: screenWidth - 80,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    marginVertical: 6,
  },
  sessionText: {
    fontSize: 13,
    fontWeight: 500,
  },
});
