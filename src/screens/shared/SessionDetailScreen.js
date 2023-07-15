import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import PrimaryButton from "../../components/PrimaryButton";
import {add, format} from "date-fns";
import {useStore} from "../../store";
import useRemoveSession from "../../hooks/useRemoveSession";
import useRemoveClientFromSession from "../../hooks/useRemoveClientFromSession";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");
const SessionDetailScreen = ({navigation, route}) => {
  const sessionObj = route.params;
  const [clientProfileListCopy, setClientProfileListCopy] = useState(sessionObj.clientProfileList || []);
  const {userId, role} = useStore((state) => state);
  const removeSession = useRemoveSession();
  const removeClientFromSession = useRemoveClientFromSession();
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
              backgroundColor: "#ccc",
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
            marginRight: 0.275 * screenWidth,
            display: visible && "none"
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: "400",
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
              paddingHorizontal: 20,
              paddingBottom: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <View style={{alignItems: "center"}}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: "400",
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
              <View style={{marginTop: 30, width: 165}}>
                <Text style={styles.info}>Gender: {clientObj.gender}</Text>
                <Text
                  style={styles.info}>Email: {clientObj.emailAddress}</Text>
                <Text style={styles.info}>Mobile: {clientObj.phone}</Text>
              </View>
            </View>
            <View style={{alignItems: "center"}}>
              <PrimaryButton title="Cancel His/Her Session"
                             paddingHorizontal={10}
                             paddingVertical={8}
                             marginTop={10}
                             fontSize={15}
                             onPress={() => {
                               removeClientFromSession.mutate({
                                 id: clientObj.clientId,
                                 startDate: sessionObj.session.startDate,
                                 startTime: sessionObj.session.startTime,
                               }, {
                                 onSuccess: () => {
                                   // remove the client from clientProfileListCopy by clientId
                                   setClientProfileListCopy((prev) => {
                                     return prev.filter((client) => {
                                       return client.clientId !== clientObj.clientId;
                                     })
                                   })
                                 }
                               });
                             }}/>
            </View>
          </View>
        )}
      </View>
    )
  }

  const TrainerDetails = () => {
    return (
      <View style={styles.trainerDetailWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: sessionObj.trainerProfile.imageName}} style={{
            width: 120,
            height: 120,
            borderRadius: 60,
          }}/>
        </View>
        <View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 2}}>
            <MaterialIcons name="person" size={20} color="black" style={{marginRight: 8}}/>
            <Text style={styles.info}>{sessionObj.trainerProfile.name}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 2}}>
            <MaterialCommunityIcons name="gender-male" size={20} color="black" style={{marginRight: 8}}/>
            <Text style={styles.info}>{sessionObj.trainerProfile.gender}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 2}}>
            <MaterialIcons name="email" size={20} color="black" style={{marginRight: 8}}/>
            <Text style={styles.info}>{sessionObj.trainerProfile.emailAddress}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 2}}>
            <MaterialIcons name="phone-in-talk" size={20} color="black" style={{marginRight: 8}}/>
            <Text style={styles.info}>{sessionObj.trainerProfile.phone}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/*Session Details*/}
        <View style={styles.sessionDetailWrapper}>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 8}}>
            <View style={{marginRight: 12}}>
              <FontAwesome5 name="calendar-alt" size={20} color="black"/>
            </View>
            <Text style={{fontSize: 15}}>{sessionObj.session.startDate}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 8}}>
            <View style={{marginRight: 12, marginLeft: -1.5}}>
              <FontAwesome5 name="clock" size={20} color="black"/>
            </View>
            <Text
              style={{fontSize: 15}}>From {format(convertMilitaryTime(sessionObj.session.startDate, sessionObj.session.startTime), "HH:mm")}</Text>
            <Text
              style={{fontSize: 15}}> to {format(add(convertMilitaryTime(sessionObj.session.startDate, sessionObj.session.startTime), {minutes: sessionObj.session.sessionTimeLength}), "HH:mm")}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 8}}>
            <View style={{marginRight: 16, marginLeft: 2}}>
              <FontAwesome5 name="map-pin" size={20} color="black"/>
            </View>
            <Text style={{
              fontSize: 15,
              width: 0.725 * screenWidth
            }}>{sessionObj.location.address}, {sessionObj.location.city}, {sessionObj.location.state}, {sessionObj.location.zipcode}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", marginVertical: 8}}>
            <View style={{marginRight: 14}}>
              <FontAwesome name="group" size={16} color="black"/>
            </View>
            <Text style={{fontSize: 15}}>1/5</Text>
          </View>
          <View style={{alignItems: "center"}}>
            {role === "client" && <PrimaryButton title={"Cancel My Session"}
                                                 paddingHorizontal={10}
                                                 paddingVertical={8}
                                                 marginTop={10}
                                                 marginBottom={5}
                                                 fontSize={15}
                                                 warning={true}
                                                 onPress={() => {
                                                   removeClientFromSession.mutate({
                                                     id: userId,
                                                     startDate: sessionObj.session.startDate,
                                                     startTime: sessionObj.session.startTime,
                                                   }, {
                                                     // onSuccess: () => {
                                                     //   // remove the client from clientProfileListCopy by clientId
                                                     //   setClientProfileListCopy((prev) => {
                                                     //     return prev.filter((client) => {
                                                     //       return client.clientId !== clientObj.clientId;
                                                     //     })
                                                     //   })
                                                     // }
                                                   });
                                                 }}
            />}
            {role === "trainer" && <PrimaryButton title={"Cancel Entire Session"}
                                                  paddingHorizontal={10}
                                                  paddingVertical={8}
                                                  marginTop={10}
                                                  marginBottom={5}
                                                  fontSize={15}
                                                  warning={true}
                                                  onPress={() => {
                                                    removeSession.mutate({
                                                      id: userId,
                                                      startDate: sessionObj.session.startDate,
                                                      startTime: sessionObj.session.startTime
                                                    });
                                                  }}
            />}
          </View>
        </View>
        {/*trainer*/}
        <TrainerDetails/>
        {/*clients */}
        {clientProfileListCopy?.map((clientObj, index) => (
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
  trainerDetailWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 0.9 * screenWidth,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 1},
    shadowRadius: 3,
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    fontSize: 15,
    fontWeight: "400",
    // textShadowColor: "rgba(0, 0, 0, 0.1)",
    // textShadowOffset: {width: 1, height: 1},
    // textShadowRadius: 1.5,
    marginVertical: 5,
  },
})
export default SessionDetailScreen