import React, {useMemo, useRef, useState} from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {Circle, Marker} from "react-native-maps";
import {CheckBox, Slider} from "@rneui/themed";
import axios from "axios";
import PrimaryButton from "../../components/PrimaryButton";
import {useStore} from "../../store";
import validator from "validator/es";
import BottomSheet, {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import URL from "../../config/url";
import GENDER_OPTION from "../../constant/GENDER_OPTION";
import {Dropdown} from "react-native-element-dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const {width: screenWidth} = Dimensions.get("window");
export default function Profile({navigation}) {
  const {
    role,
    userId,
    firstName,
    lastName,
    email,
    password,
    mobile,
    birth,
    gender,
    capacity,
    avatarUri,
    zoom,
    home,
    /* only for client */
    addr1,
    addr2,
    city,
    state,
    zip,
    latitude,
    longitude,
    distance,
    /* only for trainer */
    // business,
    bio,
    bid,
  } = useStore((state) => state);
  const {
    // updateMessage,
    updateBio,
    updateFirstName,
    updateLastName,
    updateBirth,
    updateGender,
    updateEmail,
    updatePassword,
    updatePassword2,
    updateMobile,
    updateAddr1,
    updateAddr2,
    updateCity,
    updateState,
    updateZip,
    updateDistance,
    updateBid,
    updateZoom,
    updateHome,
  } = useStore((state) => state);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(-1);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  })
  const snapPoints = useMemo(() => ["97.5%"], []);
  const bottomSheetRef = useRef(null);

  const handleClientSave = async () => {
    const clientProfile = {
      clientId: userId,
      name: firstName + "," + lastName,
      emailAddress: email,
      password: password,
      phone: mobile,
      age: parseInt(birth),
      address: addr1 + "," + addr2,
      city: city,
      state: state,
      zipcode: zip,
      maxTravelDistance: parseInt(distance),
      gender: gender,
      imageName: avatarUri,
      homeSession: home,
      zoomSession: zoom,
      maxOtherClientsToShareWith: capacity,
      maxSessionsPerWeekByClient: 5,
    }
    try {
      await axios
        .put(
          `${URL}/client/profile`,
          {clientProfile},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("Update Successfully");
          } else {
            console.log(JSON.stringify(res));
          }
        });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };
  const handleTrainerSave = async () => {
    const trainerProfile = {
      trainerId: userId,
      name: firstName + "," + lastName,
      emailAddress: email,
      password: password,
      phone: mobile,
      age: parseInt(birth),
      gender: gender,
      bio: bio,
      minimumBid: parseInt(bid),
      maxTravelDistance: parseInt(distance),
      maxClientsPerSession: parseInt(capacity),
      zoomSession: zoom,
      homeSession: home,
      imageName: avatarUri,
    };
    try {
      await axios
        .put(`${URL}/trainer/profile`, {trainerProfile})
        .then((res) => {
          if (res.status === 200) {
            console.log("Update Successfully");
          } else {
            console.log(JSON.stringify(res));
          }
        });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  const handleUpdatePassword = () => {
    if (passwords.oldPassword !== password) {
      console.log("wrong old password");
    } else if (passwords.newPassword === passwords.oldPassword) {
      console.log("new password must be different from old password");
    } else if (!validator.isStrongPassword(passwords.newPassword)) {
      console.log("new password is not strong");
    } else if (passwords.newPassword2 !== passwords.newPassword) {
      console.log("new password does not match");
    } else {
      updatePassword(passwords.newPassword);
      updatePassword2(passwords.newPassword);
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              {avatarUri ? (
                <Image
                  source={{uri: avatarUri}}
                  style={{width: 120, height: 120, borderRadius: 60}}
                />
              ) : (
                <View style={styles.defaultAvatar}></View>
              )}
              {role === "trainer" && (
                <TextInput
                  style={{
                    height: 104,
                    width: 140,
                    borderWidth: 0.5,
                    marginHorizontal: 20,
                    paddingHorizontal: 6,
                    paddingVertical: 6,
                  }}
                  value={bio}
                  onChangeText={(text) => {
                    updateBio(text);
                  }}
                ></TextInput>
              )}
            </View>
            <PrimaryButton
              title={"Update profile picture"}
              fontSize={16}
              fontWeight={"500"}
              paddingVertical={8}
              marginBottom={5}
            />
          </View>
          {/* TextInput */}
          <View style={styles.textInputSection}>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>First Name</Text>
              <TextInput
                style={styles.textInput}
                value={firstName}
                onChangeText={(text) => {
                  updateFirstName(text);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>Last Name</Text>
              <TextInput
                style={styles.textInput}
                value={lastName}
                onChangeText={(text) => {
                  updateLastName(text);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={(text) => {
                  updateEmail(text);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>Phone</Text>
              <TextInput
                style={styles.textInput}
                value={mobile}
                onChangeText={(text) => {
                  updateMobile(text);
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>Birth</Text>
              <RNDateTimePicker
                value={new Date()}
                mode={"date"}
                onChange={(event, selectedDate) => {
                  updateBirth(selectedDate);
                }}
              />
              {/*<TextInput*/}
              {/*  style={styles.textInput}*/}
              {/*  value={String(birth)}*/}
              {/*  onChangeText={(text) => {*/}
              {/*    updateBirth(parseInt(text));*/}
              {/*  }}*/}
              {/*/>*/}
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>Gender</Text>
              <Dropdown
                style={[styles.dropdown]}
                selectedTextStyle={{
                  fontSize: 16,
                  textAlign: "center",
                  marginLeft: 12,
                }}
                iconStyle={{
                  marginRight: 12,
                  height: 20,
                  width: 20,
                }}
                iconColor={"#3f3f3f"}
                placeholderStyle={{
                  color: "rgb(200, 200, 200)",
                  paddingLeft: 10,
                  fontSize: 16,
                }}
                value={gender}
                data={GENDER_OPTION}
                labelField="label"
                valueField="value"
                placeholder={"Select your gender"}
                onChange={(item) => {
                  updateGender(item.value);
                }}
              />
            </View>
            {role === "trainer" && (
              <View style={styles.inputWrapper}>
                <Text style={styles.text}>Certification</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CertificationScreen")}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      textDecorationLine: "underline",
                    }}
                  >
                    Go to Certification
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {role === "trainer" && (
              <View style={styles.inputWrapper}>
                <Text style={styles.text}>Bid</Text>
                <TextInput
                  style={styles.textInput}
                  value={String(bid)}
                  onChangeText={(text) => {
                    updateBid(parseInt(text));
                  }}
                />
              </View>
            )}
            {role === "client" && (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={styles.text}>Address 1</Text>
                  <TextInput
                    style={styles.textInput}
                    value={addr1}
                    onChangeText={(text) => {
                      updateAddr1(text);
                    }}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.text}>Address 2</Text>
                  <TextInput
                    style={styles.textInput}
                    value={addr2}
                    onChangeText={(text) => {
                      updateAddr2(text);
                    }}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.text}>City</Text>
                  <TextInput
                    style={styles.textInput}
                    value={city}
                    onChangeText={(text) => {
                      updateCity(text);
                    }}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.text}>State</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state}
                    onChangeText={(text) => {
                      updateState(text);
                    }}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.text}>Zip Code</Text>
                  <TextInput
                    style={styles.textInput}
                    value={zip}
                    onChangeText={(text) => {
                      updateZip(text);
                    }}
                  />
                </View>
              </>
            )}
            <PrimaryButton title={"Update Password"}
                           fontSize={16}
                           fontWeight={"500"}
                           paddingVertical={8}
                           marginBottom={5}
                           onPress={() =>
                             bottomSheetRef.current?.expand()
                           }/>
          </View>
          {/* Map */}
          <View style={styles.mapWrapper}>
            <MapView
              style={{width: "100%", height: "100%", borderRadius: 10}}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: distance / 30,
                longitudeDelta: distance / 30,
              }}
            >
              <Marker coordinate={{latitude: latitude, longitude: longitude}}/>
              <Circle
                center={{latitude: latitude, longitude: longitude}}
                radius={1609 * distance}
                fillColor={"rgba(255,255,255,0.3)"}
              />
            </MapView>
          </View>
          {/* Slider & CheckBox & Radio */}
          <View style={styles.textInputSection}>
            <Text style={{fontSize: 16, marginBottom: 6, fontWeight: "500"}}>
              {role === "client"
                ? "How far are you willing to go for service?"
                : "How far are you willing to travel to clients?"}
            </Text>
            <Slider
              value={distance}
              minimumValue={1}
              maximumValue={90}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#ccc"
              allowTouchTrack={true}
              thumbStyle={{height: 20, width: 20, backgroundColor: "#000"}}
              trackStyle={{height: 6, width: 250, borderRadius: 10}}
              step={1}
              onValueChange={(value) => {
                updateDistance(value);
              }}
            />
            <Text
              style={{
                fontSize: 16,
                marginBottom: 6,
                marginTop: 6,
                fontWeight: "500",
              }}
            >
              Distance
              <Text
                style={{fontSize: 18, fontStyle: "italic", fontWeight: "800"}}
              >
                {" "}
                {distance < 90 ? distance : 90}
                {distance >= 90 ? "+ " : " "}
              </Text>
              miles
            </Text>
            <View>
              <CheckBox
                size={22}
                checked={zoom === true}
                checkedColor="#000"
                title={"Online session possible?"}
                textStyle={{fontSize: 16, fontWeight: 500, color: "#000000"}}
                containerStyle={{marginBottom: -15, backgroundColor: "#fcfcfc"}}
                onPress={() => {
                  updateZoom(!zoom);
                }}
              />
              <CheckBox
                size={22}
                checked={home === true}
                checkedColor="#000"
                title={"Home session possible?"}
                textStyle={{fontSize: 16, fontWeight: 500, color: "#000000"}}
                containerStyle={{backgroundColor: "#fcfcfc"}}
                onPress={() => {
                  updateHome(!home);
                }}
              />
            </View>
          </View>
          <View style={{paddingBottom: 20}}>
            <PrimaryButton
              title={"Save"}
              paddingVertical={10}
              paddingHorizontal={30}
              marginTop={25}
              fontSize={17}
              fontWeight={"500"}
              onPress={() => {
                console.log(role);
                if (role === "client") {
                  handleClientSave().catch((err) => {
                    console.log(err);
                  });
                } else if (role === "trainer") {
                  handleTrainerSave().catch((err) => {
                    console.log(err);
                  });
                }
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {/*bottomSheet*/}
      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetVisible}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={{paddingHorizontal: 20}}
        backgroundStyle={styles.bottomSheet}
        onChange={(index) => {
          setBottomSheetVisible(index);
        }}
      >
        <View style={{alignItems: "center", marginTop: 30}}>
          <Text style={{fontSize: 22, fontWeight: "600"}}>Update Your Password</Text>
          <View style={{marginTop: 20}}>
            <BottomSheetTextInput placeholder={"Old Password"} style={styles.bottomSheetTextInput}
                                  onChangeText={(text) => {
                                    setPasswords({...passwords, oldPassword: text})
                                  }}/>
            <BottomSheetTextInput placeholder={"New Password"} style={styles.bottomSheetTextInput}
                                  onChangeText={(text) => {
                                    setPasswords({...passwords, newPassword: text})
                                  }}/>
            <BottomSheetTextInput placeholder={"Confirm New Password"} style={styles.bottomSheetTextInput}
                                  onChangeText={(text) => {
                                    setPasswords({...passwords, newPassword2: text})
                                  }}/>
          </View>
          <PrimaryButton title={"Confirm"} paddingVertical={10} paddingHorizontal={20} marginTop={25} fontSize={17}
                         onPress={handleUpdatePassword}
          />
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollView: {
    paddingTop: 20,
    alignItems: "center",
    width: screenWidth,
  },
  headerSection: {
    width: 0.9 * screenWidth,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    elevation: 5,
  },
  defaultAvatar: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: "#ccc",
  },
  textInputSection: {
    marginTop: 20,
    width: 0.9 * screenWidth,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    elevation: 5,
  },
  inputWrapper: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
  },
  textInput: {
    width: 195,
    height: 45,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    elevation: 7,
  },
  bottomSheet: {
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 12,
  },
  bottomSheetTextInput: {
    width: 0.75 * screenWidth,
    height: 45,
    fontSize: 17,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 3,
    elevation: 5,
  },
  mapWrapper: {
    borderRadius: 10,
    height: 240,
    width: 0.9 * screenWidth,
    marginTop: 20,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
    elevation: 5,
  },
  dropdown: {
    borderRadius: 10,
    width: 195,
    height: 45,
    paddingLeft: 10,
    backgroundColor: "#fefefe",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    elevation: 7,
  },
});
