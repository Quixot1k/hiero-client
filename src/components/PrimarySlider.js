import { Slider } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";

export default function PrimarySlider({
  value,
  minimumValue,
  maximumValue,
  onValueChange,
  annotation = true,
}) {
  return (
    <View style={styles.container}>
      {annotation && (
        <Text style={{ marginRight: 6, fontSize: 18, fontWeight: 400 }}>
          {minimumValue}
        </Text>
      )}
      <Slider
        value={value}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#ccc"
        allowTouchTrack={true}
        thumbStyle={{ height: 20, width: 20, backgroundColor: "#000" }}
        trackStyle={{ height: 6, width: 200, borderRadius: 10 }}
        step={1}
        onValueChange={onValueChange}
      />
      {annotation && (
        <Text style={{ marginLeft: 6, fontSize: 18, fontWeight: 400 }}>
          {`${maximumValue}+`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 46,
    marginBottom: 40,
  },
});
