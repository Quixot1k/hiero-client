import {MaterialIcons} from "@expo/vector-icons";
import React, {useState} from "react";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import Schedule from "../components/Schedule";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import PrimaryButton from "../components/PrimaryButton";
import {Dropdown} from "react-native-element-dropdown";
import {useStore} from "../store";
import {format} from "date-fns";
import axios from "axios";

const {width: screenWidth} = Dimensions.get("window");
export default function TrainerDetailScreen({route}) {

  // set up locationOptions for a bid
  const {trainerObj} = route.params;
  const {providerCategories, trainerLocations, trainerProfile} = trainerObj;
  let locationOptions = [];
  for (const location of trainerLocations.locations) {
    locationOptions.push({
      label: location.address + "," + location.city + "," + location.state + " " + location.zipcode,
      value: location.locationId,
    });
  }

  // state
  const userId = useStore((state) => state.userId);
  const [mode, setMode] = useState({
    calendarVisible: true,
    bidVisible: true,
  });
  const [session, setSession] = useState({
    sessionId: NaN,
    locationId: NaN,
    startTime: new Date(),
    endTime: new Date(),
    price: NaN,
  });

  const handleAddAdhoc = () => {
    const newAdhoc = {
      trainerId: trainerProfile.trainerId,
      clientId: userId,
      locationId: session.locationId,
      startDate: format(session.startTime, "yyyy-MM-dd"),
      startTime: format(session.startTime, "HHmm"),
      endTime: format(session.endTime, "HHmm"),
      numClientsInSession: 3,
      pricePaidByClients: session.price,
    }
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
  }
  const makeBid = () => {
    const bid = {
      clientId: userId,
      trainerId: trainerProfile.trainerId,
      bidPrice: session.price,
      maxOtherClientsToShareWithThisBid: 1,
      maxSessionPerWeekByClientThisBid: 1,
      locationIds: 1,
    }
  }

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
                fontWeight: "500",
              }}
            >
              Upcoming Sessions:
            </Text>
          </View>
          <View style={{alignItems: "center"}}>
            {mode.calendarVisible && (
              <View style={{marginTop: 6}}>
                <Schedule/>
              </View>
            )}
          </View>
        </View>
        {/* bid */}
        <View style={styles.section}>
          <View style={styles.sectionBtn}>
            <TouchableOpacity
              onPress={() => {
                if (mode.bidVisible === true) {
                  setMode({...mode, bidVisible: false});
                } else {
                  setMode({...mode, bidVisible: true});
                }
              }}
            >
              <View
                style={mode.bidVisible && {transform: [{rotate: "90deg"}]}}
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
                fontWeight: "500",
              }}
            >
              Place Bid:
            </Text>
          </View>
          <View style={{alignItems: "center"}}>
            {mode.bidVisible && (
              <View style={{marginTop: 10}}>
                {/*Location*/}
                <Dropdown data={locationOptions} labelField="label" valueField="value"
                          placeholder={"Select a location"}
                          value={session.locationId}
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 1,
                            marginBottom: 5,
                            borderRadius: 9,
                            backgroundColor: "#efeff0",
                          }} onChange={(item) => {
                  setSession({...session, locationId: item.value});
                }}/>
                {/* Start Time */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <View style={{width: 80}}>
                    <Text style={{fontSize: 16}}>Start Time:</Text>
                  </View>
                  <RNDateTimePicker
                    value={session.startTime}
                    mode={"datetime"}
                    onChange={(event, selectedDate) => {
                      setSession({...session, startTime: selectedDate});
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
                  <View style={{width: 80}}>
                    <Text style={{fontSize: 16}}>End Time:</Text>
                  </View>
                  <RNDateTimePicker
                    value={session.endTime}
                    mode={"datetime"}
                    onChange={(event, selectedDate) => {
                      setSession({...session, endTime: selectedDate});
                    }}
                  />
                </View>
                {/* Panel */}
                <View style={styles.panelWrapper}>
                  {/*<PrimaryButton*/}
                  {/*  title={"Add"}*/}
                  {/*  paddingHorizontal={20}*/}
                  {/*  paddingVertical={8}*/}
                  {/*  marginTop={0}*/}
                  {/*  marginBottom={0}*/}
                  {/*  onPress={() => {*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <View style={styles.inputBtnGroup}>
                    <TextInput placeholder="$$" style={styles.textInput} onChangeText={(text) => {
                      setSession({...session, price: parseInt(text)});
                    }}/>
                    <PrimaryButton
                      title={"Deal"}
                      paddingHorizontal={28}
                      paddingVertical={8}
                      marginTop={0}
                      marginBottom={0}
                      onPress={() => {
                        handleAddAdhoc();
                      }}
                    />
                  </View>
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
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
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
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: {width: 1, height: 1},
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
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
  },
  sectionBtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textInput: {
    width: 90,
    height: 35.5,
    fontSize: 17,
    textAlign: "center",
    borderRadius: 6,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    marginRight: 10,
  },
  panelWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 14,
  },
  inputBtnGroup: {
    width: screenWidth - 140,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 6,
    // backgroundColor: "#fcfcfc",
    // shadowColor: "black",
    // shadowOpacity: 0.3,
    // shadowOffset: {width: 2, height: 2},
    // shadowRadius: 3,
    // paddingHorizontal: 8,
    // paddingVertical: 5,
    // borderRadius: 10,
  },
  // listWrapper: {
  //   marginTop: 16,
  //   alignItems: "center",
  // },
  // sessionWrapper: {
  //   backgroundColor: "#fcfcfc",
  //   width: screenWidth - 80,
  //   height: 40,
  //   borderRadius: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   shadowColor: "black",
  //   shadowOpacity: 0.3,
  //   shadowOffset: {width: 2, height: 2},
  //   shadowRadius: 2,
  //   marginVertical: 6,
  // },
  // sessionText: {
  //   fontSize: 13,
  //   fontWeight: "500",
  // },
});
