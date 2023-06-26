import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import {useStore} from "../store";
import {Dropdown} from "react-native-element-dropdown";
import validator from "validator";
import {useState} from "react";
import DatePicker from "react-native-date-picker";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {format} from "date-fns";

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

  const [visible, setVisible] = useState(false);

  const handleNext = () => {
    if (!validator.isDate(birth)) {
      console.log(birth);
      console.log("invalid birth");
    } else if (!validator.isMobilePhone(mobile, "en-US")) {
      console.log(mobile);
      console.log("invalid mobile");
    } else {
      console.log("goto IntSpecScreen");
      navigation.navigate("IntSpecScreen");
    }
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
        <View
          style={[styles.textInputView, {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 14,
          }]}>
          <TextInput
            style={{marginLeft: 10, fontSize: 17}}
            editable={false}
            value={birth ? format(birth, "yyyy/MM/dd") : ""}
            placeholder="Birth (YYYY/MM/DD)"
          />
          <TouchableOpacity onPress={() => {
            setVisible(true)
          }}>
            <MaterialCommunityIcons name="calendar-cursor" size={24} color="#3f3f3f"/>
          </TouchableOpacity>
        </View>
        <DatePicker modal open={visible} date={new Date()} mode="date"
                    onConfirm={(date) => {
                      updateBirth(date)
                      setVisible(false)
                    }}
                    onCancel={() => {
                      setVisible(false)
                    }}/>

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
          iconColor={"#3f3f3f"}
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
  textInputView: {
    borderRadius: 10,
    height: 50,
    width: 260,
    marginTop: 25,
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
