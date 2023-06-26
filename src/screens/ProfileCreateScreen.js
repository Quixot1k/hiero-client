import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, TextInput, View,} from "react-native";
import {CommonActions} from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import FormData from "form-data";
import {useStore} from "../store";

const {width: screenWidth} = Dimensions.get("window");

export default function ProfileCreateScreen({navigation}) {
  const {
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
    avatar,
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
    updateMessage,
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
  } = useStore((state) => state);
  // const globalState = useStore((state) => state);
  const handleClientSignUp = async () => {
    // console.log("globalState: ", globalState);
    const formData = new FormData();
    const userData = {
      clientProfile: {
        clientId: "",
        name: lastName + "," + firstName,
        emailAddress: "test@email.com",
        password: "password",
        phone: mobile,
        age: parseInt(birth), // int
        address: addr1 + "," + addr2,
        city: city,
        state: state,
        zipcode: zip,
        maxTravelDistance: parseInt(distance), // int
        gender: gender, // 0:Male, 1:Female, 2:Other
        homeSession: home, // boolean
        zoomSession: zoom, // boolean
        maxOtherClientsToShareWith: parseInt(capacity),
        maxSessionsPerWeekByClient: 1,
      },
      clientCategories: {
        // clientId: "",
        // categories: intSpecs,
      },
      clientLocations: {
        //   clientId: "",
        //   locations: [
        //     {
        //       locationId: 1,
        //       locationType: "Home/Gym/Zoom/Other",
        //       city: "",
        //       state: "",
        //       zipcode: "",
        //       address: "",
        //       latitude: 1.1,
        //       longitude: 1.1,
        //     },
        //   ],
      },
    };
    const avatarResponse = await fetch(avatar);
    const avatarBlob = await avatarResponse.blob();
    const avatarFile = new File([avatarBlob], "avatar.jpg", {
      type: "image/jpeg",
    });
    formData.append("image", avatarFile);
    formData.append("clientInfoEntity", JSON.stringify(userData));
    try {
      await axios
        .post("http://localhost:10001/client", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to 'multipart/form-data'
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Registration Success");
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: "TabNavigator"}],
              })
            );
          } else {
            updateMessage("Registration failed, please try again");
            console.log("Registration failed");
            console.log(res);
          }
        });
    } catch (error) {
      console.log(error);
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
        age: parseInt(birth), // int
        maxTravelDistance: parseInt(distance), // int
        gender: gender, // 0:Male, 1:Female, 2:Other
        imageName: "",
        minimumBid: parseInt(bid),
        bio: bio,
        maxClientsPerSession: parseInt(capacity),
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
    };
    const avatarResponse = await fetch(avatar);
    const avatarBlob = await avatarResponse.blob();
    const avatarFile = new File([avatarBlob], "avatar.jpg", {
      type: "image/jpeg",
    });
    formData.append("image", avatarFile);
    formData.append("certificate", avatarFile);
    formData.append("trainerInfoEntity", JSON.stringify(userData));

    try {
      console.log(userData);
      await axios
        .post("http://localhost:10001/trainer", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to 'multipart/form-data'
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Registration Success");
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
          {avatar ? (
            <Image
              source={{uri: avatar}}
              style={{width: 120, height: 120, borderRadius: 60}}
            />
          ) : (
            <View style={styles.circle}></View>
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
            value={firstName}
            style={[styles.textInput, {width: 159}]}
            placeholder={"First Name"}
            onChangeText={(text) => {
              updateFirstName(text);
            }}
          />
          <TextInput
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
            value={birth}
            style={[styles.textInput, {width: 73}]}
            placeholder={"Birth"}
            onChangeText={(text) => {
              updateBirth(text);
            }}
          />
          <TextInput
            value={gender}
            style={[styles.textInput, {width: 73}]}
            placeholder={"Gender"}
            onChangeText={(text) => {
              updateGender(text);
            }}
          />
          <TextInput
            value={email}
            style={[styles.textInput, {width: 160}]}
            placeholder={"Email Address"}
            onChangeText={(text) => {
              updateEmail(text);
            }}
          />
        </View>
        {/*<TextInput*/}
        {/*  value={password}*/}
        {/*  style={styles.textInput}*/}
        {/*  placeholder={"Password"}*/}
        {/*  onChangeText={(text) => {*/}
        {/*    updatePassword(text);*/}
        {/*    updatePassword2(text);*/}
        {/*  }}*/}
        {/*/>*/}
        <TextInput
          value={mobile}
          style={styles.textInput}
          placeholder={"Phone Number"}
          onChangeText={(text) => {
            updateMobile(text);
          }}
        />
        <TextInput
          value={addr1}
          style={styles.textInput}
          placeholder={"Address 1"}
          onChangeText={(text) => {
            updateAddr1(text);
          }}
        />
        <TextInput
          value={addr2}
          style={styles.textInput}
          placeholder={"Address 2"}
          onChangeText={(text) => {
            updateAddr2(text);
          }}
        />
        <View style={{flexDirection: "row"}}>
          <TextInput
            value={city}
            style={[styles.textInput, {width: 122}]}
            placeholder={"City"}
            onChangeText={(text) => {
              updateCity(text);
            }}
          />
          <TextInput
            value={state}
            style={[styles.textInput, {width: 92}]}
            placeholder={"State"}
            onChangeText={(text) => {
              updateState(text);
            }}
          />
          <TextInput
            value={zip}
            style={[styles.textInput, {width: 92}]}
            placeholder={"Zip Code"}
            onChangeText={(text) => {
              updateZip(text);
            }}
          />
        </View>
        <TextInput
          value={distance ? String(distance) : ""}
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
        {role === "client" ? (
          <View>
            <TextInput
              value={`Willing to train at zoom: ${zoom ? "Yes" : "No"}`}
              style={styles.textInput}
              placeholder={"Willing to train over Zoom? "}
            />
            <TextInput
              value={`Willing to train at home: ${home ? "Yes" : "No"}`}
              style={styles.textInput}
              placeholder={"Willing to train at home?"}
            />
          </View>
        ) : (
          <View style={{flexDirection: "row"}}>
            <TextInput
              value={`Home session: ${zoom ? "Yes" : "No"}`}
              style={[styles.textInput, {width: 154}]}
            ></TextInput>
            <TextInput
              value={`Zoom session: ${zoom ? "Yes" : "No"}`}
              style={[styles.textInput, {width: 154}]}
            ></TextInput>
          </View>
        )}

        {role === "trainer" && (
          <TextInput
            value={String(bid)}
            style={[styles.textInput, {width: 160}]}
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
  circle: {
    borderWidth: 0.2,
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
  },
  textInput: {
    borderRadius: 10,
    textAlign: "center",
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
