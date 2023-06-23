import React, {useEffect, useMemo, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Slider} from "@rneui/themed";
import axios from "axios";
import BottomSheet, {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import GymItem from "../components/GymItem";
import {useStore} from "../store";

export default function GymListScreen({navigation}) {
  const {latitude, longitude} = useStore((state) => state);
  const [radius, setRadius] = useState(50);
  const [gymList, setGymList] = useState([]);
  const [filterGymList, setFilterGymList] = useState([]);
  const [addressFilter, setAddressFilter] = useState("");
  const snapPoints = useMemo(() => ["15%", "30%"], []);
  const getGymsByRadius = async () => {
    setAddressFilter("");
    try {
      await axios
        .get(
          `http://127.0.0.1:10001/search/gym?lat=${0}&lng=${0}&radius=${radius}`
        )
        .then((res) => {
          if ((res.status = 200)) {
            setGymList(res.data);
            setFilterGymList(res.data);
          } else {
            console.log("error");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddressFilter = (text) => {
    // console.log(text);
    if (addressFilter * 1 === 0) {
      setFilterGymList(gymList);
    }
    setFilterGymList(
      gymList.filter((gym) =>
        gym.address.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  useEffect(() => {
    getGymsByRadius();
  }, [radius]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* List */}
        <View style={styles.listWrapper}>
          <ScrollView contentContainerStyle={{alignItems: "center"}}>
            {filterGymList.map((gymObj, key) => {
              // {{url}}/trainers/gym/3
              return (
                <GymItem
                  key={key}
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
        <View>
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
          <View style={{paddingHorizontal: 10}}>
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
    marginHorizontal: 10,
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
  bottomSheet: {
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
  },
  sliderWrapper: {
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 35,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  },
  sliderText: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: 700,
    fontStyle: "italic",
  },
  textInput: {
    height: 43,
    borderRadius: 8,
    backgroundColor: "#fefefe",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    paddingHorizontal: 10,
    fontSize: 17,
  },
});
