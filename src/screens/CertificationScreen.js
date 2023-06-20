import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Dropdown } from "react-native-element-dropdown";
import {
  certificationsAdded,
  certificationsRemoved,
} from "../features/userSlice";
import CertificationCard from "../components/CertificationCard";
import PrimaryButton from "../components/PrimaryButton";

const selections = [
  { label: "Company", type: "Company" },
  { label: "XXX", type: "XXX" },
  { label: "YYY", type: "YYY" },
];

const { width: screenWidth } = Dimensions.get("window");
export default function CertificationScreen({ navigation }) {
  // global state
  const dispatch = useDispatch();
  const { certifications } = useSelector((state) => state.user);
  // local certification state
  const [type, setType] = useState("Company");
  const [number, setNumber] = useState();

  const handleAdd = () => {
    // if (!type || !number) return;
    const certificationId = uuid();
    const newCertification = {
      certificationId: certificationId,
      certificationType: type,
      certificationNumber: number,
    };
    dispatch(certificationsAdded(newCertification));
  };
  const handleRemove = (certificationId) => {
    dispatch(certificationsRemoved(certificationId));
  };
  const handleNext = () => {
    console.log("goto Capacity");
    navigation.navigate("CapacityScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Upload your certifications</Text>
        <View style={styles.pannelWrapper}>
          <Dropdown
            style={[styles.dropdown]}
            selectedTextStyle={{
              fontSize: 17,
              textAlign: "center",
              marginLeft: 12,
            }}
            iconStyle={styles.iconStyle}
            data={selections}
            labelField="label"
            valueField="type"
            value={type}
            onChange={(item) => {
              console.log(item);
              setType(item.type);
            }}
          />
          <TextInput
            value={number}
            placeholder={"Certification Number"}
            style={[styles.textInput, { marginBottom: 10 }]}
            onChangeText={(text) => {
              setNumber(text);
            }}
          />
          <TouchableOpacity style={{ marginTop: 8 }} onPress={handleAdd}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>
              Add a certification +
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            width: 300,
            height: 230,
            marginBottom: 20,
            marginTop: 10,
            width: screenWidth,
          }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {certifications.map((obj) => (
            <CertificationCard
              key={obj.certificationId}
              CertificationId={obj.certificationId}
              type={obj.certificationType}
              number={obj.certificationNumber}
              handleRemove={handleRemove}
            />
          ))}
        </ScrollView>
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
    marginTop: 60,
    alignItems: "center",
    width: screenWidth,
  },
  header: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 34,
  },
  pannelWrapper: {
    alignItems: "center",
    backgroundColor: "#fcfcfc",
    borderRadius: 6,
    paddingVertical: 35,
    paddingHorizontal: 50,
    paddingBottom: 20,
    marginBottom: 16,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
  },
  dropdown: {
    borderWidth: 1.4,
    borderRadius: 10,
    width: 220,
    height: 50,
    paddingHorizontal: 16,
  },
  textInput: {
    textAlign: "center",
    borderWidth: 1.4,
    borderRadius: 10,
    height: 50,
    width: 220,
    fontSize: 17,
    marginTop: 14,
  },
});
