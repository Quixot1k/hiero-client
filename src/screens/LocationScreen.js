import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Slider } from "@rneui/themed";
import PrimaryButton from "../components/PrimaryButton";
import {
  addr1Changed,
  addr2Chnaged,
  cityChanged,
  distanceChanged,
  stateChanged,
  zipChanged,
} from "../features/userSlice";

export default function LocationScreen({ navigation }) {
  const dispatch = useDispatch();
  const { addr1, addr2, city, state, zip, distance } = useSelector(
    (state) => state.user
  );
  const handleNext = () => {
    console.log("goto AvatarScreen");
    navigation.navigate("AvatarScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>What's your location</Text>
        <View>
          <TextInput
            value={addr1}
            placeholder="Address 1"
            style={[styles.textInput, { width: 270 }]}
            onChangeText={(text) => {
              dispatch(addr1Changed(text));
            }}
          />
          <TextInput
            value={addr2}
            placeholder="Address 2"
            style={[styles.textInput, { width: 270, marginVertical: 8 }]}
            onChangeText={(text) => {
              dispatch(addr2Chnaged(text));
            }}
          />
          <View style={styles.textInputGroup}>
            <TextInput
              value={city}
              placeholder="City"
              style={[styles.textInput, { width: 85 }]}
              onChangeText={(text) => {
                dispatch(cityChanged(text));
              }}
            />
            <TextInput
              value={state}
              placeholder="State"
              style={[styles.textInput, { marginHorizontal: 6, width: 85 }]}
              onChangeText={(text) => {
                dispatch(stateChanged(text));
              }}
            />
            <TextInput
              value={zip}
              placeholder="Zip Code"
              style={[styles.textInput, { width: 88 }]}
              onChangeText={(text) => {
                dispatch(zipChanged(text));
              }}
            />
          </View>
        </View>
        <View style={styles.map}></View>
        <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 500 }}>
          How far are you willing to go for service?
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
            marginTop: 10,
            fontWeight: 500,
          }}
        >
          Distance
          <Text style={{ fontSize: 18, fontStyle: "italic", fontWeight: 800 }}>
            {" "}
            {distance}
            {distance == 90 ? "+ " : " "}
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
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: 500,
    marginBottom: 26,
  },
  textInput: {
    borderWidth: 1.8,
    borderRadius: 4,
    height: 40,
    textAlign: "center",
    fontSize: 15,
  },
  textInputGroup: {
    flexDirection: "row",
  },
  map: {
    borderWidth: 1.4,
    borderRadius: 30,
    height: 250,
    width: 266,
    marginTop: 20,
    marginBottom: 22,
    backgroundColor: "#ccc",
  },
});
