import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import { useReducer } from "react";
import PrimaryButton from "../components/PrimaryButton";

const reducer = (state, action) => {
  switch (action.type) {
    case "changeEmail": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "changePassword": {
      return {
        ...state,
        password: action.payload,
      };
    }
    case "changeSecondPassword": {
      return {
        ...state,
        secondPassword: action.payload,
      };
    }
    case "changeRole": {
      return {
        ...state,
        role: action.payload,
      };
    }
  }
};

const initialState = {
  email: "",
  password: "",
  secondPassword: "",
  role: "customer",
};
export default function LoginScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  const handleSignUp = () => {
    console.log("goto InfoScreen and clear navigation stack");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "InfoScreen" }],
      })
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Get Connected</Text>
        <Text style={[styles.header, { marginBottom: 35 }]}>
          With The Best!
        </Text>
        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            value={state.email}
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch({ type: "changeEmail", payload: text });
            }}
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={state.password}
            placeholder="Password (8 or more characters)"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch({ type: "changePassword", payload: text });
            }}
          />
        </View>
        <View style={[styles.textInputGroup, { marginBottom: 20 }]}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={state.secondPassword}
            placeholder="Password Again"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch({ type: "changeSecondPassword", payload: text });
            }}
          />
        </View>
        <View>
          <CheckBox
            title={"I'm a customer"}
            size={24}
            textStyle={{ fontSize: 18, fontWeight: 500, color: "#000" }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={state.role == "customer" ? true : false}
            checkedColor="#000"
            onPress={() => {
              dispatch({ type: "changeRole", payload: "customer" });
            }}
          />
          <CheckBox
            title={"I'm a provider"}
            size={24}
            textStyle={{ fontSize: 18, fontWeight: 500, color: "#000" }}
            wrapperStyle={{ marginTop: -10 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={state.role == "provider" ? true : false}
            checkedColor="#000"
            onPress={() => {
              dispatch({ type: "changeRole", payload: "provider" });
            }}
          />
        </View>
        <PrimaryButton title={"Sign Up"} onPress={handleSignUp} />
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
    marginTop: 50,
  },
  header: {
    fontSize: 32,
    fontWeight: 500,
    marginBottom: 10,
  },
  textInputGroup: {
    flexWrap: "wrap",
    margin: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 3,
    fontWeight: 500,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    height: 50,
    width: 260,
    marginTop: 5,
    paddingLeft: 8,
    fontSize: 14,
  },
});
