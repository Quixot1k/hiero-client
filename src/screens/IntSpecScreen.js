import { View, SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import Grid from "../components/Grid";
import { CheckBox } from "@rneui/themed";
import {
  intSpecChanged,
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
  const { online, home, gym } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.general);

  const handleNext = () => {
    if (role == "customer") {
      console.log("goto CapacityScreen");
      navigation.navigate("CapacityScreen");
    } else {
      console.log("goto CertificationScreen");
      navigation.navigate("CertificationScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={
          role == "customer"
            ? styles.scrollView
            : [styles.scrollView, { marginTop: 102 }]
        }
      >
        <Text style={styles.header}>
          {role == "customer"
            ? "What are your interests"
            : "What are your specialities"}
        </Text>
        <View style={styles.grids}>
          {typeList.map((type) => (
            <Grid
              key={type}
              type={type}
              add={() => {
                dispatch(intSpecChanged(type));
              }}
            />
          ))}
        </View>
        {role == "customer" && (
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
        )}
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
  grids: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
