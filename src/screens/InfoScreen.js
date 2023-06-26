import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import {useStore} from "../store";
import {Dropdown} from "react-native-element-dropdown";

const {width: screenWidth} = Dimensions.get("window");

const genderOptions = [
  {label: "Male", value: "male"},
  {label: "Female", value: "female"},
  {label: "Other", value: "other"},
];

export default function InfoScreen({navigation}) {
  const {role, firstName, lastName, birth, gender, mobile, business} =
    useStore((state) => state);
  const {
    updateFirstName,
    updateLastName,
    updateBirth,
    updateGender,
    updateMobile,
    updateBusiness,
  } = useStore((state) => state);

  const handleNext = () => {
    console.log("goto IntSpecScreen");
    navigation.navigate("IntSpecScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={
          role === "client"
            ? styles.scrollView
            : [styles.scrollView, {marginTop: 50}]
        }
      >
        <Text style={styles.header}>Tell us more</Text>
        <TextInput
          value={firstName}
          textContentType={"givenName"}
          placeholder="First Name"
          style={styles.textInput}
          onChangeText={(text) => {
            updateFirstName(text);
          }}
        />
        <TextInput
          value={lastName}
          placeholder="Last Name"
          textContentType={"familyName"}
          style={styles.textInput}
          onChangeText={(text) => {
            updateLastName(text);
          }}
        />

        <TextInput
          value={birth}
          placeholder="Birth"
          style={styles.textInput}
          onChangeText={(text) => {
            updateBirth(text);
          }}
        />
        {role === "trainer" && (
          <TextInput
            value={business}
            placeholder="Business name (if applicable)"
            textContentType={"organizationName"}
            style={styles.textInput}
            onChangeText={(text) => {
              updateBusiness(text);
            }}
          />
        )}
        <Dropdown
          style={styles.dropdown}
          selectedTextStyle={{
            fontSize: 17,
            textAlign: "center",
            marginLeft: 12,
          }}
          iconStyle={{
            marginRight: 12,
            height: 20,
            width: 20,
          }}
          placeholderStyle={{
            color: "rgb(200, 200, 200)",
            paddingLeft: 10,
            fontSize: 17,
          }}
          data={genderOptions}
          labelField="label"
          valueField="value"
          placeholder={"Select your gender"}
          value={gender}
          onChange={(item) => {
            console.log(item);
            updateGender(item.value);
          }}
        />
        <TextInput
          value={mobile}
          placeholder="Mobile"
          textContentType={"telephoneNumber"}
          style={[styles.textInput, {marginBottom: 10}]}
          onChangeText={(text) => {
            updateMobile(text);
          }}
        />
        <PrimaryButton title="Next" onPress={handleNext} marginTop={40}/>
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
    width: screenWidth,
  },
  header: {
    fontSize: 30,
    fontWeight: "500",
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
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
  dropdown: {
    borderRadius: 10,
    height: 50,
    width: 260,
    marginTop: 25,
    backgroundColor: "#fefefe",
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
});
