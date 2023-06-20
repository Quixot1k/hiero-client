import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import SessionItem from "../components/SessionItem";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SessionScreen({ navigation }) {
  const isFocused = useIsFocused();
  const { role } = useSelector((state) => state.general);
  const { userId } = useSelector((state) => state.user);
  const [sessionList, setSessionList] = useState([]);

  const handleSearch = () => {
    navigation.navigate("GymListScreen");
  };
  const handleMyClients = () => {
    navigation.navigate("ClientListScreen");
  };

  const handleMySchedule = () => {
    navigation.navigate("ScheduleScreen");
  };

  const getTodaySessionsByRole = async () => {
    if (role == "client") {
      console.log("clientGetSessions");
      await axios
        .get(`http://localhost:10001/schedule/client/today/${userId}`)
        .then((res) => {
          setSessionList(res.data);
        });
    } else if (role == "trainer") {
      console.log("trainerGetSessions");
      await axios
        .get(`http://localhost:10001/schedule/trainer/today/${userId}`)
        .then((res) => {
          setSessionList(res.data);
        });
    }
  };

  useEffect(() => {
    getTodaySessionsByRole();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.listWrapper}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Upcoming Sessions</Text>
          </View>
          <ScrollView
            style={styles.sessionList}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {role == "trainer" && sessionList.length ? (
              sessionList.map((item, key) => (
                <SessionItem
                  key={key}
                  name={item.clientProfileList[0].name}
                  startTime={item.session.startTime}
                  endTime={
                    parseInt(item.session.startTime) +
                    parseInt(item.session.sessionTimeLength)
                  }
                  location={
                    item.location.address +
                    ", " +
                    item.location.city +
                    ", " +
                    item.location.state
                  }
                />
              ))
            ) : (
              <Text style={{ marginTop: 120, fontSize: 20 }}>
                No upcoming sessions
              </Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.buttonGroup}>
          {role == "client" && (
            <PrimaryButton
              title="Search"
              marginBottom={14}
              onPress={handleSearch}
            />
          )}
          {role == "trainer" && (
            <PrimaryButton
              title="My Clients"
              marginBottom={14}
              onPress={handleMyClients}
            />
          )}
          <PrimaryButton
            title={"My Schedule"}
            paddingHorizontal={0}
            onPress={handleMySchedule}
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
    width: 340,
    height: 350,
    backgroundColor: "#fcfcfc",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
    marginHorizontal: 10,
  },
  listHeader: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#000",
    paddingLeft: 16,
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: 600,
    color: "#fcfcfc",
    textShadowColor: "#fcfcfc",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  },
  buttonGroup: {
    marginVertical: 20,
    width: 168,
  },
});
