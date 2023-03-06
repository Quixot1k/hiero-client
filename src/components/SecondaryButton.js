import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SecondaryButton({
  title,
  onPress,
  fontSize = 16,
  fontWeight = 700,
  marginTop = 20,
  marginBotton = 24,
  paddingVertical = 12,
  paddingHorizontal = 32,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginTop: marginTop,
          marginBottom: marginBotton,
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
    borderWidth: 2.2,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    lineHeight: 21,
    fontWeight: 400,
    letterSpacing: 0.25,
    color: "black",
  },
});
