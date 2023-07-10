import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import {useStore} from "../../store";
import validator from "validator/es";
import {useState} from "react";

const {width: screenWidth} = Dimensions.get("window");
export default function BidScreen({navigation}) {
  const bid = useStore((state) => state.bid);
  const updateBid = useStore((state) => state.updateBid);
  const [warning, setWarning] = useState({
    bid: false,
  })
  const handleNext = () => {
    if (bid === 0 || !validator.isNumeric(String(bid))) {
      console.log("invalid bid", bid);
      setWarning({...warning, bid: true});
    } else {
      console.log("goto AvatarScreen");
      navigation.navigate("AvatarScreen");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Starting bid per hour</Text>
        <Text style={styles.subHeader}>
          The minimum bid you're willing to work for
        </Text>
        <TextInput
          placeholder={"$50"}
          maxLength={5}
          keyboardType={"number-pad"}
          value={bid ? String(bid) : ""}
          style={[styles.textInput, {shadowColor: warning.bid ? "#ff0000" : "#000000"}]}
          onChangeText={(text) => {
            if (text === "") {
              updateBid(0);
            } else if (validator.isNumeric(text)) {
              updateBid(parseInt(text));
              setWarning({...warning, bid: false});
            } else {
              console.log("invalid bid");
            }
          }}
        />
        <PrimaryButton title="Next" onPress={handleNext}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
    marginTop: 150,
    width: screenWidth,
  },
  header: {
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 30,
  },
  textInput: {
    width: 260,
    height: 140,
    borderRadius: 30,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 70,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
  },
});
