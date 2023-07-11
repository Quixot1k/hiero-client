import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {FontAwesome, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import PrimaryButton from "../../components/PrimaryButton";
import useRemoveSession from "../../hooks/useRemoveSession";
import {add, format} from "date-fns";
import {useStore} from "../../store";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");
const SessionDetailScreen = ({navigation, route}) => {
  const sessionObj = route.params;
  const startDate = sessionObj.sessionObj.session.startDate
  const startTime = sessionObj.sessionObj.session.startTime
  const sessionLength = sessionObj.sessionObj.session.sessionTimeLength
  const address = sessionObj.sessionObj.location.address
  const city = sessionObj.sessionObj.location.city
  const state = sessionObj.sessionObj.location.state
  const zipcode = sessionObj.sessionObj.location.zipcode
  const {userId} = useStore((state) => state);

  const convertMilitaryTime = (dateString, timeString) => {
    const hour = timeString.substring(0, 2);
    const minute = timeString.substring(2, 4);
    return new Date(dateString + "T" + hour + ":" + minute);
  }
  const ClientDetails = ({initialVisible = false, clientObj}) => {
    const [visible, setVisible] = useState(initialVisible);
    return (
      <View style={styles.clientDetailWrapper}>
        {/*preview*/}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 16,
          paddingVertical: 6,
          justifyContent: "flex-end",
        }}>
          {!visible &&
            <View style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Image source={{uri: clientObj.imageName}} style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}/>
            </View>}
          <View style={{
            width: 130,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 0.25 * screenWidth,
            display: visible && "none"
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: visible ? "500" : "400",
            }}>{clientObj.name}
            </Text>
          </View>
          <TouchableOpacity style={{
            height: 50,
            justifyContent: "center",
            transform: [visible ? {rotate: "180deg"} : {rotate: "0deg"}],
          }} onPress={() => {
            setVisible(!visible)
          }}
          >
            <MaterialIcons name="arrow-drop-down-circle" size={28} color="black"/>
          </TouchableOpacity>
        </View>
        {/* visible === true*/}
        {visible && (
          <View marginTop={-20}>
            <View style={{
              paddingHorizontal: 26,
              paddingBottom: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <View style={{alignItems: "center"}}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: "500",
                  marginBottom: 15,
                }}>{clientObj.name}
                </Text>
                <TouchableOpacity style={styles.imageWrapper} onPress={() => {
                  navigation.navigate("ClientDetailScreen", {clientObj})
                }}>
                  <Image source={{uri: clientObj.imageName}} style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                  }}/>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.info}>Gender: {clientObj.gender}</Text>
                <Text style={styles.info}>Email: {clientObj.emailAddress}</Text>
                <Text style={styles.info}>Mobile: {clientObj.phone}</Text>
              </View>
            </View>
            <View style={{alignItems: "center"}}>
              <PrimaryButton title="Cancel His/Her Session" paddingHorizontal={20} paddingVertical={10} marginTop={10}
                             fontSize={17}/>
            </View>
          </View>
        )}
      </View>
    )
  }

  const removeSession = useRemoveSession();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/*Session Details*/}
        <View style={styles.sessionDetailWrapper}>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 8}}>
            <View style={{marginRight: 12}}>
              <FontAwesome5 name="calendar-alt" size={20} color="black"/>
            </View>
            <Text style={{fontSize: 16}}>{startDate}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 8}}>
            <View style={{marginRight: 12, marginLeft: -1.5}}>
              <FontAwesome5 name="clock" size={20} color="black"/>
            </View>
            <Text style={{fontSize: 16}}>From {format(convertMilitaryTime(startDate, startTime), "HH:mm")}</Text>
            <Text
              style={{fontSize: 16}}> to {format(add(convertMilitaryTime(startDate, startTime), {minutes: sessionLength}), "HH:mm")}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 8}}>
            <View style={{marginRight: 16, marginLeft: 2}}>
              <FontAwesome5 name="map-pin" size={20} color="black"/>
            </View>
            <Text style={{fontSize: 16, width: 320}}>{address}, {city}, {state}, {zipcode}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 8}}>
            <View style={{marginRight: 14}}>
              <FontAwesome name="group" size={16} color="black"/>
            </View>
            <Text style={{fontSize: 16}}>1/5</Text>
          </View>
          <View style={{alignItems: "center"}}>
            <PrimaryButton title={"Cancel Entire Session"}
                           paddingHorizontal={10}
                           paddingVertical={10}
                           marginTop={10}
                           marginBottom={5}
                           fontSize={17}
                           warning={true}
                           onPress={() => {
                             removeSession.mutate({
                               id: userId,
                               startDate: startDate,
                               startTime: startTime
                             })
                           }}
            />
          </View>
        </View>
        {/*clients */}
        {sessionObj.sessionObj.clientProfileList.map((clientObj, index) => (
          <ClientDetails clientObj={clientObj} key={index}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
    marginTop: 10,
    width: screenWidth,
  },
  sessionDetailWrapper: {
    borderRadius: 14,
    width: 0.9 * screenWidth,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 1},
    shadowRadius: 4,
    marginVertical: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  clientDetailWrapper: {
    width: 0.9 * screenWidth,
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
  info: {
    fontSize: 16,
    fontWeight: "400",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1.5,
    marginVertical: 8,
  },
})
export default SessionDetailScreen