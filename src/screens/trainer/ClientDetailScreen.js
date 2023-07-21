import React, {useState} from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {format} from "date-fns";
import {MaterialIcons} from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import {useStore} from "../../store";
import {Dropdown} from "react-native-element-dropdown";
import useAddSession from "../../hooks/useAddSession";
import InlineDateTimePicker from "../../components/InlineDateTimePicker";

const {width: screenWidth} = Dimensions.get("window");
export default function ClientDetailScreen({route}) {
  const {clientObj} = route.params;
  const {userId, trainerLocations} = useStore((state) => state);
  let locationOptions = [];
  for (const location of trainerLocations) {
    locationOptions.push({
      label: location.address + "," + location.city + "," + location.state + " " + location.zipcode,
      value: location.locationId,
    });
  }
  const [visible, setVisible] = useState({
    calendarVisible: true,
    adhocVisible: true,
  });
  const [adhoc, setAdhoc] = useState({
    locationId: NaN,
    startDatetime: new Date(),
    endDatetime: new Date(),
    capacity: 1,
    price: 20,
  });

  const addSession = useAddSession();

  const handleAddAdhoc = () => {
    addSession.mutate({
      trainerId: userId,
      clientId: clientObj.clientId,
      locationId: adhoc.locationId,
      startDate: format(adhoc.startDatetime, "yyyy-MM-dd"),
      startTime: format(adhoc.startDatetime, "HHmm"),
      endTime: format(adhoc.endDatetime, "HHmm"),
      numClientsInSession: adhoc.capacity,
      pricePaidByClients: adhoc.price,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* head */}
        <View style={styles.header}>
          <View style={{alignItems: "center", marginVertical: 2}}>
            <View style={styles.imageWrapper}>
              <Image source={{uri: clientObj.imageName}} style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}/>
            </View>
            <Text style={styles.title}>{clientObj.name}</Text>
          </View>
          <View style={{marginRight: 20}}>
            <Text style={styles.info}>Gender: {clientObj.gender}</Text>
            <Text style={styles.info}>Email: {clientObj.emailAddress}</Text>
            <Text style={styles.info}>Mobile: {clientObj.phone}</Text>
          </View>
        </View>
        {/* calendar */}
        {/*<View style={styles.section}>*/}
        {/*  <View style={styles.sectionBtn}>*/}
        {/*    <TouchableOpacity*/}
        {/*      onPress={() => {*/}
        {/*        if (visible.calendarVisible === true) {*/}
        {/*          setVisible({...visible, calendarVisible: false});*/}
        {/*        } else {*/}
        {/*          setVisible({...visible, calendarVisible: true});*/}
        {/*        }*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <View*/}
        {/*        style={*/}
        {/*          visible.calendarVisible && {transform: [{rotate: "90deg"}]}*/}
        {/*        }*/}
        {/*      >*/}
        {/*        <MaterialIcons*/}
        {/*          name="keyboard-arrow-right"*/}
        {/*          size={24}*/}
        {/*          color="black"*/}
        {/*        />*/}
        {/*      </View>*/}
        {/*    </TouchableOpacity>*/}
        {/*    <Text*/}
        {/*      style={{*/}
        {/*        fontSize: 16,*/}
        {/*        fontWeight: "500",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Upcoming Sessions:*/}
        {/*    </Text>*/}
        {/*  </View>*/}
        {/*  <View style={{alignItems: "center"}}>*/}
        {/*    {visible.calendarVisible && <WeeklyView/>}*/}
        {/*  </View>*/}
        {/*</View>*/}
        {/* adhoc */}
        <View style={styles.section}>
          <View style={styles.sectionBtn}>
            <TouchableOpacity
              onPress={() => {
                if (visible.adhocVisible === true) {
                  setVisible({...visible, adhocVisible: false});
                } else {
                  setVisible({...visible, adhocVisible: true});
                }
              }}
            >
              <View
                style={
                  visible.adhocVisible && {transform: [{rotate: "90deg"}]}
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
              Adhoc
            </Text>
          </View>
          <View style={{alignItems: "center", paddingHorizontal: 20}}>
            {visible.adhocVisible && (
              <>
                {/*Location*/}
                <Dropdown data={locationOptions} labelField="label" valueField="value"
                          placeholder={"Select a location"}
                          value={adhoc.locationId}
                          style={{
                            alignSelf: "flex-start",
                            width: 0.75 * screenWidth,
                            paddingHorizontal: 10,
                            paddingVertical: 1,
                            marginTop: 14,
                            borderRadius: 9,
                            backgroundColor: "#efeff0",
                          }}
                          placeholderStyle={{fontSize: 17}}
                          selectedTextStyle={{fontSize: 17}}
                          itemTextStyle={{fontSize: 17}}
                          onChange={(item) => {
                            setAdhoc({...adhoc, locationId: item.value});
                          }}/>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                  }}
                >
                  <View style={{width: 40}}>
                    <Text style={{fontSize: 16}}>Start:</Text>
                  </View>
                  {/*<DatePicker*/}
                  {/*  date={adhoc.startDatetime}*/}
                  {/*  minuteInterval={15}*/}
                  {/*  onDateChange={(date) =>*/}
                  {/*    setAdhoc({...adhoc, startDatetime: date})*/}
                  {/*  }*/}
                  {/*  style={{*/}
                  {/*    height: 100,*/}
                  {/*    marginLeft: -15,*/}
                  {/*    transform: [{scale: 0.785}],*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <View style={{marginVertical: 10}}>
                    <InlineDateTimePicker
                      value={adhoc.startDatetime}
                      onDateChange={(date) => {
                        setAdhoc({...adhoc, startDatetime: date})
                      }}
                      onTimeChange={(date) => {
                        setAdhoc({...adhoc, startDatetime: date})
                      }}/>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    marginBottom: 10
                  }}
                >
                  <View style={{width: 40}}>
                    <Text style={{fontSize: 16}}>End:</Text>
                  </View>
                  <View>
                    <InlineDateTimePicker
                      value={adhoc.startDatetime}
                      onDateChange={(date) => {
                        setAdhoc({...adhoc, endDatetime: date})
                      }}
                      onTimeChange={(date) => {
                        setAdhoc({...adhoc, endDatetime: date})
                      }}/>
                  </View>
                </View>
                <View style={{alignSelf: "flex-start"}}>
                  <View
                    style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}
                  >
                    <Text style={{fontSize: 16, width: 80}}>Capacity: </Text>
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
                    <Text style={{fontSize: 16, width: 80}}>Price: </Text>
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
                    marginTop={20}
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
    width: 0.9 * screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 5,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 1},
    shadowRadius: 3,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1.5,
    marginHorizontal: 30,
  },
  info: {
    fontSize: 14.5,
    fontWeight: "400",
    // textShadowColor: "rgba(0, 0, 0, 0.1)",
    // textShadowOffset: {width: 1, height: 1},
    // textShadowRadius: 1.5,
    marginVertical: 8,
  },
  section: {
    marginVertical: 15,
    marginBottom: 6,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 14,
    width: 0.9 * screenWidth,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 1},
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
    height: 38,
    width: 84,
    marginHorizontal: 6,
    marginVertical: 5,
    fontSize: 16,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
});
