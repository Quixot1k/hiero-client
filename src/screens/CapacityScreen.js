import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import PrimarySlider from "../components/PrimarySlider";
import { capacityChanged } from "../features/userSlice";

export default function CapacityScreen({ navigation }) {
  const dispatch = useDispatch();
  const { capacity } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.general);
  const handleNext = () => {
    if (role == "client") {
      console.log("goto LocationScreen");
      navigation.navigate("LocationScreen");
    } else {
      console.log("goto TrainerLocationScreen");
      navigation.navigate("TrainerLocationScreen");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={
          role == "client"
            ? styles.scrollView
            : [styles.scrollView, { marginTop: 200 }]
        }
      >
        <Text style={styles.text}>
          {role == "client"
            ? "Sharing a session with other people allows you to split the cost. How many people would you be willing to capacity with?"
            : "Doing sessions with multiple clients creates more opportunity for growth."}
        </Text>
        <PrimarySlider
          value={capacity}
          minimumValue={0}
          maximumValue={role == "client" ? 4 : 5}
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
    fontWeight: 400,
    textAlign: "center",
    lineHeight: 30,
  },
  slider: {
    flexDirection: "row",
    alignItems: "center",
  },
});
