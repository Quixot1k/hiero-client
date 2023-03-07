import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import {
  birthChanged,
  firstNameChanged,
  genderChanged,
  lastNameChanged,
  mobileChanged,
} from "../features/userSlice";

export default function InfoScreen({ navigation }) {
  const dispatch = useDispatch();
  const { firstName, lastName, birth, gender, mobile } = useSelector(
    (state) => state.user
  );
  const handleNext = () => {
    console.log("goto IntSpecScreen");
    navigation.navigate("IntSpecScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Tell us more</Text>
        <TextInput
          value={firstName}
          placeholder="First Name"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch(firstNameChanged(text));
          }}
        />
        <TextInput
          value={lastName}
          placeholder="Last Name"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch(lastNameChanged(text));
          }}
        />
        <TextInput
          value={birth}
          placeholder="Birth"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch(birthChanged(text));
          }}
        />
        <TextInput
          value={gender}
          placeholder="Gender"
          style={styles.textInput}
          onChangeText={(text) => {
            dispatch(genderChanged(text));
          }}
        />
        <TextInput
          value={mobile}
          placeholder="Mobile"
          style={[styles.textInput, { marginBottom: 10 }]}
          onChangeText={(text) => {
            dispatch(mobileChanged(text));
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
