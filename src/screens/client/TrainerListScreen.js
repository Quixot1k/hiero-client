import React, {useEffect, useMemo, useState} from "react";
import {ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View,} from "react-native";
import BottomSheet, {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import PrimaryButton from "../../components/PrimaryButton";
import useTrainerFromGym from "../../hooks/useTrainerFromGym";
import TrainerItem from "../../components/TrainerItem";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");
export default function TrainerListScreen({navigation, route}) {
  const {gymObj} = route.params;
  const [filter, setFilter] = useState({
    name: "",
    price: Infinity,
  });
  const [trainerList, setTrainerList] = useState([]);
  const [filterTrainerList, setFilterTrainerList] = useState([]);
  const snapPoints = useMemo(() => ["10%", "40%"], []);

  const handleSearch = () => {
    let tmpTrainerList = [];
    // if name is empty
    if (filter.name * 1 === 0) {
      for (const trainer of trainerList) {
        if (trainer.trainerProfile.minimumBid <= filter.price) {
          tmpTrainerList.push(trainer);
        }
      }
      setFilterTrainerList(tmpTrainerList);
    } else {
      for (const trainer of trainerList) {
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

  const {data: trainersFromGym, isLoading, error} = useTrainerFromGym(gymObj);

  useEffect(() => {
    setTrainerList(trainersFromGym);
    setFilterTrainerList(trainersFromGym);
  }, [trainersFromGym]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.listWrapper}>
          <ScrollView contentContainerStyle={{alignItems: "center"}}>
            {isLoading && <ActivityIndicator style={{marginTop: 30}}/>}
            {error && <Text style={{marginTop: 100}}>{error.message}</Text>}
            {filterTrainerList?.map((trainerObj, index) => (
              <View key={trainerObj.trainerProfile.trainerId}>
                <TrainerItem
                  trainerObj={trainerObj}
                  onPress={() => {
                    navigation.navigate("TrainerDetailScreen", {trainerObj});
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <BottomSheet
        style={{paddingHorizontal: 30}}
        backgroundStyle={styles.bottomSheet}
        index={0}
        snapPoints={snapPoints}
      >
        <View>
          <Text style={{fontWeight: "700", fontSize: 24, marginBottom: 6}}>
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
              <Text style={{fontWeight: "500", fontSize: 18}}>Name: </Text>
              <BottomSheetTextInput
                value={filter.name}
                style={styles.textInput}
                placeholder="Name"
                onChangeText={(text) => setFilter({...filter, name: text})}
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
              <Text style={{fontWeight: "500", fontSize: 18}}>Price: </Text>
              <BottomSheetTextInput
                value={filter.price === Infinity ? "" : String(filter.price)}
                style={styles.textInput}
                placeholder="Price"
                onChangeText={(text) => {
                  if (text === "") {
                    setFilter({...filter, price: Infinity});
                  } else {
                    setFilter({...filter, price: parseInt(text)});
                  }
                }}
              />
            </View>
            <View
              style={{flexDirection: "row", justifyContent: "space-evenly"}}
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
  listWrapper: {
    height: 0.65 * screenHeight,
    width: 0.9 * screenWidth,
    borderRadius: 16,
    paddingVertical: 10,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
  },
  bottomSheet: {
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
});
