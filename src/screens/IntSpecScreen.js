import {CheckBox} from "@rneui/themed";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import axios from "axios";
import IntSpecGrid from "../components/IntSpecGrid";
import PrimaryButton from "../components/PrimaryButton";
import {useStore} from "../store";

const {width: screenWidth} = Dimensions.get("window");

const intSpecList = [
  {
    categoryId: 1,
    providerType: "Gym",
    categoryName: "Nutrition",
  },
  {
    categoryId: 2,
    providerType: "Gym",
    categoryName: "Health Coach",
  },
  {
    categoryId: 3,
    providerType: "Gym",
    categoryName: "Medical Fitness",
  },
  {
    categoryId: 4,
    providerType: "Gym",
    categoryName: "Yoga",
  },
  {
    categoryId: 5,
    providerType: "Gym",
    categoryName: "Corrective Exercise",
  },
  {
    categoryId: 6,
    providerType: "Gym",
    categoryName: "Youth Fitness",
  },
  {
    categoryId: 7,
    providerType: "Gym",
    categoryName: "Group Fitness",
  },
  {
    categoryId: 8,
    providerType: "Gym",
    categoryName: "Weight Loss Transformation",
  },
  {
    categoryId: 9,
    providerType: "Gym",
    categoryName: "Strength and Conditioning",
  },
  {
    categoryId: 10,
    providerType: "Gym",
    categoryName: "Senior Fitness",
  },
  {
    categoryId: 11,
    providerType: "Gym",
    categoryName: "Biomechanics",
  },
  {
    categoryId: 12,
    providerType: "Gym",
    categoryName: "Calisthenics",
  },
  {
    categoryId: 13,
    providerType: "Gym",
    categoryName: "Bodybuilding and Physique",
  },
  {
    categoryId: 14,
    providerType: "Gym",
    categoryName: "Stretching and Flexibility",
  },
  {
    categoryId: 15,
    providerType: "Gym",
    categoryName: "Women's Fitness",
  },
  {
    categoryId: 16,
    providerType: "Gym",
    categoryName: "Sports",
  },
  {
    categoryId: 17,
    providerType: "Gym",
    categoryName: "Online",
  },
  {
    categoryId: 18,
    providerType: "Gym",
    categoryName: "Other",
  },
];

export default function IntSpecScreen({navigation}) {
  const {role, isLogged} = useStore((state) => state);
  const {userId, intSpecs, zoom, home} = useStore((state) => state);
  const {addOrRemoveIntSpec, updateHome, updateZoom} = useStore((state) => state);
  const handleSave = async () => {
    if (role === "client") {
      // save to client interests
    } else {
      // save to trainer specialities
      try {
        await axios.put(
          "http://127.0.0.1:10001/trainer/categories",
          {
            providerCategories: {
              providerId: userId,
              categories: intSpecs,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleNext = () => {
    if (role === "client") {
      console.log("goto CapacityScreen");
      navigation.navigate("CapacityScreen");
    } else {
      console.log("goto CertificationScreen");
      navigation.navigate("CertificationScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>
          {role === "client"
            ? "What are your interests"
            : "What are your specialities"}
        </Text>
        <View style={styles.grids}>
          {intSpecList.map((intSpecObj) => (
            <IntSpecGrid
              key={intSpecObj.categoryId}
              name={intSpecObj.categoryName}
              toggle={() => {
                addOrRemoveIntSpec(intSpecObj);
              }}
            />
          ))}
        </View>
        {!isLogged && (
          <View style={{marginTop: -10}}>
            <CheckBox
              size={22}
              checked={zoom === true}
              checkedColor="#000"
              title={"Online session possible?"}
              textStyle={{fontSize: 16, fontWeight: 500, color: "#000"}}
              wrapperStyle={{marginBottom: -20}}
              onPress={() => {
                updateZoom();
              }}
            />
            <CheckBox
              size={22}
              checked={home === true}
              checkedColor="#000"
              title={"Home session possible?"}
              textStyle={{fontSize: 16, fontWeight: 500, color: "#000"}}
              // wrapperStyle={{ marginBottom: -20 }}
              onPress={() => {
                updateHome();
              }}
            />
          </View>
        )}
        {isLogged ? (
          <PrimaryButton title="Save" marginTop={30} onPress={handleSave}/>
        ) : (
          <PrimaryButton title="Next" marginTop={30} onPress={handleNext}/>
        )}
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
    width: screenWidth,
  },
  header: {
    fontSize: 26,
    fontWeight: "500",
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
