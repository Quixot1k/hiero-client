import {StyleSheet, View} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const InlineDateTimePicker = ({display = "default", value, onDateChange, onTimeChange}) => {
  return (
    <View style={styles.container}>
      <RNDateTimePicker value={value} mode={"date"} display={display}
                        onChange={(event, date) => {
                          if (onDateChange) {
                            onDateChange(date)
                          }
                        }}/>
      <RNDateTimePicker value={value} mode={"time"} display={display} minuteInterval={15}
                        onChange={(event, date) => {
                          if (onTimeChange) {
                            onTimeChange(date)
                          }
                        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
})
export default InlineDateTimePicker