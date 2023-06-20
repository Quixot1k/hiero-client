import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SecondaryButton({
  title,
  onPress,
  height,
  fontSize = 16,
  fontWeight = 700,
  marginTop = 20,
  marginBottom = 24,
  paddingVertical = 12,
  paddingHorizontal = 32,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          height: height,
          marginTop: marginTop,
          marginBottom: marginBottom,
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.text, { fontWeight: fontWeight, fontSize: fontSize }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 2,
  },
  text: {
    lineHeight: 21,
    fontWeight: 400,
    letterSpacing: 0.25,
    color: "black",
  },
});
