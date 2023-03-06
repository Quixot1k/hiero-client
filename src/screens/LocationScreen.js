import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useReducer } from "react";
import { Slider } from "@rneui/themed";
import PrimaryButton from "../components/PrimaryButton";

const reducer = (state, action) => {
  switch (action.type) {
    case "changeAddr1": {
      return {
        ...state,
        addr1: action.payload,
      };
    }
    case "changeAddr2": {
      return {
        ...state,
        addr2: action.payload,
      };
    }
    case "changeCity": {
      return {
        ...state,
        city: action.payload,
      };
    }
    case "changeState": {
      return {
        ...state,
        state: action.payload,
      };
    }
    case "changeZip": {
      return {
        ...state,
        zip: action.payload,
      };
    }
    case "changeDistance": {
      return {
        ...state,
        distance: action.payload,
      };
    }
  }
};
initialState = {
  addr1: "",
  addr2: "",
  city: "",
  state: "",
  zip: "",
  distance: "20",
};
export default function LocationScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const handleNext = () => {
    console.log("goto AvatarScreen");
    navigation.navigate("AvatarScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>What's your location?</Text>
        <View>
          <TextInput
            placeholder="Address 1"
            style={[styles.textInput, { width: 270 }]}
            onChangeText={(text) => {
              dispatch({ type: "changeAddr1", payload: text });
            }}
          />
          <TextInput
            placeholder="Address 2"
            style={[styles.textInput, { width: 270, marginVertical: 8 }]}
            onChangeText={(text) => {
              dispatch({ type: "changeAddr2", payload: text });
            }}
          />
          <View style={styles.textInputGroup}>
            <TextInput
              placeholder="City"
              style={[styles.textInput, { width: 85 }]}
              onChangeText={(text) => {
                dispatch({ type: "changeCity", payload: text });
              }}
            />
            <TextInput
              placeholder="State"
              style={[styles.textInput, { marginHorizontal: 6, width: 85 }]}
              onChangeText={(text) => {
                dispatch({ type: "changeState", payload: text });
              }}
            />
            <TextInput
              placeholder="Zip Code"
              style={[styles.textInput, { width: 88 }]}
              onChangeText={(text) => {
                dispatch({ type: "changeZip", payload: text });
              }}
            />
          </View>
        </View>
        <View style={styles.map}></View>
        <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 500 }}>
          How far are you willing to go for service?
        </Text>
        <Slider
          value={state.distance}
          minimumValue={1}
          maximumValue={90}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#ccc"
          allowTouchTrack={true}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "#000" }}
          trackStyle={{ height: 6, width: 250, borderRadius: 10 }}
          step={1}
          onValueChange={(value) => {
            dispatch({ type: "changeDistance", payload: value });
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
            {state.distance}
            {state.distance == 90 ? "+ " : " "}
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
    marginTop: 26,
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1.3,
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
    width: 260,
    marginTop: 18,
    marginBottom: 22,
    backgroundColor: "#ccc",
  },
});
