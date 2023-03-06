import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  marginTop = 20,
  marginBotton = 24,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { marginTop: marginTop, marginBottom: marginBotton },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
