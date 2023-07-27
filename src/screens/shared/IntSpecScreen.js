import {CheckBox} from "@rneui/themed";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import axios from "axios";
import IntSpecItem from "../../components/IntSpecItem";
import PrimaryButton from "../../components/PrimaryButton";
import {useStore} from "../../store";
import INT_SPEC_LIST from "../../constant/INT_SPEC_LIST";
import URL from "../../config/url";

const {width: screenWidth} = Dimensions.get("window");

export default function IntSpecScreen({navigation}) {
  const {role, isLogged} = useStore((state) => state);
  const {userId, intSpecs, zoom, home} = useStore((state) => state);
  const {addOrRemoveIntSpec, updateHome, updateZoom} = useStore((state) => state);
  const handleSave = async () => {
    // less than 3
    if (intSpecs.length < 3) {
      console.log("please select at least 3 options");
      return;
    }
    // save by role
    if (role === "client") {
      // save to client interests
      try {
        await axios.put(
          `${URL}/client/categories`,
          {
            clientCategories: {
              clientId: userId,
              categories: intSpecs,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(res => console.log(res.status)).catch(err => console.log(err.message));
      } catch (err) {
        console.log(err);
      }
    } else if (role === "trainer") {
      // save to trainer specialities
      try {
        await axios.put(
          `${URL}/trainer/categories`,
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
    if (intSpecs.length < 3) {
      console.log("please select at least 3 options");
      return;
    }
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
          {INT_SPEC_LIST?.map((intSpecObj) => (
            <IntSpecItem
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
                updateZoom(!zoom);
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
                updateHome(!home);
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
    paddingTop: 60,
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
