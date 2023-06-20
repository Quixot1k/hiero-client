import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { CheckBox } from "@rneui/base";
import LocationCard from "../components/LocationCard";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import {
  trainerLocationsAdded,
  trainerLocationsRemoved,
} from "../features/userSlice";

const { width: screenWidth } = Dimensions.get("window");
export default function TrainerLocationScreen({ navigation }) {
  // global state
  const dispatch = useDispatch();
  const { userId, trainerLocations } = useSelector((state) => state.user);
  const { loggedIn } = useSelector((state) => state.general);
  // local state
  initialLocation = {
    locationId: "",
    name: "",
    address: "",
    addr1: "",
    addr2: "",
    city: "",
    state: "",
    zipcode: "",
    locationType: "Home", // [Gym, Home]
    latitude: -1.0,
    longitude: -1.0,
  };
  const [location, setLocation] = useState(initialLocation);

  const handleSave = async () => {
    try {
      await axios.put(
        "http://127.0.0.1:10001/trainer/locations",
        {
          trainerLocations: {
            trainerId: userId,
            locations: trainerLocations,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = () => {
    const nextLocation = {
      locationId: parseInt(uuid()),
      address: location.name + "," + location.addr1 + "," + location.addr2,
      city: location.city,
      state: location.state,
      zipcode: location.zipcode,
      locationType: location.locationType,
      latitude: Math.random(),
      longitude: Math.random(),
    };
    dispatch(trainerLocationsAdded(nextLocation));
    setLocation(initialLocation);
  };

  const handleRemove = (locationId) => {
    console.log(trainerLocations);
    dispatch(trainerLocationsRemoved(locationId));
  };

  const handleNext = () => {
    console.log("goto BioScreen");
    navigation.navigate("BioScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollView, { marginTop: 20 }]}
      >
        {/* Input Section */}
        <Text style={styles.header}>Add training locations</Text>
        <View style={[styles.inputSectionWrapper, { width: screenWidth - 30 }]}>
          <TextInput
            value={location.name}
            placeholder="Training Location Name"
            style={styles.textInput}
            onChangeText={(text) => {
              setLocation({ ...location, name: text });
            }}
          />
          <TextInput
            value={location.addr1}
            placeholder="Address 1"
            style={styles.textInput}
            onChangeText={(text) => {
              setLocation({ ...location, addr1: text });
            }}
          />
          <TextInput
            value={location.addr2}
            placeholder="Address 2"
            style={styles.textInput}
            onChangeText={(text) => {
              setLocation({ ...location, addr2: text });
            }}
          />
          <View style={styles.textInputGroup}>
            <TextInput
              value={location.city}
              placeholder="City"
              style={[styles.textInput, { width: 95 }]}
              onChangeText={(text) => {
                setLocation({ ...location, city: text });
              }}
            />
            <TextInput
              value={location.state}
              placeholder="State"
              style={[styles.textInput, { marginHorizontal: 6, width: 96 }]}
              onChangeText={(text) => {
                setLocation({ ...location, state: text });
              }}
            />
            <TextInput
              value={location.zipcode}
              placeholder="Zip Code"
              style={[styles.textInput, { width: 97 }]}
              onChangeText={(text) => {
                setLocation({ ...location, zipcode: text });
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <CheckBox
              size={22}
              checked={location.locationType == "Gym" ? true : false}
              checkedColor="#000"
              title={"Gym"}
              textStyle={{ fontSize: 16, fontWeight: 500, color: "#000" }}
              wrapperStyle={{ marginBottom: -10 }}
              onPress={() =>
                setLocation((prevLocation) => ({
                  ...prevLocation,
                  locationType: "Gym",
                }))
              }
            />
            <CheckBox
              size={22}
              checked={location.locationType == "Home" ? true : false}
              checkedColor="#000"
              title={"Residential"}
              textStyle={{ fontSize: 16, fontWeight: 500, color: "#000" }}
              wrapperStyle={{ marginBottom: -10 }}
              onPress={() =>
                setLocation((prevLocation) => ({
                  ...prevLocation,
                  locationType: "Home",
                }))
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: -10,
            }}
          >
            <SecondaryButton
              title={"Add"}
              width={128}
              onPress={handleAdd}
              height={40}
              paddingVertical={0}
              fontSize={18}
              fontWeight={600}
            />
          </View>
        </View>
        {/* Location List */}
        {trainerLocations.length > 0 && (
          <View style={styles.listWrapper}>
            <ScrollView
              contentContainerStyle={[
                styles.scrollView,
                { width: screenWidth - 30 },
              ]}
            >
              {trainerLocations.map((obj, index) => (
                <LocationCard
                  key={index}
                  locationId={obj.locationId}
                  name={obj.address.split(",")[0]}
                  addr1={obj.address.split(",")[1]}
                  addr2={obj.address.split(",")[2] || ""}
                  city={obj.city}
                  state={obj.state}
                  zipcode={obj.zipcode}
                  locationType={obj.locationType}
                  handleRemove={handleRemove}
                />
              ))}
            </ScrollView>
          </View>
        )}
        <View style={{ paddingBottom: 30 }}>
          {loggedIn ? (
            <PrimaryButton title="Save" onPress={handleSave} />
          ) : (
            <PrimaryButton title="Next" onPress={handleNext} />
          )}
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
    width: screenWidth,
  },
  header: {
    fontSize: 26,
    fontWeight: 500,
    marginBottom: 10,
  },
  inputSectionWrapper: {
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
    paddingTop: 14,
    marginBottom: 20,
  },
  textInput: {
    width: 300,
    height: 45,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 6,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
  },
  textInputGroup: {
    flexDirection: "row",
  },
  listWrapper: {
    height: 300,
    width: screenWidth - 30,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
  },
});
