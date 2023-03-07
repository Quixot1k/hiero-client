import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import PrimaryButton from "../components/PrimaryButton";
import { roleChanged } from "../features/generalSlice";
import {
  emailChanged,
  password2Changed,
  passwordChanged,
} from "../features/userSlice";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.general.role);
  const { email, password, password2 } = useSelector((state) => state.user);

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
        <Text style={[styles.header, { marginBottom: 24 }]}>
          With The Best!
        </Text>
        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            value={email}
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch(emailChanged(text));
            }}
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={password}
            placeholder="Password (8 or more characters)"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch(passwordChanged(text));
            }}
          />
        </View>
        <View style={[styles.textInputGroup, { marginBottom: 20 }]}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={password2}
            placeholder="Password Again"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch(password2Changed(text));
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
            checked={role == "customer" ? true : false}
            checkedColor="#000"
            onPress={() => {
              dispatch(roleChanged("customer"));
            }}
          />
          <CheckBox
            title={"I'm a provider"}
            size={24}
            textStyle={{ fontSize: 18, fontWeight: 500, color: "#000" }}
            wrapperStyle={{ marginTop: -10 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role == "provider" ? true : false}
            checkedColor="#000"
            onPress={() => {
              dispatch(roleChanged("provider"));
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
