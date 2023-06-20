import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import { bidChanged } from "../features/userSlice";

export default function BidScreen({ navigation }) {
  const { bid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleNext = () => {
    console.log("goto AvatarScreen");
    navigation.navigate("AvatarScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Starting bid per hour</Text>
        <Text style={styles.subHeader}>
          The minimum bid you're willing to work for
        </Text>
        <TextInput
          placeholder={"$0.00"}
          value={bid ? String(bid) : ""}
          style={styles.textInput}
          multiline={true}
          onChangeText={(text) => {
            dispatch(bidChanged(parseInt(text)));
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
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
    marginTop: 150,
  },
  header: {
    fontSize: 32,
    fontWeight: 500,
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 30,
  },
  textInput: {
    width: 260,
    height: 140,
    borderRadius: 30,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 60,
    textAlign: "center",
    paddingTop: 35,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
  },
});
