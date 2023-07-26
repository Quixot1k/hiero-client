import {Dimensions, StyleSheet, Text, View} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const screenWidth = Dimensions.get("window").width;
const AvailabilityItem = ({day, color}) => {
  // console.log(color);
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.dayWrapper}>
        <Text style={{fontSize: 18, color: "#ffffff", fontWeight: "700"}}>{day.substring(0, 3)}</Text>
      </View>
      <View style={styles.timepickerWrapper}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{fontSize: 17, fontWeight: "600"}}>{"From"}</Text>
          <RNDateTimePicker value={new Date()} mode="time" minuteInterval={15}/>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{fontSize: 17, fontWeight: "600"}}>{"  To"}</Text>
          <RNDateTimePicker value={new Date()} mode="time" minuteInterval={15}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 0.9375 * screenWidth,
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 3,
    elevation: 5,
    opacity: 0.9,
  },
  dayWrapper: {
    width: 0.125 * screenWidth,
    borderRadius: 0.1 * screenWidth,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    elevation: 3,
  },
  timepickerWrapper: {
    flexDirection: "row",
    marginLeft: 15,
  }
})
export default AvailabilityItem;