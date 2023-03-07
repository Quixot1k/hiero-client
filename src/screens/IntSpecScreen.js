import { View, SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import { CheckBox } from "@rneui/themed";
import {
  interestChanged,
  onlineChanged,
  homeChanged,
  gymChanged,
} from "../features/userSlice";

const typeList = [
  "Nutrition",
  "Health Coach",
  "Corrective Exercise",
  "Medical Fitness",
  "Youth Fitness ",
  "Group Fitness",
  "Weight Loss Transformation",
  "Strength and Conditioning",
  "Yoga",
  "Senior Fitness",
  "Biomechanics",
  "Calisthenics",
  "Bodybuilding and Physique",
  "Stretching and Flexibility",
  "Women's Fitness",
  "Sports",
  "Online",
  "Other",
];

export default function IntSpecScreen({ navigation }) {
  const dispatch = useDispatch();
  const { interest, online, home, gym } = useSelector((state) => state.user);

  const handleNext = () => {
    console.log("goto CapacityScreen");
    navigation.navigate("CapacityScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>What are your interests</Text>
        <View style={styles.cardGroup}>
          {typeList.map((type) => (
            <Card
              key={type}
              type={type}
              add={() => {
                dispatch(interestChanged(type));
              }}
            />
          ))}
        </View>
        <View style={{ marginTop: -10 }}>
          <CheckBox
            size={22}
            checked={online == true ? true : false}
            checkedColor="#000"
            title={"Online session possible?"}
            textStyle={{ fontSize: 16, fontWeight: 500, color: "#000" }}
            wrapperStyle={{ marginBottom: -20 }}
            onPress={() => {
              dispatch(onlineChanged());
            }}
          />
          <CheckBox
            size={22}
            checked={home == true ? true : false}
            checkedColor="#000"
            title={"Home session possible?"}
            textStyle={{ fontSize: 16, fontWeight: 500, color: "#000" }}
            wrapperStyle={{ marginBottom: -20 }}
            onPress={() => {
              dispatch(homeChanged());
            }}
          />
          <CheckBox
            size={22}
            checked={gym == true ? true : false}
            checkedColor="#000"
            title={"Gym session possible?"}
            textStyle={{ fontSize: 16, fontWeight: 500, color: "#000" }}
            onPress={() => {
              dispatch(gymChanged());
            }}
          />
        </View>
        <PrimaryButton title="Next" marginTop={12} onPress={handleNext} />
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
    marginTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: 500,
    marginBottom: 30,
  },
  cardGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
