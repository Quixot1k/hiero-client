import {Slider} from "@rneui/themed";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View,} from "react-native";
import {useEffect, useState} from "react";
import PrimaryButton from "../../components/PrimaryButton";
import MapView, {Circle, Marker} from "react-native-maps";
import * as Location from "expo-location";
import {useStore} from "../../store";
import validator from "validator/es";

const {width: windowWidth} = Dimensions.get("window");
export default function ClientLocationScreen({navigation}) {
  const {
    role,
    addr1,
    addr2,
    city,
    state,
    zip,
    distance,
    latitude,
    longitude,
  } = useStore((state) => state);

  const {
    updateAddr1,
    updateAddr2,
    updateCity,
    updateState,
    updateZip,
    updateDistance,
    updateLatitude,
    updateLongitude,
  } = useStore((state) => state);

  const [warning, setWarning] = useState({
    addr1: false,
    addr2: false,
    city: false,
    state: false,
    zip: false,
  })

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const {coords} = await Location.getCurrentPositionAsync();
      const {latitude, longitude} = coords;
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      updateAddr1(address[0].name);
      updateAddr2(address[0].street);
      updateCity(address[0].city);
      updateState(address[0].region);
      updateZip(address[0].postalCode);
      updateLatitude(latitude);
      updateLongitude(longitude);
    })();
  }, []);

  const handleNext = () => {
    if (!addr1) {
      setWarning({...warning, addr1: true});
    } else if (!city) {
      setWarning({...warning, city: true});
    } else if (!state) {
      setWarning({...warning, state: true});
    } else if (!validator.isPostalCode(zip, 'US')) {
      setWarning({...warning, zip: true});
    } else {
      if (role === "client") {
        console.log("goto AvatarScreen");
        navigation.navigate("AvatarScreen");
      } else {
        console.log("goto TrainerLocationScreen");
        navigation.navigate("TrainerLocationScreen");
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>
          {role === "client" ? "What's your location" : "Residential Address"}
        </Text>
        <View>
          <TextInput
            value={addr1}
            placeholder="Address 1"
            textContentType={"streetAddressLine1"}
            style={[styles.textInput, {width: 300, shadowColor: warning.addr1 ? "#ff0000" : "#000000"}]}
            onChangeText={(text) => {
              updateAddr1(text);
              if (text) {
                setWarning({...warning, addr1: false});
              }
            }}
          />
          <TextInput
            value={addr2}
            placeholder="Address 2 (Optional)"
            textContentType={"streetAddressLine2"}
            style={[styles.textInput, {width: 300, marginVertical: 8}]}
            onChangeText={(text) => {
              updateAddr2(text);
            }}
          />
          <View style={styles.textInputGroup}>
            <TextInput
              value={city}
              placeholder="City"
              textContentType={"addressCity"}
              style={[styles.textInput, {width: 125, shadowColor: warning.city ? "#ff0000" : "#000000"}]}
              onChangeText={(text) => {
                updateCity(text);
                if (text) {
                  setWarning({...warning, city: false});
                }
              }}
            />
            <TextInput
              value={state}
              placeholder="State"
              textContentType={"addressState"}
              style={[styles.textInput, {
                marginHorizontal: 6,
                width: 81,
                shadowColor: warning.state ? "#ff0000" : "#000000"
              }]}
              onChangeText={(text) => {
                updateState(text);
                if (text) {
                  setWarning({...warning, state: false});
                }
              }}
            />
            <TextInput
              value={zip}
              placeholder="Zip Code"
              textContentType={"postalCode"}
              style={[styles.textInput, {width: 81, shadowColor: warning.zip ? "#ff0000" : "#000000"}]}
              onChangeText={(text) => {
                updateZip(text);
                if (validator.isPostalCode(text, 'US')) {
                  setWarning({...warning, zip: false});
                }
              }}
            />
          </View>
        </View>
        <View style={styles.mapWrapper}>
          <MapView
            style={{width: "100%", height: "100%", borderRadius: 20}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
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
        <PrimaryButton title="Next" onPress={handleNext}/>
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
    fontWeight: "500",
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
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
  textInputGroup: {
    flexDirection: "row",
  },
  mapWrapper: {
    borderRadius: 12,
    height: 240,
    width: 300,
    marginTop: 20,
    marginBottom: 22,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
  },
});
