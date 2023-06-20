import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import {
  userIdChanged,
  emailChanged,
  passwordChanged,
  firstNameChanged,
  lastNameChanged,
  birthChanged,
  genderChanged,
  mobileChanged,
  intSpecsInited,
  capacityChanged,
  addr1Changed,
  addr2Changed,
  cityChanged,
  stateChanged,
  zipChanged,
  latitudeChanged,
  longitudeChanged,
  distanceChanged,
  avatarChanged,
  zoomInited,
  zoomChanged,
  homeInited,
  homeChanged,
  businessChanged,
  certificationsInited,
  certificationsAdded,
  certificationsRemoved,
  trainerLocationsInited,
  trainerLocationsAdded,
  trainerLocationsRemoved,
  bioChanged,
  bidChanged,
} from "../features/userSlice";
import { roleChanged, messageChanged } from "../features/generalSlice";

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    email: "ghuges2@uci.edu",
    password: "abc",
  });
  const dispatch = useDispatch();
  const { role, message } = useSelector((state) => state.general);

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
          if (res.status == 200) {
            // initialize all global states
            const clientProfile = res.data.clientProfile;
            const clientCategories = res.data.clientCategories;
            // const clientLocations = res.data.clientLocations;
            dispatch(userIdChanged(clientProfile.clientId));
            dispatch(emailChanged(clientProfile.emailAddress));
            dispatch(passwordChanged(clientProfile.password));
            if (clientProfile.name) {
              dispatch(firstNameChanged(clientProfile.name.split(",")[0]));
              dispatch(lastNameChanged(clientProfile.name.split(",")[1]));
            }
            dispatch(birthChanged(clientProfile.age));
            dispatch(genderChanged(clientProfile.gender));
            dispatch(mobileChanged(clientProfile.phone));
            if (clientCategories) {
              dispatch(intSpecsInited(clientCategories.categories));
            }
            dispatch(capacityChanged(clientProfile.maxOtherClientsToShareWith));
            if (clientProfile.address) {
              dispatch(addr1Changed(clientProfile.address.split(",")[0]));
              dispatch(addr2Changed(clientProfile.address.split(",")[1]));
            }
            dispatch(cityChanged(clientProfile.city));
            dispatch(stateChanged(clientProfile.state));
            dispatch(zipChanged(clientProfile.zipcode));
            // dispatch(latitudeChanged(clientProfile.latitude));
            // dispatch(longitudeChanged(clientProfile.longitude));
            dispatch(distanceChanged(clientProfile.maxTravelDistance));
            dispatch(avatarChanged(clientProfile.imageName));
            dispatch(zoomInited(clientProfile.zoom));
            dispatch(homeInited(clientProfile.home));
            // navigate
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "TabNavigatorScreen" }],
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
          if (res.status == 200) {
            console.log(res.data);
            // initialize all global states
            const trainerProfile = res.data.trainerProfile;
            let trainerCategories = [];
            if (res.data.providerCategories) {
              trainerCategories = res.data.providerCategories.categories;
            }
            let trainerLocations = [];
            if (res.data.trainerLocations) {
              console.log("location", res.data.trainerLocations);
              trainerLocations = res.data.trainerLocations.locations;
            }
            // const trainerCertification = res.data.providerCategories.certifications;
            dispatch(userIdChanged(trainerProfile.trainerId));
            dispatch(emailChanged(trainerProfile.emailAddress));
            dispatch(passwordChanged(state.password));
            if (trainerProfile.name) {
              dispatch(firstNameChanged(trainerProfile.name.split(",")[0]));
              dispatch(lastNameChanged(trainerProfile.name.split(",")[1]));
            }
            dispatch(birthChanged(trainerProfile.age));
            dispatch(genderChanged(trainerProfile.gender));
            dispatch(mobileChanged(trainerProfile.phone));
            if (trainerCategories) {
              dispatch(intSpecsInited(trainerCategories));
            }
            dispatch(capacityChanged(trainerProfile.maxClientsPerSession));
            if (trainerProfile.address) {
              dispatch(addr1Changed(trainerProfile.address.split(",")[0]));
              dispatch(addr2Changed(trainerProfile.address.split(",")[1]));
            }
            dispatch(cityChanged(trainerProfile.city));
            dispatch(stateChanged(trainerProfile.state));
            dispatch(zipChanged(trainerProfile.zipcode));
            // dispatch(latitudeChanged(trainerProfile.latitude));
            // dispatch(longitudeChanged(trainerProfile.longitude));
            dispatch(distanceChanged(trainerProfile.maxTravelDistance));
            dispatch(avatarChanged(trainerProfile.imageName));
            dispatch(zoomInited(trainerProfile.zoomSession));
            dispatch(homeInited(trainerProfile.clientsHomeSession));
            // dispatch(avatarChanged(trainerProfile.imageName));
            // trainer additional state
            dispatch(businessChanged(trainerProfile.business));
            // dispatch(certificationsInited(trainerProfile.certifications));
            dispatch(trainerLocationsInited(trainerLocations));
            dispatch(bioChanged(trainerProfile.bio));
            dispatch(bidChanged(trainerProfile.minimumBid));
            // navigate
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "TabNavigatorScreen" }],
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
              setState((preState) => {
                return {
                  ...preState,
                  email: text,
                };
              });
            }}
          />
        </View>
        <View style={[styles.textInputGroup, { marginBottom: 20 }]}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(text) => {
              setState((preState) => {
                return {
                  ...preState,
                  password: text,
                };
              });
            }}
          />
        </View>
        <View>
          <CheckBox
            title={"I'm a client"}
            size={24}
            textStyle={{ fontSize: 18, fontWeight: 500, color: "#000" }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role == "client" ? true : false}
            checkedColor="#000"
            onPress={() => {
              dispatch(roleChanged("client"));
            }}
          />
          <CheckBox
            title={"I'm a trainer"}
            size={24}
            textStyle={{ fontSize: 18, fontWeight: 500, color: "#000" }}
            wrapperStyle={{ marginTop: -10 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role == "trainer" ? true : false}
            checkedColor="#000"
            onPress={() => {
              dispatch(roleChanged("trainer"));
            }}
          />
        </View>
        <PrimaryButton
          title={"Sign In"}
          onPress={role == "client" ? handleClientSignIn : handleTrainerSignIn}
        />
        <TouchableOpacity>
          <Text style={[styles.text, { marginTop: 10, fontSize: 18 }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("goto SignUpScreen and clear navigation stack");
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "SignUpScreen" }],
              })
            );
          }}
        >
          <Text
            style={[
              styles.text,
              { marginTop: 20, textDecorationLine: "underline" },
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
    fontWeight: 500,
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
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    marginHorizontal: 10,
  },
});
