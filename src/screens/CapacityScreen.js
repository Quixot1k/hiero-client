import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import PrimarySlider from "../components/PrimarySlider";

export default function CapacityScreen({ navigation }) {
  const [capacity, setCapacity] = useState(1);
  console.log(capacity);

  const onSlidingComplete = (value) => {
    setCapacity(value);
  };
  const handleNext = () => {
    console.log("goto LocationScreen");
    navigation.navigate("LocationScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>
          Sharing a session with other people allows you to split the cost. How
          many people would you be willing to share with?
        </Text>
        <PrimarySlider
          value={capacity}
          minimumValue={0}
          maximumValue={4}
          onSlidingComplete={onSlidingComplete}
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
