import {ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import SessionItem from "../../components/SessionItem";
import {useStore} from "../../store";
import useTodaySession from "../../hooks/useTodaySession";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

export default function SessionScreen({navigation}) {
  const role = useStore((state) => state.role);
  const {data: sessions, error, isLoading} = useTodaySession()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.listWrapper}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Upcoming Sessions</Text>
          </View>
          <ScrollView
            contentContainerStyle={{alignItems: "center", marginTop: 3}}
          >
            {isLoading && <ActivityIndicator style={{marginTop: 30}}/>}
            {error && <Text style={styles.listContentText}>{error.message}</Text>}
            {sessions && !sessions.length && <Text style={styles.listContentText}>No Sessions</Text>}
            {
              sessions?.map((sessionObj, index) => (
                <SessionItem
                  key={index}
                  sessionObj={sessionObj}
                  onPress={() => {
                    navigation.navigate("SessionDetailScreen", sessionObj);
                  }}
                />
              ))
            }
          </ScrollView>
        </View>
        <View style={styles.buttonGroup}>
          {role === "client" && (
            <PrimaryButton
              title="Search"
              icon={<MaterialIcons name="search" size={26} color="#ffffff" style={{marginLeft: -10, marginRight: 3}}/>}
              marginBottom={14}
              width={150}
              onPress={() => {
                navigation.navigate("GymListScreen");
              }}
            />
          )}
          {role === "trainer" && (
            <PrimaryButton
              title="Clients"
              icon={<MaterialIcons name="people-alt" size={24} color="#ffffff" style={{marginRight: 5}}/>}
              marginBottom={14}
              width={150}
              onPress={() => {
                navigation.navigate("ClientListScreen");
              }}
            />
          )}
          <PrimaryButton
            title={"Schedule"}
            icon={<MaterialCommunityIcons name="calendar-multiselect" size={24} color="#ffffff"
                                          style={{marginRight: 5}}/>}
            width={150}
            onPress={() => {
              navigation.navigate("ScheduleScreen");
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
          marginRight: 296,
        }}
      ></View>
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
  listWrapper: {
    width: 0.875 * screenWidth,
    height: 0.45 * screenHeight,
    backgroundColor: "#fcfcfc",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
    elevation: 6,
  },
  listHeader: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#000",
    paddingLeft: 16,
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fcfcfc",
    textShadowColor: "#fcfcfc",
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
    elevation: 2,
  },
  listContentText: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 120,
  },
  buttonGroup: {
    marginVertical: 20,
    width: 168,
  },
});
