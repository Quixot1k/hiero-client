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
import { priceChanged } from "../features/userSlice";

export default function PriceScreen({ navigation }) {
  const { price } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleNext = () => {
    console.log("goto AvatarScreen");
    navigation.navigate("AvatarScreen");
  };
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Starting price per hour</Text>
        <Text style={styles.subHeader}>
          The minimum price you're willing to work for
        </Text>
        <TextInput
          placeholder={"$0.00"}
          value={String(price)}
          style={styles.textInput}
          multiline={true}
          onChangeText={(text) => {
            dispatch(priceChanged(parseInt(text)));
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
    borderWidth: 1.2,
    borderRadius: 30,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 60,
    textAlign: "center",
    paddingTop: 35,
  },
});
