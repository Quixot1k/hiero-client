import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
export default function TrainerItem({trainerObj, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {/* avatar */}
        <View style={styles.avatar}>
          <Image source={{uri: trainerObj.trainerProfile.imageName}} style={{
            borderRadius: 30,
            height: 60,
            width: 60,
          }}/>
        </View>
        {/* name + specs */}
        <View>
          <View style={{marginBottom: 2}}>
            <Text style={styles.name}>{trainerObj.trainerProfile.name}</Text>
          </View>
          <View style={{flexDirection: "row", flexWrap: "wrap", width: 150}}>
            {trainerObj.providerCategories.categories
              .slice(0, 2)
              .map((category, index) => (
                <View style={styles.specWrapper} key={index}>
                  <Text style={styles.specialtyItem}>
                    {category.categoryName.length < 20 ? category.categoryName : category.categoryName.substring(0, 20) + "..."}
                  </Text>
                </View>))}
          </View>
        </View>
        {/* bid */}
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={styles.bid}>${trainerObj.trainerProfile.minimumBid}</Text>
          <AntDesign name="caretright" size={12} color="black"/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 0.825 * screenWidth,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 3,
    elevation: 5,
  },
  avatar: {
    backgroundColor: "#ccc",
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    shadowOpacity: 0,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1.5,
  },
  specWrapper: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 2,
    marginVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: "center",
  },
  specialtyItem: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
  },
  bid: {
    fontSize: 24,
    fontWeight: "500",
    marginRight: 2,
    shadowOpacity: 0,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1.5,
  },
});
