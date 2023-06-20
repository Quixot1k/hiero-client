import { Slider } from "@rneui/themed";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import {
  addr1Changed,
  addr2Changed,
  cityChanged,
  stateChanged,
  zipChanged,
  distanceChanged,
  latitudeChanged,
  longitudeChanged,
} from "../features/userSlice";

const { width: windowWidth } = Dimensions.get("window");
export default function LocationScreen({ navigation }) {
  const [lat, setLat] = useState(37.78825);
  const [lon, setLon] = useState(-122.4324);
  const dispatch = useDispatch();
  const { addr1, addr2, city, state, zip, distance } = useSelector(
    (state) => state.user
  );
  const { role } = useSelector((state) => state.general);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync();
      let { latitude, longitude } = coords;
      let address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setLat(latitude);
      setLon(longitude);
      dispatch(addr1Changed(address[0].name));
      dispatch(addr2Changed(address[0].street));
      dispatch(cityChanged(address[0].city));
      dispatch(stateChanged(address[0].region));
      dispatch(zipChanged(address[0].postalCode));
      dispatch(latitudeChanged(latitude));
      dispatch(longitudeChanged(longitude));
    })();
  }, []);

  const handleNext = () => {
    if (role == "client") {
      console.log("goto AvatarScreen");
      navigation.navigate("AvatarScreen");
    } else {
      console.log("goto TrainerLocationScreen");
      navigation.navigate("TrainerLocationScreen");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>
          {role == "client" ? "What's your location" : "Residential Address"}
        </Text>
        <View>
          <TextInput
            value={addr1}
            placeholder="Address 1"
            style={[styles.textInput, { width: 300 }]}
            onChangeText={(text) => {
              dispatch(addr1Changed(text));
            }}
          />
          <TextInput
            value={addr2}
            placeholder="Address 2"
            style={[styles.textInput, { width: 300, marginVertical: 8 }]}
            onChangeText={(text) => {
              dispatch(addr2Changed(text));
            }}
          />
          <View style={styles.textInputGroup}>
            <TextInput
              value={city}
              placeholder="City"
              style={[styles.textInput, { width: 125 }]}
              onChangeText={(text) => {
                dispatch(cityChanged(text));
              }}
            />
            <TextInput
              value={state}
              placeholder="State"
              style={[styles.textInput, { marginHorizontal: 6, width: 81 }]}
              onChangeText={(text) => {
                dispatch(stateChanged(text));
              }}
            />
            <TextInput
              value={zip}
              placeholder="Zip Code"
              style={[styles.textInput, { width: 81 }]}
              onChangeText={(text) => {
                dispatch(zipChanged(text));
              }}
            />
          </View>
        </View>
        <View style={styles.mapWrapper}>
          <MapView
            style={{ width: "100%", height: "100%", borderRadius: 20 }}
            initialRegion={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: distance / 30,
              longitudeDelta: distance / 30,
            }}
          >
            <Marker coordinate={{ latitude: lat, longitude: lon }} />
            <Circle
              center={{ latitude: lat, longitude: lon }}
              radius={1609 * distance}
              fillColor={"rgba(255,255,255,0.3)"}
            />
          </MapView>
        </View>
        <Text style={{ fontSize: 16, marginBottom: 6, fontWeight: 500 }}>
          {role == "client"
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
          thumbStyle={{ height: 20, width: 20, backgroundColor: "#000" }}
          trackStyle={{ height: 6, width: 250, borderRadius: 10 }}
          step={1}
          onValueChange={(value) => {
            dispatch(distanceChanged(value));
          }}
        />
        <Text
          style={{
            fontSize: 16,
            marginBottom: 6,
            marginTop: 6,
            fontWeight: 500,
          }}
        >
          Distance
          <Text style={{ fontSize: 18, fontStyle: "italic", fontWeight: 800 }}>
            {" "}
            {distance < 90 ? distance : 90}
            {distance >= 90 ? "+ " : " "}
          </Text>
          miles
        </Text>
        <PrimaryButton title="Next" onPress={handleNext} />
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
    marginTop: 30,
    width: windowWidth,
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: 500,
    marginBottom: 26,
  },
  textInput: {
    borderRadius: 10,
    height: 40,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
  },
  textInputGroup: {
    flexDirection: "row",
  },
  mapWrapper: {
    borderRadius: 20,
    height: 240,
    width: 300,
    marginTop: 20,
    marginBottom: 22,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
  },
});
