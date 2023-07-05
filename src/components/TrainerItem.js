import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

export default function TrainerItem({trainer, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {/* avatar */}
        <View style={styles.avatar}>
          <Text>{trainer.trainerProfile.imageName}</Text>
        </View>
        {/* name + specs */}
        <View>
          <View style={{marginBottom: 2}}>
            <Text style={styles.name}>{trainer.trainerProfile.name}</Text>
          </View>
          <View style={{flexDirection: "row", flexWrap: "wrap", width: 150}}>
            {trainer.providerCategories.categories
              .slice(0, 2)
              .map((category) => {
                return (
                  <View style={styles.specWrapper}>
                    <Text style={styles.specialtyItem}>
                      {category.categoryName}
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>
        {/* bid */}
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={styles.bid}>${trainer.trainerProfile.minimumBid}</Text>
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
    width: 330,
    height: 90,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 3,
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#000",
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
