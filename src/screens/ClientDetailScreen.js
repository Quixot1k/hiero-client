import React, {useState} from "react";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {format} from "date-fns";
import DatePicker from "react-native-date-picker";
import {MaterialIcons} from "@expo/vector-icons";
import axios from "axios";
import Schedule from "../components/Schedule";
import PrimaryButton from "../components/PrimaryButton";
import {useStore} from "../store";

const {width: screenWidth} = Dimensions.get("window");
export default function ClientDetailScreen({route}) {
  const {clientObj} = route.params;
  const userId = useStore((state) => state.userId);
  const [mode, setMode] = useState({
    calendarVisible: true,
    adhocVisible: true,
  });
  const [adhoc, setAdhoc] = useState({
    startDatetime: new Date(),
    endDatetime: new Date(),
    capacity: 1,
    price: 20,
  });

  const handleAddAdhoc = () => {
    // "trainerId": 1,
    // "clientId": 3,
    // "locationId": 1,
    // "startDate": "2025-10-07",
    // "startTime": "2020",
    // "endTime": "2300",
    // "numClientsInSession": 1,
    // "pricePaidByClients": 100.50
    const newAdhoc = {
      trainerId: userId,
      clientId: clientObj.clientId,
      locationId: 1,
      startDate: format(adhoc.startDatetime, "yyyy-MM-dd"),
      startTime: format(adhoc.startDatetime, "HHmm"),
      endTime: format(adhoc.endDatetime, "HHmm"),
      numClientsInSession: adhoc.capacity,
      pricePaidByClients: adhoc.price,
    };
    console.log(newAdhoc);
    try {
      axios
        .post("http://127.0.0.1:10001/schedule/adhoc", newAdhoc, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Has been added!");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* head */}
        <View style={styles.header}>
          <View style={styles.image}></View>
          <Text style={styles.title}>{clientObj.name}</Text>
          <View>
            <Text style={styles.info}>Gender: {clientObj.gender}</Text>
            <Text style={styles.info}>Email: {clientObj.emailAddress}</Text>
            <Text style={styles.info}>Mobile: {clientObj.phone}</Text>
          </View>
        </View>
        {/* calendar */}
        <View style={styles.section}>
          <View style={styles.sectionBtn}>
            <TouchableOpacity
              onPress={() => {
                if (mode.calendarVisible === true) {
                  setMode({...mode, calendarVisible: false});
                } else {
                  setMode({...mode, calendarVisible: true});
                }
              }}
            >
              <View
                style={
                  mode.calendarVisible && {transform: [{rotate: "90deg"}]}
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
                fontWeight: "600",
              }}
            >
              Upcoming Sessions:
            </Text>
          </View>
          <View style={{alignItems: "center"}}>
            {mode.calendarVisible && <Schedule/>}
          </View>
        </View>
        {/* adhoc */}
        <View style={{paddingBottom: 50}}>
          <View style={styles.section}>
            <View style={styles.sectionBtn}>
              <TouchableOpacity
                onPress={() => {
                  if (mode.adhocVisible === true) {
                    setMode({...mode, adhocVisible: false});
                  } else {
                    setMode({...mode, adhocVisible: true});
                  }
                }}
              >
                <View
                  style={
                    mode.adhocVisible && {transform: [{rotate: "90deg"}]}
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
                  fontWeight: "600",
                }}
              >
                Adhoc
              </Text>
            </View>
            <View style={{alignItems: "center"}}>
              {mode.adhocVisible && (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 40,
                      marginBottom: -25,
                    }}
                  >
                    <Text style={{fontSize: 16}}>Start:</Text>
                    <DatePicker
                      date={adhoc.startDatetime}
                      onDateChange={(date) =>
                        setAdhoc({...adhoc, startDatetime: date})
                      }
                      style={{
                        height: 100,
                        marginLeft: -15,
                        transform: [{scale: 0.75}],
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 40,
                    }}
                  >
                    <Text style={{fontSize: 16}}>End:</Text>
                    <DatePicker
                      date={adhoc.endDatetime}
                      onDateChange={(date) => {
                        setAdhoc({...adhoc, endDatetime: date});
                      }}
                      style={{
                        height: 100,
                        marginLeft: -15,
                        transform: [{scale: 0.75}],
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: screenWidth - 40,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{flexDirection: "row", alignItems: "center"}}
                    >
                      <Text style={{fontSize: 15}}>Capacity: </Text>
                      <TextInput
                        value={adhoc.capacity ? String(adhoc.capacity) : ""}
                        onChangeText={(text) =>
                          setAdhoc({...adhoc, capacity: parseInt(text)})
                        }
                        style={styles.textInput}
                      />
                    </View>
                    <View
                      style={{flexDirection: "row", alignItems: "center"}}
                    >
                      <Text style={{fontSize: 15}}>Price: </Text>
                      <TextInput
                        value={adhoc.price ? String(adhoc.price) : ""}
                        onChangeText={(text) =>
                          setAdhoc({...adhoc, price: parseInt(text)})
                        }
                        style={styles.textInput}
                      />
                    </View>
                  </View>
                  <View>
                    <PrimaryButton
                      title={"Add Adhoc"}
                      marginTop={30}
                      paddingHorizontal={20}
                      onPress={() => {
                        handleAddAdhoc();
                      }}
                    />
                  </View>
                </>
              )}
            </View>
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
    marginTop: 30,
    width: screenWidth,
  },
  header: {
    width: screenWidth - 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 14,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1.5,
    marginHorizontal: 30,
  },
  info: {
    fontSize: 12,
    fontWeight: "400",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1.5,
    marginVertical: 2,
  },
  section: {
    marginVertical: 15,
    marginBottom: 6,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 14,
    width: screenWidth - 40,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
  },
  sectionBtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textInput: {
    borderRadius: 10,
    textAlign: "center",
    height: 35,
    width: 80,
    marginHorizontal: 6,
    marginVertical: 5,
    fontSize: 16,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  },
});
