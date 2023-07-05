import {useState} from "react";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import axios from "axios";
import {CheckBox} from "@rneui/base";
import LocationCard from "../components/LocationCard";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import {useStore} from "../store";
import validator from "validator/es";


const {width: screenWidth} = Dimensions.get("window");
export default function TrainerLocationScreen({navigation}) {
  // global state
  const {isLogged, userId, trainerLocations} = useStore((state) => state);
  const {addTrainerLocation, removeTrainerLocation} = useStore(
    (state) => state
  );
  // local state
  const initialLocation = {
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
  const [warning, setWarning] = useState({
    name: false,
    address: false,
    addr1: false,
    city: false,
    state: false,
    zipcode: false,
  });
  const handleSave = async () => {
    try {
      await axios.put(
        "http://127.0.0.1:10001/trainer/locations",
        {
          trainerLocations: {
            trainerId: userId,
            location_commissions: 0,
            locations: trainerLocations,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        console.log(JSON.stringify(res));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = () => {
    const timestamp = String(new Date().getTime());
    const nextLocation = {
      locationId: -Math.abs(parseInt(timestamp.substring(timestamp.length - 5))),
      address: location.name + "," + location.addr1 + "," + location.addr2,
      city: location.city,
      state: location.state,
      zipcode: location.zipcode,
      locationType: location.locationType,
      latitude: Math.random(),
      longitude: Math.random(),
    };
    addTrainerLocation(nextLocation);
    setLocation(initialLocation);
  };

  const handleRemove = (locationId) => {
    console.log(trainerLocations);
    removeTrainerLocation(locationId);
  };


  const handleNext = () => {
    console.log("goto BioScreen");
    navigation.navigate("BioScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollView, {marginTop: 20}]}
      >
        {/* Input Section */}
        <Text style={styles.header}>Add training locations</Text>
        <View style={[styles.inputSectionWrapper, {width: screenWidth - 30}]}>
          <TextInput
            value={location.name}
            placeholder="Training Location Name"
            style={[styles.textInput, {shadowColor: warning.name ? "#ff0000" : "#000000"}]}
            onChangeText={(text) => {
              setLocation({...location, name: text});
              if (text) {
                setWarning({...warning, name: false});
              }
            }}
          />
          <TextInput
            value={location.addr1}
            placeholder="Address 1"
            textContentType={"streetAddressLine1"}
            style={[styles.textInput, {shadowColor: warning.addr1 ? "#ff0000" : "#000000"}]}
            onChangeText={(text) => {
              setLocation({...location, addr1: text});
              if (text) {
                setWarning({...warning, addr1: false});
              }
            }}
          />
          <TextInput
            value={location.addr2}
            placeholder="Address 2 (Optional)"
            textContentType={"streetAddressLine2"}
            style={[styles.textInput, {shadowColor: warning.addr2 ? "#ff0000" : "#000000"}]}
            onChangeText={(text) => {
              setLocation({...location, addr2: text});
            }}
          />
          <View style={styles.textInputGroup}>
            <TextInput
              value={location.city}
              placeholder="City"
              textContentType={"addressCity"}
              style={[styles.textInput, {width: 95, shadowColor: warning.city ? "#ff0000" : "#000000"}]}
              onChangeText={(text) => {
                setLocation({...location, city: text});
                if (text) {
                  setWarning({...warning, city: false});
                }
              }}
            />
            <TextInput
              value={location.state}
              placeholder="State"
              textContentType={"addressState"}
              style={[styles.textInput, {
                marginHorizontal: 6,
                width: 96,
                shadowColor: warning.state ? "#ff0000" : "#000000"
              }]}
              onChangeText={(text) => {
                setLocation({...location, state: text});
                if (text) {
                  setWarning({...warning, state: false});
                }
              }}
            />
            <TextInput
              value={location.zipcode}
              placeholder="Zip Code"
              textContentType={"postalCode"}
              style={[styles.textInput, {width: 97, shadowColor: warning.zipcode ? "#ff0000" : "#000000"}]}
              onChangeText={(text) => {
                setLocation({...location, zipcode: text});
                if (validator.isPostalCode(text, 'US')) {
                  setWarning({...warning, zipcode: false});
                }
              }}
            />
          </View>
          <View
            style={{flexDirection: "row", justifyContent: "space-around"}}
          >
            <CheckBox
              size={22}
              checked={location.locationType === "Gym"}
              checkedColor="#000"
              title={"Gym"}
              textStyle={{fontSize: 16, fontWeight: "500", color: "#000"}}
              wrapperStyle={{marginBottom: -10}}
              onPress={() =>
                setLocation((prevLocation) => ({
                  ...prevLocation,
                  locationType: "Gym",
                }))
              }
            />
            <CheckBox
              size={22}
              checked={location.locationType === "Home"}
              checkedColor="#000"
              title={"Residential"}
              textStyle={{fontSize: 16, fontWeight: "500", color: "#000"}}
              wrapperStyle={{marginBottom: -10}}
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
              marginBottom: -3,
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
                {width: screenWidth - 30},
              ]}
            >
              {trainerLocations?.map((obj, index) => (
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
        <View style={{paddingBottom: 30}}>
          {isLogged ? (
            <PrimaryButton title="Save" onPress={handleSave}/>
          ) : (
            <PrimaryButton title="Next" onPress={handleNext}/>
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
    fontWeight: "500",
    marginBottom: 10,
  },
  inputSectionWrapper: {
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
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
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
  textInputGroup: {
    flexDirection: "row",
  },
  listWrapper: {
    height: 360,
    width: screenWidth - 30,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
  },
});
