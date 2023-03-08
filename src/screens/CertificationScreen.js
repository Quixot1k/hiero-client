import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import PrimaryButton from "../components/PrimaryButton";

const selections = [
  { label: "Company", value: "Company" },
  { label: "XXX", value: "XXX" },
  { label: "YYY", value: "YYY" },
];

export default function CertificationScreen({ navigation }) {
  const [value, setValue] = useState("Company");
  const [isFocus, setFocus] = useState(false);

  const handleNext = () => {
    console.log("goto Capacity");
    navigation.navigate("CapacityScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Upload your certification</Text>
        <View
          style={{
            alignItems: "center",
            borderWidth: 1.5,
            borderRadius: 6,
            padding: 34,
            paddingBottom: 22,
            marginBottom: 16,
          }}
        >
          <Dropdown
            style={[styles.dropdown]}
            selectedTextStyle={{ fontSize: 17, textAlign: "center" }}
            iconStyle={styles.iconStyle}
            data={selections}
            labelField="label"
            valueField="value"
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setFocus(false);
            }}
          />
          <TextInput
            placeholder={"Certification Number"}
            style={[styles.textInput, { marginBottom: 10 }]}
          />
          <TouchableOpacity style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 18 }}>Add a certification +</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 140,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 34,
  },
  dropdown: {
    borderWidth: 1.4,
    borderRadius: 4,
    width: 220,
    height: 50,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  textInput: {
    textAlign: "center",
    borderWidth: 1.4,
    borderRadius: 4,
    height: 50,
    width: 220,
    fontSize: 17,
    marginTop: 14,
  },
});
