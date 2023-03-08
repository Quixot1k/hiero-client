import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { CommonActions } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  console.log(state);
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
        <PrimaryButton
          title={"Sign In"}
          onPress={() => {
            console.log("Sign In");
          }}
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
    marginTop: 90,
  },
  header: {
    fontSize: 50,
    marginBottom: 35,
  },
  textInputGroup: {
    flexWrap: "wrap",
    marginBottom: 20,
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
    paddingLeft: 10,
    fontSize: 17,
  },
});
