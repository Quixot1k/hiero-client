import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-native-date-picker";
import WeekView from "react-native-week-view";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { add, format } from "date-fns";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export default function ScheduleScreen() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const [weeklyEvent, setWeeklyEvent] = useState([
    // {
    //   id: 0,
    //   startDate: new Date(2023, 4, 30, 10, 0),
    //   endDate: new Date(2023, 4, 30, 12, 0),
    //   description: "With Client A",
    //   color: "#005A9C",
    //   resolveOverlap: "stack",
    // },
    // {
    //   id: 1,
    //   startDate: new Date(2023, 4, 31, 13, 0),
    //   endDate: new Date(2023, 4, 31, 15, 0),
    //   description: "With Client B",
    //   color: "#005A9C",
    //   resolveOverlap: "stack",
    // },
    // {
    //   id: 2,
    //   startDate: new Date(2023, 5, 3, 8, 0),
    //   endDate: new Date(2023, 5, 3, 11, 0),
    //   description: "With Client C",
    //   color: "#005A9C",
    //   resolveOverlap: "stack",
    // },
    // {
    //   id: 3,
    //   startDate: new Date(2023, 5, 8, 9, 0),
    //   endDate: new Date(2023, 5, 8, 11, 0),
    //   description: "With Client D",
    //   color: "#005A9C",
    //   resolveOverlap: "stack",
    // },
  ]);
  const [event, setEvent] = useState();
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(0);
  const snapPoints = useMemo(() => ["10%", "50%"], []);
  let eventId = 0;

  const TodayHeaderComponent = ({ formattedDate, textStyle }) => (
    <Text
      style={[textStyle, { fontWeight: "900", fontSize: 14, color: "darkred" }]}
    >
      {formattedDate}
    </Text>
  );

  const EventComponent = ({ event, position }) => {
    return (
      <>
        <Text
          style={{
            color: "#eee",
            fontWeight: 700,
            marginTop: position.height / 2.25,
            textAlign: "center",
          }}
        >
          {event.description}
        </Text>
      </>
    );
  };

  const getTrainerSessions = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:10001/schedule/trainer?id=${userId}&week=0`)
        .then((res) => {
          if (res.status == 200) {
            let eventList = [];
            // convert raw events to weekly events
            for (const item of res.data) {
              console.log(item);
              const year = parseInt(item.startDate.split("-")[0]);
              const month = parseInt(item.startDate.split("-")[1]);
              const day = parseInt(item.startDate.split("-")[2]);
              const hour = parseInt(item.startTime.substr(0, 2));
              const minute = parseInt(item.startTime.substr(2, 4));
              const duration = parseInt(item.sessionTimeLength);
              const startDate = new Date(year, month - 1, day, hour, minute);
              const endDate = add(
                new Date(year, month - 1, day, hour, minute),
                {
                  minutes: duration,
                }
              );
              eventList.push({
                id: eventId,
                startDate: startDate,
                endDate: endDate,
                clientId: item.clientId,
                description:
                  item.clientId == 0 ? "Block" : "client" + item.clientId,
                color: item.clientId == 0 ? "#000000" : "#005A9C",
                resolveOverlap: "stack",
              });
              eventId += 1;
            }
            setWeeklyEvent(eventList);
          } else {
            console.log("error");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlockSession = () => {
    const sessionObj = {
      trainerId: userId,
      date: format(startDatetime, "yyyy-MM-dd"),
      startTime: format(startDatetime, "HHmm"),
      endTime: format(endDatetime, "HHmm"),
    };
    console.log(sessionObj);
    try {
      axios
        .post("http://127.0.0.1:10001/schedule/trainer/block", sessionObj, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Has been blocked!");
            getTrainerSessions();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveSession = () => {
    const sessionObj = {
      id: userId,
      startDate: format(event.startDate, "yyyy-MM-dd"),
      startTime: format(event.startDate, "HHmm"),
    };
    console.log(sessionObj);
    try {
      axios
        .delete("http://localhost:10001/schedule/deleteByTrainer", {
          data: sessionObj,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Has been removed!");
            getTrainerSessions();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTrainerSessions();
    return () => {
      setWeeklyEvent([]);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* WeeklyView */}
      <View style={styles.weekview}>
        <WeekView
          events={weeklyEvent}
          selectedDate={new Date()}
          fixedHorizontally={false}
          allowScrollByDay={true}
          showTitle={true} // if true, shows this month and year
          numberOfDays={5}
          formatDateHeader="D ddd" // display short name days, e.g. Mon, Tue, etc
          pageStartAt={{ weekday: 1 }} // start week on mondays
          // head
          headerStyle={{
            justifyContent: "center",
            alignItems: "center",
            borderColor: "rgba(0,0,0,0)",
          }}
          headerTextStyle={{
            fontSize: 12,
            fontWeight: 500,
            color: "#000",
          }}
          // left hours
          hourTextStyle={{
            fontSize: 12,
            fontWeight: 500,
          }}
          // selected grid
          eventContainerStyle={{
            borderRadius: 6,
            shadowColor: "black",
            shadowOpacity: 0.5,
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 2,
          }}
          beginAgendaAt={8 * 60}
          endAgendaAt={24 * 60}
          timesColumnWidth={0.12}
          showNowLine={true}
          // customize
          TodayHeaderComponent={TodayHeaderComponent}
          EventComponent={EventComponent}
          onEventPress={(event) => {
            setEvent(event);
            setModalVisible(true);
          }}
          onGridClick={(pressEvent, startHour, date) => {
            setStartDatetime(date);
            setEndDatetime(date);
            setBottomSheetVisible(1);
          }}
        />
      </View>
      {/* Modal */}
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 600 }}>Detail</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="cancel" size={24} color="darkred" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>
              Start Time: {event && format(event.startDate, "yyyy-M-dd h:mm")}
            </Text>
            <Text style={styles.modalText}>
              End Time: {event && format(event.endDate, "yyyy-M-dd h:mm")}
            </Text>
            <Text style={styles.modalText}>Training Location: </Text>
            <Text style={styles.modalText}>Trainer: </Text>
            <Text style={styles.modalText}>Trainee: </Text>
            <View style={{ alignItems: "center" }}>
              <PrimaryButton
                fontSize={16}
                paddingHorizontal={14}
                paddingVertical={8}
                marginBottom={5}
                marginTop={15}
                title={"Remove"}
                onPress={() => {
                  // function to delete this eevnt and send to backend
                  handleRemoveSession();
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* BottomSheet */}
      <BottomSheet
        index={bottomSheetVisible}
        snapPoints={snapPoints}
        style={{ paddingHorizontal: 20 }}
        backgroundStyle={styles.bottomSheet}
        onChange={(index) => {
          setBottomSheetVisible(index);
        }}
      >
        <View style={{ marginBottom: 15, marginHorizontal: 10 }}>
          <Text style={{ fontWeight: 700, fontSize: 24, marginBottom: 15 }}>
            Add/Block
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>Start:</Text>
            <DatePicker
              date={startDatetime}
              onDateChange={(date) => setStartDatetime(date)}
              style={{ height: 100, transform: [{ scale: 0.875 }] }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>End:</Text>
            <DatePicker
              date={endDatetime}
              onDateChange={(date) => {
                setEndDatetime(date);
              }}
              style={{ height: 100, transform: [{ scale: 0.875 }] }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 240,
              alignSelf: "center",
            }}
          >
            <PrimaryButton
              title={"Add"}
              width={90}
              fontSize={16}
              paddingVertical={10}
              paddingHorizontal={4}
              marginTop={20}
              marginBottom={10}
              onPress={() => handleAddSession()}
            />
            <PrimaryButton
              title={"Block"}
              width={90}
              fontSize={16}
              paddingVertical={8}
              paddingHorizontal={4}
              marginTop={20}
              marginBottom={10}
              onPress={() => {
                handleBlockSession();
              }}
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
  weekview: {
    marginTop: -40,
    transform: [{ scale: 0.85 }],
    borderColor: "rgba(0,0,0,0)",
    borderRadius: 16,
    height: 800,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
  },
  panelWrapper: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    width: 150,
    borderWidth: 1.25,
    borderRadius: 8,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  modalText: {
    fontSize: 17,
    marginVertical: 6,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  datePickerGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTextInput: {
    width: 100,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#eee",
    textAlign: "center",
    padding: 5,
    fontSize: 16,
  },
  bottomSheet: {
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  datePickerWrapper: {},
});
