import React from "react";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {useStore} from "../../store";
import {CommonActions} from "@react-navigation/native";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

export default function Settings({navigation}) {
  const role = useStore((state) => state.role);
  const updateIsLogged = useStore((state) => state.updateIsLogged);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Edit Account */}
        <View style={[styles.section, {marginBottom: 16}]}>
          <TouchableOpacity
            style={styles.btnWrapper}
            onPress={() => navigation.navigate("ProfileUpdateScreen")}
          >
            <MaterialIcons name="person" size={24} color="black"/>
            <Text style={styles.btnTitle}>Profile</Text>
          </TouchableOpacity>
          {
            role === "trainer" && (
              <TouchableOpacity
                style={styles.btnWrapper}
                onPress={() => navigation.navigate("TrainerLocationUpdateScreen")}
              >
                <MaterialIcons name="location-pin" size={24} color="black"/>
                <Text style={styles.btnTitle}>Location</Text>
              </TouchableOpacity>
            )}
          <TouchableOpacity
            style={[styles.btnWrapper, {borderBottomWidth: 0}]}
            onPress={() => navigation.navigate("IntSpecUpdateScreen")}
          >
            <MaterialIcons name="dns" size={24} color="black"/>
            <Text style={styles.btnTitle}>{role === "client" ? "Interests" : "Specialities"}</Text>
          </TouchableOpacity>
          {
            role === "client" && (
              <TouchableOpacity
                style={[styles.btnWrapper, {borderBottomWidth: 0}]}
                onPress={() => navigation.navigate("AvailabilityScreen")}
              >
                <MaterialCommunityIcons name="clock-edit" size={24} color="black"/>
                <Text style={styles.btnTitle}>Availability</Text>
              </TouchableOpacity>
            )
          }
        </View>
        {/* Others */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.btnWrapper}
            onPress={() => navigation.navigate("Feedback")}
          >
            <MaterialIcons name="help" size={24} color="black"/>
            <Text style={styles.btnTitle}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnWrapper, {borderBottomWidth: 0}]}
            onPress={() => {
              updateIsLogged(false);
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: "LoginScreen"}],
                })
              );
            }}
          >
            <MaterialIcons name="outbond" size={24} color="black"/>
            <Text style={styles.btnTitle}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 20,
    width: screenWidth,
    height: 0.55 * screenHeight,
  },
  section: {
    alignItems: "center",
    backgroundColor: "#fcfcfc",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.75)",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
    elevation: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 0.9375 * screenWidth,
  },
  btnWrapper: {
    width: 0.875 * screenWidth,
    height: 50,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 3,
    elevation: 5,
  },
  btnTitle: {
    fontSize: 17.5,
    fontWeight: "500",
    paddingLeft: 10,
  },
});
