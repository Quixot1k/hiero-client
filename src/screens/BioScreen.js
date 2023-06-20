import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import { bioChanged } from "../features/userSlice";

const { width: screenWidth } = Dimensions.get("window");
export default function BioScreen({ navigation }) {
  const { bio } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleNext = () => {
    console.log("goto BidScreen");
    navigation.navigate("BidScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Build your brand</Text>
        <TextInput
          placeholder={
            "Personal bio:" + "Tell clients about yourself and " + "what you do"
          }
          value={bio}
          style={styles.textInput}
          multiline={true}
          onChangeText={(text) => {
            dispatch(bioChanged(text));
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
    marginTop: 100,
    width: screenWidth,
  },
  header: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 30,
  },
  textInput: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
    fontSize: 17,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
  },
});
