import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import {
  birthChanged,
  businessChanged,
  firstNameChanged,
  genderChanged,
  lastNameChanged,
  mobileChanged,
} from "../features/userSlice";

export default function InfoScreen({ navigation }) {
  const dispatch = useDispatch();
  const { firstName, lastName, birth, business, gender, mobile } = useSelector(
    (state) => state.user
  );
  const { role } = useSelector((state) => state.general);
  const handleNext = () => {
    console.log("goto IntSpecScreen");
    navigation.navigate("IntSpecScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={
          role == "client"
            ? styles.scrollView
            : [styles.scrollView, { marginTop: 50 }]
        }
      >
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
        {role == "trainer" && (
          <TextInput
            value={business}
            placeholder="Business name (if applicable)"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch(businessChanged(text));
            }}
          />
        )}
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
        <PrimaryButton title="Next" onPress={handleNext} marginTop={40} />
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
    marginTop: 80,
  },
  header: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 10,
    height: 50,
    width: 260,
    marginTop: 25,
    paddingLeft: 10,
    fontSize: 17,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    marginHorizontal: 10,
  },
});
