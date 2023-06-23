import React from "react";
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
import MapView, {Circle, Marker} from "react-native-maps";
import {CheckBox, Slider} from "@rneui/themed";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import {useStore} from "../store";

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
    avatar,
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
  } = useStore((state) => state)
  const {
    // updateMessage,
    updateBio,
    updateFirstName,
    updateLastName,
    updateBirth,
    updateGender,
    updateEmail,
    // updatePassword,
    // updatePassword2,
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
  } = useStore((state) => state)
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
      clientsHomeSession: home,
      zoomSession: zoom,
      imageName: "",
    };
    try {
      await axios
        .put(
          "http://127.0.0.1:10001/trainer/profile",
          {trainerProfile},
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            {avatar ? (
              <Image
                source={{uri: avatar}}
                style={{width: 120, height: 120, borderRadius: 60}}
              />
            ) : (
              <View style={styles.profileCircle}></View>
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
            fontSize={12}
            fontWeight={500}
            marginTop={10}
            marginBottom={0}
            paddingVertical={4}
            paddingHorizontal={14}
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
            <Text style={styles.text}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={(text) => {
                updateEmail(text);
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={mobile}
              onChangeText={(text) => {
                updateMobile(text);
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Age</Text>
            <TextInput
              style={styles.textInput}
              value={String(birth)}
              onChangeText={(text) => {
                updateBirth(parseInt(text));
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Gender</Text>
            <TextInput
              style={styles.textInput}
              value={gender}
              onChangeText={(text) => {
                updateGender(text);
              }}
            />
          </View>
          {role === "trainer" && (
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>Certification</Text>
              <TouchableOpacity
                style={{alignItems: "center", width: 300}}
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
        </View>
        {/* Map */}
        <View style={styles.mapWrapper}>
          <MapView
            style={{width: "100%", height: "100%", borderRadius: 20}}
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
        {/* CheckBox & Radio */}
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
                updateZoom();
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
                updateHome();
              }}
            />
          </View>
        </View>
        <PrimaryButton
          title={"Save"}
          fontSize={16}
          fontWeight={500}
          paddingVertical={8}
          onPress={() => {
            handleTrainerSave().catch((err) => {
              console.log(err);
            });
          }}
        />
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
    marginTop: 20,
    alignItems: "center",
    width: screenWidth,
  },
  headerSection: {
    width: 360,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  },
  profileCircle: {
    borderWidth: 0.2,
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: "#ccc",
  },
  textInputSection: {
    marginTop: 20,
    width: 360,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  },
  inputWrapper: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    width: 200,
    height: 35,
    backgroundColor: "#rgba(0,0,0,0)",
    borderBottomWidth: 1,
    paddingLeft: 10,
    fontSize: 17,
    shadowColor: "rgba(0,0,0,0.75)",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
  },
  mapWrapper: {
    borderRadius: 20,
    height: 240,
    width: 360,
    marginTop: 20,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
  },
});
