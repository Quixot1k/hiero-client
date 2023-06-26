import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function PrimaryButton({
                                        title,
                                        onPress,
                                        height,
                                        width,
                                        fontSize = 16,
                                        fontWeight = 700,
                                        marginTop = 20,
                                        marginBottom = 24,
                                        paddingVertical = 12,
                                        paddingHorizontal = 32,
                                        icon,
                                      }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: height,
          width: width,
          marginTop: marginTop,
          marginBottom: marginBottom,
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
        },
      ]}
      onPress={onPress}
    >
      {icon && <View>{icon}</View>}
      {title && <Text
        style={[styles.text, {fontWeight: fontWeight, fontSize: fontSize}]}
      >
        {title}
      </Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "black",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 5,
  },
  text: {
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});
