import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bioChanged } from "../features/userSlice";
import PrimaryButton from "../components/PrimaryButton";

export default function BioScreen({ navigation }) {
  const { bio } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleNext = () => {
    console.log("goto PriceScreen");
    navigation.navigate("PriceScreen");
  };
  return (
    <SafeAreaView>
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
  },
  header: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 30,
  },
  textInput: {
    width: 260,
    height: 300,
    borderWidth: 1.2,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 17,
  },
});
