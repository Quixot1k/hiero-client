import { View, SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import { useReducer } from "react";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import { CheckBox } from "@rneui/themed";

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

const reducer = (state, action) => {
  switch (action.type) {
    case "addInterest": {
      if (state.interest.includes(action.payload)) {
        newState = { ...state };
        newInterest = newState.interest.filter(function (value) {
          return value != action.payload;
        });
        newState.interest = newInterest;
        return newState;
      } else {
        newState = { ...state };
        newState.interest.push(action.payload);
        return newState;
      }
    }
    case "changeOnline": {
      return {
        ...state,
        online: !state.online,
      };
    }
    case "changeHome": {
      return {
        ...state,
        home: !state.home,
      };
    }
    case "changeGym": {
      return {
        ...state,
        gym: !state.gym,
      };
    }
  }
};

const initialState = {
  interest: [],
  online: false,
  home: false,
  gym: false,
};

export default function IntSpecScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

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
                dispatch({ type: "addInterest", payload: type });
              }}
            />
          ))}
        </View>
        <View style={{ marginTop: -10 }}>
          <CheckBox
            size={22}
            checked={state.online == true ? true : false}
            checkedColor="#000"
            title={"Online session possible?"}
            textStyle={{ fontSize: 16, fontWeight: 500, color: "#000" }}
            wrapperStyle={{ marginBottom: -20 }}
            onPress={() => {
              dispatch({ type: "changeOnline" });
            }}
          />
          <CheckBox
            size={22}
            checked={state.home == true ? true : false}
            checkedColor="#000"
            title={"Home session possible?"}
            textStyle={{ fontSize: 16, fontWeight: 500, color: "#000" }}
            wrapperStyle={{ marginBottom: -20 }}
            onPress={() => {
              dispatch({ type: "changeHome" });
            }}
          />
          <CheckBox
            size={22}
            checked={state.gym == true ? true : false}
            checkedColor="#000"
            title={"Gym session possible?"}
            textStyle={{ fontSize: 16, fontWeight: 500, color: "#000" }}
            onPress={() => {
              dispatch({ type: "changeGym" });
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
