import {Pressable, StyleSheet, Text, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useState} from "react";
import {format} from "date-fns";

const InlineDateTimePickerModal = ({date, time, onDateChange, onTimeChange}) => {
  const [visible, setVisible] = useState({
    date: false,
    time: false,
  });
  return (
    <View>
      <View style={{flexDirection: "row"}}>
        <Pressable onPress={() => setVisible({...visible, date: true})} style={[styles.pressable, {width: 150}]}>
          <Text style={{fontSize: 22}}>{format(date, "yyyy-MM-dd")}</Text>
        </Pressable>
        <Pressable onPress={() => setVisible({...visible, time: true})} style={[styles.pressable, {width: 80}]}>
          <Text style={{fontSize: 22}}>{format(time, "HH:mm")}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={visible.date}
        mode={"date"}
        onConfirm={(date) => {
          onDateChange(date);
          setVisible({...visible, date: false});
        }}
        onCancel={() => {
          setVisible({...visible, date: false});
        }}
      />
      <DateTimePickerModal
        isVisible={visible.time}
        mode={"time"}
        minuteInterval={15}
        onConfirm={(date) => {
          onTimeChange(date);
          setVisible({...visible, time: false});
        }}
        onCancel={() => {
          setVisible({...visible, time: false});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  pressable: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  }
});
export default InlineDateTimePickerModal;