import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useReducer } from "react";
import PrimaryButton from "../components/PrimaryButton";

const reducer = (state, action) => {
  switch (action.type) {
    case "changeFirstName": {
      return {
        ...state,
        firstName: action.payload,
      };
    }
    case "changeLastName": {
      return {
        ...state,
        lastName: action.payload,
      };
    }
    case "changeBirth": {
      return {
        ...state,
        birth: action.payload,
      };
    }
    case "changeGender": {
      return {
        ...state,
        gender: action.payload,
      };
    }
    case "changeMobile": {
      return {
        ...state,
        mobile: action.payload,
      };
    }
  }
};

const initialState = {
  firstName: "",
  lastName: "",
  birth: "",
  gender: "", // 0 for female, 1 for male
  mobile: "",
  role: 0, // 0 for customer, 1 for provider
};

export default function InfoScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const handleNext = () => {
    console.log("goto IntSpecScreen");
    navigation.navigate("IntSpecScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Tell us more</Text>
        <TextInput
          value={state.firstName}
          placeholder="First Name"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch({ type: "changeFirstName", payload: text });
          }}
        />
        <TextInput
          value={state.lastName}
          placeholder="Last Name"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch({ type: "changeLastName", payload: text });
          }}
        />
        <TextInput
          value={state.birth}
          placeholder="Birth"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch({ type: "changeBirth", payload: text });
          }}
        />
        <TextInput
          value={state.gender}
          placeholder="Gender"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch({ type: "changeGender", payload: text });
          }}
        />
        <TextInput
          value={state.mobile}
          placeholder="Mobile"
          style={[styles.textInput, { marginBottom: 10 }]}
          onChangeText={(text) => {
            dispatch({ type: "changeMobile", payload: text });
          }}
        />
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
    alignItems: "center",
    marginTop: 90,
  },
  header: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    height: 50,
    width: 260,
    marginTop: 25,
    paddingLeft: 12,
    fontSize: 17,
  },
});
