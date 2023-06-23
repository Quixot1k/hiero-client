import {CommonActions} from "@react-navigation/native";
import {CheckBox} from "@rneui/themed";
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import {useStore} from "../store";
import {useState} from "react";

export default function LoginScreen({navigation}) {
  const role = useStore((state) => state.role);
  const {
    updateRole,
    updateUserId,
    updateEmail,
    updatePassword,
    updateFirstName,
    updateLastName,
    updateBirth,
    updateGender,
    updateMobile,
    updateBusiness,
    updateCertifications,
    updateIntSpecs,
    updateCapacity,
    updateAddr1,
    updateAddr2,
    updateCity,
    updateState,
    updateZip,
    // updateLatitude,
    // updateLongitude,
    updateDistance,
    updateTrainerLocations,
    updateZoom,
    updateHome,
    updateBid,
    updateBio,
    updateAvatar,
  } = useStore((state) => state);
  const [state, setState] = useState({
    email: "ghuges2@uci.edu",
    password: "abc",
  });
  const handleClientSignIn = async () => {
    try {
      await axios
        .post(
          "http://localhost:10001/client/login",
          {
            emailAddress: state.email,
            password: state.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            // initialize all global states
            const clientProfile = res.data.clientProfile;
            const clientCategories = res.data.clientCategories;
            updateUserId(clientProfile.trainerId);
            updateEmail(clientProfile.emailAddress);
            updatePassword(state.password);
            updateFirstName(clientProfile.name.split(",")[0]);
            updateLastName(clientProfile.name.split(",")[1]);
            updateBirth(clientProfile.age);
            updateGender(clientProfile.gender);
            updateMobile(clientProfile.phone);
            if (clientCategories) {
              updateIntSpecs(clientCategories.categories);
            }
            updateCapacity(clientProfile.maxOtherClientsToShareWith);
            updateZoom(clientProfile.zoom);
            updateHome(clientProfile.home);
            updateAvatar(clientProfile.imageName);
            if (clientProfile.address) {
              updateAddr1(clientProfile.address.split(",")[0]);
              updateAddr2(clientProfile.address.split(",")[1]);
            }
            // client additional states
            updateCity(clientProfile.city);
            updateState(clientProfile.state);
            updateZip(clientProfile.zipcode);
            // updateLatitude(clientProfile.latitude);
            // updateLongitude(clientProfile.longitude);
            updateDistance(clientProfile.maxTravelDistance);
            /* navigate */
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: "TabNavigator"}],
              })
            );
          } else {
            console.log(res.status);
          }
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleTrainerSignIn = async () => {
    try {
      await axios
        .post(
          "http://localhost:10001/trainer/login",
          {
            emailAddress: state.email,
            password: state.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            // initialize all global states
            const trainerProfile = res.data.trainerProfile;
            let trainerCategories = [];
            if (res.data.providerCategories) {
              trainerCategories = res.data.providerCategories.categories;
            }
            let trainerLocations = [];
            if (res.data.trainerLocations) {
              trainerLocations = res.data.trainerLocations.locations;
            }
            const trainerCertification = res.data.providerCategories.certifications;
            updateUserId(trainerProfile.trainerId);
            updateEmail(trainerProfile.emailAddress);
            updatePassword(state.password);
            updateFirstName(trainerProfile.name.split(",")[0]);
            updateLastName(trainerProfile.name.split(",")[1]);
            updateBirth(trainerProfile.age);
            updateGender(trainerProfile.gender);
            updateMobile(trainerProfile.phone);
            if (trainerCategories) {
              updateIntSpecs(trainerCategories);
            }
            updateCapacity(trainerProfile.maxClientsPerSession);
            updateAvatar(trainerProfile.imageName);
            updateZoom(trainerProfile.zoomSession);
            updateHome(trainerProfile.homeSession);
            // trainer additional states
            updateBusiness(trainerProfile.business);
            updateCertifications(trainerCertification);
            updateTrainerLocations(trainerLocations);
            updateBio(trainerProfile.bio);
            updateBid(trainerProfile.minimumBid);
            /* navigate */
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: "TabNavigator"}],
              })
            );
          } else {
            console.log(res.status);
          }
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Welcome to Kairos!</Text>
        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => {
              setState(prevState => ({
                ...prevState,
                email: text,
              }));
            }}
          />
        </View>
        <View style={[styles.textInputGroup, {marginBottom: 20}]}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(text) => {
              setState(prevState => ({
                ...prevState,
                password: text,
              }));
            }}
          />
        </View>
        <View>
          <CheckBox
            title={"I'm a client"}
            size={24}
            textStyle={{fontSize: 18, fontWeight: 500, color: "#000"}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role === "client"}
            checkedColor="#000"
            onPress={() => {
              updateRole("client")
            }}
          />
          <CheckBox
            title={"I'm a trainer"}
            size={24}
            textStyle={{fontSize: 18, fontWeight: 500, color: "#000"}}
            wrapperStyle={{marginTop: -10}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role === "trainer"}
            checkedColor="#000"
            onPress={() => {
              updateRole("trainer")
            }}
          />
        </View>
        <PrimaryButton
          title={"Sign In"}
          onPress={role === "client" ? handleClientSignIn : handleTrainerSignIn}
        />
        <TouchableOpacity>
          <Text style={[styles.text, {marginTop: 10, fontSize: 18}]}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("goto SignUpScreen and clear navigation stack");
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: "SignUpScreen"}],
              })
            );
          }}
        >
          <Text
            style={[
              styles.text,
              {marginTop: 20, textDecorationLine: "underline"},
            ]}
          >
            Haven't been one of our members?
          </Text>
        </TouchableOpacity>
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
    alignItems: "center",
    marginTop: 30,
  },
  header: {
    fontSize: 50,
    marginBottom: 28,
  },
  textInputGroup: {
    flexWrap: "wrap",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: "500",
  },
  textInput: {
    borderRadius: 10,
    height: 50,
    width: 260,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 17,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    marginHorizontal: 10,
  },
});
