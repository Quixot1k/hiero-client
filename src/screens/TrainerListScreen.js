import React, { useState, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import TrainerItem from "../components/TrainerItem";
import PrimaryButton from "../components/PrimaryButton";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export default function TrainerListScreen({ navigation, route }) {
  const { gymObj } = route.params;
  const [filter, setFilter] = useState({
    name: "",
    price: Infinity,
  });
  const [trainerList, setTrainerList] = useState([]);
  const [filterTrainerList, setFilterTrainerList] = useState([]);
  const snapPoints = useMemo(() => ["10%", "40%"], []);

  const getTrainersFromGym = async () => {
    // 4 -> gymObj.locationId
    await axios.get("http://127.0.0.1:10001/trainers/gym/4").then((res) => {
      let tmpTrainerList = [];
      for (trainer of res.data) {
        tmpTrainerList.push({
          trainerProfile: trainer.trainerProfile,
          trainerLocations: trainer.trainerLocations,
          providerCategories: trainer.providerCategories,
        });
      }
      setTrainerList(tmpTrainerList);
      setFilterTrainerList(tmpTrainerList);
    });
  };

  const handleSearch = () => {
    let tmpTrainerList = [];
    // if name is empty
    if (filter.name * 1 == 0) {
      for (trainer of trainerList) {
        if (trainer.trainerProfile.minimumBid <= filter.price) {
          tmpTrainerList.push(trainer);
        }
      }
      setFilterTrainerList(tmpTrainerList);
    } else {
      for (trainer of trainerList) {
        if (
          trainer.trainerProfile.name
            .toLowerCase()
            .includes(filter.name.toLowerCase()) &&
          trainer.trainerProfile.minimumBid <= filter.price
        ) {
          tmpTrainerList.push(trainer);
        }
      }
      setFilterTrainerList(tmpTrainerList);
    }
  };

  useEffect(() => {
    getTrainersFromGym();
    return () => {
      setTrainerList([]);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.listWrapper}>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {filterTrainerList.map((trainerObj) => {
              return (
                <TrainerItem
                  key={trainerObj.trainerId}
                  trainer={trainerObj}
                  onPress={() => {
                    navigation.navigate("TrainerDetailScreen", { trainerObj });
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <BottomSheet
        style={{ paddingHorizontal: 30 }}
        backgroundStyle={styles.bottomSheet}
        index={0}
        snapPoints={snapPoints}
      >
        <View>
          <Text style={{ fontWeight: 700, fontSize: 24, marginBottom: 6 }}>
            Filter
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 6,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 18 }}>Name: </Text>
              <BottomSheetTextInput
                value={filter.name}
                style={styles.textInput}
                placeholder="Name"
                onChangeText={(text) => setFilter({ ...filter, name: text })}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 6,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 18 }}>Price: </Text>
              <BottomSheetTextInput
                value={filter.price == Infinity ? "" : String(filter.price)}
                style={styles.textInput}
                placeholder="Price"
                onChangeText={(text) => {
                  if (text == "") {
                    setFilter({ ...filter, price: Infinity });
                  } else {
                    setFilter({ ...filter, price: parseInt(text) });
                  }
                }}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <PrimaryButton
                title={"Search"}
                width={90}
                paddingVertical={10}
                paddingHorizontal={0}
                onPress={() => {
                  handleSearch();
                }}
              />
              <PrimaryButton
                title={"Reset"}
                width={90}
                paddingVertical={10}
                paddingHorizontal={0}
                onPress={() => {
                  setFilterTrainerList(trainerList);
                  setFilter({
                    name: "",
                    price: Infinity,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </BottomSheet>
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
    marginTop: 30,
    width: screenWidth,
  },
  textInput: {
    height: 38,
    fontSize: 18,
    borderRadius: 20,
    paddingHorizontal: 24,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    textAlign: "center",
  },
  listWrapper: {
    height: 625,
    width: 360,
    borderRadius: 16,
    paddingVertical: 10,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
  },
  bottomSheet: {
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  textInput: {
    borderRadius: 10,
    height: 35,
    width: 260,
    marginTop: 10,
    paddingLeft: 12,
    fontSize: 17,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    marginHorizontal: 10,
  },
});
