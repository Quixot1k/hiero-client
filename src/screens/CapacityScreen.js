import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import PrimarySlider from "../components/PrimarySlider";
import { capacityChanged } from "../features/userSlice";

export default function CapacityScreen({ navigation }) {
  const dispatch = useDispatch();
  const { capacity } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.general);
  const handleNext = () => {
    console.log("goto LocationScreen");
    navigation.navigate("LocationScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>
          {role == "customer"
            ? "Sharing a session with other people allows you to split the cost. How many people would you be willing to capacity with?"
            : "Doing sessions with multiple clients creates more opportunity for growth."}
        </Text>
        <PrimarySlider
          value={capacity}
          minimumValue={0}
          maximumValue={4}
          onValueChange={(value) => dispatch(capacityChanged(value))}
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
    marginTop: 190,
    alignItems: "center",
  },
  text: {
    width: 300,
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: "center",
    lineHeight: 30,
  },
  slider: {
    flexDirection: "row",
    alignItems: "center",
  },
});
