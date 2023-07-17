import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, TextInput, View} from "react-native";
import {CommonActions} from "@react-navigation/native";
import PrimaryButton from "../../components/PrimaryButton";
import axios from "axios";
import FormData from "form-data";
import {useStore} from "../../store";
import {format} from "date-fns";
import URL from "../../config/config";

const {width: screenWidth} = Dimensions.get("window");

export default function ProfileCreateScreen({navigation}) {
  const {
    deviceIds,
    role,
    // isLogged,
    // message,
    email,
    password,
    firstName,
    lastName,
    birth,
    gender,
    mobile,
    intSpecs,
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
    // latitude: 37.78825,
    // longitude: -122.4324,
    distance,
    /* only for trainer */
    business,
    certifications, // {certificationId: "", certificationType: "", certificationNumber: ""},
    trainerLocations, // {  locationId: "", name: "", addr1: "", addr2: "", city: "", state: "", zipcode: "", locationType: 0, latitude: -1.0, longitude: -1.0 },
    bio,
    bid,
  } = useStore((state) => state);

  const {
    updateIsLogged,
    updateMessage,
    updateBio,
    updateFirstName,
    updateLastName,
    updateBirth,
    updateGender,
    updateEmail,
    updateMobile,
    updateAddr1,
    updateAddr2,
    updateCity,
    updateState,
    updateZip,
    updateDistance,
    updateBid,
  } = useStore((state) => state);

  const handleClientSignUp = async () => {
    const formData = new FormData();
    const userData = {
      clientProfile: {
        clientId: "",
        name: firstName + "," + lastName,
        emailAddress: email,
        password: password,
        phone: mobile,
        age: 34,
        address: addr1 + "," + addr2,
        city: city,
        state: state,
        zipcode: zip,
        maxTravelDistance: distance,
        gender: gender,
        homeSession: home,
        zoomSession: zoom,
        maxOtherClientsToShareWith: capacity,
        maxSessionsPerWeekByClient: 5,
      },
      clientCategories: {
        clientId: "",
        categories: intSpecs,
      },
      clientLocations: {
        locations: [],
      },
      deviceIds: deviceIds,
    };
    formData.append("clientInfoEntity", JSON.stringify(userData));
    formData.append("image", {
      uri: avatarUri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    try {
      await axios
        .post(`${URL}/client`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Registration Success");
            updateIsLogged(true);
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: "TabNavigator"}],
              })
            );
          }
        }).catch((err) => {
          updateMessage("Registration failed, please try again");
          console.log("Registration failed");
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleTrainerSignUp = async () => {
    const formData = new FormData();
    const userData = {
      trainerProfile: {
        trainerId: "",
        name: lastName + "," + firstName,
        emailAddress: email,
        password: password,
        phone: mobile,
        age: birth, // date
        maxTravelDistance: distance, // int
        gender: gender, // 0:Male, 1:Female, 2:Other
        imageName: "",
        minimumBid: bid,
        bio: bio,
        maxClientsPerSession: capacity,
        homeSession: home, // boolean
        zoomSession: zoom, // boolean
      },
      providerCategories: {
        providerId: "",
        certificateName: "",
        categories: intSpecs,
      },
      trainerLocations: {
        trainerId: "",
        locations: trainerLocations,
      },
      deviceIds: deviceIds,
    };
    formData.append("image", {
      uri: avatarUri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    formData.append("certificate", {
      uri: avatarUri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    formData.append("trainerInfoEntity", JSON.stringify(userData));

    try {
      await axios
        .post(`${URL}/trainer`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Registration Success");
            updateIsLogged(true);
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: "TabNavigator"}],
              })
            );
          } else {
            updateMessage("Registration failed, please try again");
            console.log("Registration failed");
            console.log(JSON.stringify(res));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
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
                height: 100,
                width: 140,
                borderRadius: 10,
                marginHorizontal: 20,
                paddingHorizontal: 6,
                paddingVertical: 6,
                backgroundColor: "#fcfcfc",
                shadowColor: "black",
                shadowOpacity: 0.35,
                shadowOffset: {width: 2, height: 2},
                shadowRadius: 3,
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
          marginBottom={14}
          paddingVertical={4}
          paddingHorizontal={14}
        />
        <View style={{flexDirection: "row"}}>
          <TextInput
            editable={false}
            value={firstName}
            style={[styles.textInput, {width: 159}]}
            placeholder={"First Name"}
            onChangeText={(text) => {
              updateFirstName(text);
            }}
          />
          <TextInput
            editable={false}
            value={lastName}
            style={[styles.textInput, {width: 159}]}
            placeholder={"Last Name"}
            onChangeText={(text) => {
              updateLastName(text);
            }}
          />
        </View>
        <View style={{flexDirection: "row"}}>
          <TextInput
            editable={false}
            value={format(birth, "yyyy/MM/dd")}
            style={[styles.textInput, {width: 103}]}
            placeholder={"Birth"}
            onChangeText={(text) => {
              updateBirth(text);
            }}
          />
          <TextInput
            editable={false}
            value={gender}
            style={[styles.textInput, {width: 63}]}
            placeholder={"Gender"}
            onChangeText={(text) => {
              updateGender(text);
            }}
          />
          <TextInput
            editable={false}
            value={email}
            style={[styles.textInput, {width: 140}]}
            placeholder={"Email Address"}
            onChangeText={(text) => {
              updateEmail(text);
            }}
          />
        </View>
        <TextInput
          editable={false}
          value={mobile}
          style={styles.textInput}
          placeholder={"Phone Number"}
          onChangeText={(text) => {
            updateMobile(text);
          }}
        />
        {role === "client" && (
          <>
            <TextInput
              editable={false}
              value={addr1}
              style={styles.textInput}
              placeholder={"Address 1"}
              onChangeText={(text) => {
                updateAddr1(text);
              }}
            />
            <TextInput
              editable={false}
              value={addr2}
              style={styles.textInput}
              placeholder={"Address 2"}
              onChangeText={(text) => {
                updateAddr2(text);
              }}
            />
            <View style={{flexDirection: "row"}}>
              <TextInput
                editable={false}
                value={city}
                style={[styles.textInput, {width: 122}]}
                placeholder={"City"}
                onChangeText={(text) => {
                  updateCity(text);
                }}
              />
              <TextInput
                editable={false}
                value={state}
                style={[styles.textInput, {width: 92}]}
                placeholder={"State"}
                onChangeText={(text) => {
                  updateState(text);
                }}
              />
              <TextInput
                editable={false}
                value={zip}
                style={[styles.textInput, {width: 92}]}
                placeholder={"Zip Code"}
                onChangeText={(text) => {
                  updateZip(text);
                }}
              />
            </View>
          </>
        )}
        <TextInput
          editable={false}
          value={distance ? "Distance: " + String(distance) : ""}
          style={styles.textInput}
          placeholder={"Maximum Travel Distance: 0"}
          onChangeText={(text) => {
            if (text) {
              updateDistance(parseInt(text));
            } else {
              updateDistance(0);
            }
          }}
        />
        <View style={{flexDirection: "row"}}>
          <TextInput
            editable={false}
            value={`Home session: ${zoom ? "Yes" : "No"}`}
            style={[styles.textInput, {width: 159}]}
          />
          <TextInput
            editable={false}
            value={`Zoom session: ${zoom ? "Yes" : "No"}`}
            style={[styles.textInput, {width: 159}]}
          />
        </View>
        {role === "trainer" && (
          <TextInput
            editable={false}
            value={"Minimum Bid: " + String(bid)}
            style={[styles.textInput, {width: 180}]}
            placeholder={"Minimum Bid"}
            onChangeText={(text) => {
              updateBid(parseInt(text));
            }}
          />
        )}
        <View style={{paddingBottom: 30}}>
          <PrimaryButton
            title={"Save"}
            onPress={
              role === "client" ? handleClientSignUp : handleTrainerSignUp
            }
          />
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
    justifyContent: "center",
  },
  scrollView: {
    marginTop: 20,
    alignItems: "center",
    width: screenWidth,
  },
  defaultAvatar: {
    borderWidth: 0.2,
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
  },
  textInput: {
    borderRadius: 10,
    textAlign: "center",
    color: "#252525",
    height: 46,
    width: 330,
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
