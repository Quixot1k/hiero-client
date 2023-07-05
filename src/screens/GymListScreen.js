import React, {useEffect, useMemo, useState} from "react";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Slider} from "@rneui/themed";
import BottomSheet, {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import GymItem from "../components/GymItem";
import useGym from "../hooks/useGym";

const {width: screenWidth} = Dimensions.get("window");
export default function GymListScreen({navigation}) {

  const [radius, setRadius] = useState(50);
  const [filteredGyms, setFilteredGyms] = useState([]);
  const [addressFilter, setAddressFilter] = useState("");
  const snapPoints = useMemo(() => ["15%", "30%"], []);

  const {data: gyms, isLoading, error} = useGym(radius);

  const handleAddressFilter = (text) => {
    if (addressFilter * 1 === 0) {
      setFilteredGyms(gyms);
    }
    setFilteredGyms(
      gyms.filter((gym) =>
        gym.address.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredGyms(gyms);
  }, [gyms]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* List */}
        <View style={styles.listWrapper}>
          <ScrollView contentContainerStyle={{alignItems: "center"}}>
            {isLoading && <Text style={styles.listText}>Loading...</Text>}
            {error && <Text style={styles.listText}>{error.message}</Text>}
            {filteredGyms?.map((gymObj, index) => {
              return (
                <GymItem
                  key={index}
                  gym={gymObj}
                  onPress={() =>
                    navigation.navigate("TrainerListScreen", {gymObj})
                  }
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        style={{paddingHorizontal: 30}}
        backgroundStyle={styles.bottomSheet}
      >
        <View style={{paddingHorizontal: 5}}>
          {/* Slider */}
          <View style={styles.sliderWrapper}>
            <Slider
              minimumValue={1}
              maximumValue={90}
              value={radius}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#ccc"
              allowTouchTrack={true}
              thumbStyle={{height: 20, width: 20, backgroundColor: "#000"}}
              trackStyle={{height: 6, width: 175, borderRadius: 10}}
              step={1}
              onValueChange={(value) => {
                setRadius(value);
              }}
            />
            <Text style={styles.sliderText}>Radius:{radius}</Text>
          </View>
          {/* TextInput */}
          <View>
            <BottomSheetTextInput
              value={addressFilter}
              onChangeText={(text) => {
                setAddressFilter(text);
                handleAddressFilter(text);
              }}
              placeholder="Address key words"
              style={styles.textInput}
            />
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
  },
  scrollView: {
    alignItems: "center",
    marginTop: 30,
    width: screenWidth,
  },
  listWrapper: {
    height: 588,
    width: 360,
    backgroundColor: "#fcfcfc",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
    paddingVertical: 10,
  },
  listText: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 120,
  },
  bottomSheet: {
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
  },
  sliderWrapper: {
    marginTop: 10,
    marginBottom: 35,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
  sliderText: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: 700,
    fontStyle: "italic",
  },
  textInput: {
    height: 43,
    borderRadius: 20,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    paddingHorizontal: 18,
    fontSize: 17,
  },
});
