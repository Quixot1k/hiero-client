import {useState} from "react";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {v4 as uuid} from "uuid";
import {Dropdown} from "react-native-element-dropdown";
import CertificationCard from "../components/CertificationCard";
import PrimaryButton from "../components/PrimaryButton";
import {useStore} from "../store";

const typeOptions = [
  {label: "Company", value: "Company"},
  {label: "XXX", value: "XXX"},
  {label: "YYY", value: "YYY"},
];

const {width: screenWidth} = Dimensions.get("window");
export default function CertificationScreen({navigation}) {
  // global state
  const certifications = useStore((state) => state.certifications);
  const {addCertification, removeCertification} = useStore((state) => state);
  // local state
  const [type, setType] = useState("Company");
  const [number, setNumber] = useState("");

  const handleAdd = () => {
    // if (!type || !number) return;
    const certificationId = uuid();
    const certificationObj = {
      certificationId: certificationId,
      certificationType: type,
      certificationNumber: number,
    };
    addCertification(certificationObj)
  };
  const handleRemove = (certificationId) => {
    removeCertification(certificationId);
  };
  const handleNext = () => {
    console.log("goto Capacity");
    navigation.navigate("CapacityScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Upload your certifications</Text>
        <View style={styles.panelWrapper}>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={{
              fontSize: 17,
              textAlign: "center",
              marginLeft: 12,
            }}
            iconStyle={styles.iconStyle}
            data={typeOptions}
            labelField="label"
            valueField="value"
            value={type}
            onChange={(item) => {
              console.log(item);
              setType(item.type);
            }}
          />
          <TextInput
            value={number}
            placeholder={"Certification Number"}
            style={[styles.textInput, {marginBottom: 10}]}
            onChangeText={(text) => {
              setNumber(text);
            }}
          />
          <TouchableOpacity style={{marginTop: 8}} onPress={handleAdd}>
            <Text style={{fontSize: 18, fontWeight: "600"}}>
              Add a certification +
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            height: 230,
            marginBottom: 20,
            marginTop: 10,
            width: screenWidth,
          }}
          contentContainerStyle={{alignItems: "center"}}
        >
          {certifications.map((certificationObj) => (
            <CertificationCard
              key={certificationObj.certificationId}
              CertificationId={certificationObj.certificationId}
              type={certificationObj.certificationType}
              number={certificationObj.certificationNumber}
              handleRemove={handleRemove}
            />
          ))}
        </ScrollView>
        <PrimaryButton title="Next" onPress={handleNext}/>
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
    fontWeight: "500",
    marginBottom: 34,
  },
  panelWrapper: {
    alignItems: "center",
    backgroundColor: "#fcfcfc",
    borderRadius: 6,
    paddingVertical: 35,
    paddingHorizontal: 50,
    paddingBottom: 20,
    marginBottom: 16,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
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
