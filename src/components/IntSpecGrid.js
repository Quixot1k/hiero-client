import {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useStore} from "../store";

export default function IntSpecGrid({name, toggle}) {
  const [pressed, setPressed] = useState(false);
  const intSpecs = useStore((state) => state.intSpecs);
  useEffect(() => {
    for (let item of intSpecs) {
      if (name === item.categoryName) {
        setPressed(true);
      }
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        toggle();
        setPressed(!pressed);
      }}
    >
      <View
        style={[
          styles.container,
          pressed
            ? {backgroundColor: "#000000"}
            : {backgroundColor: "#fcfcfc"},
        ]}
      >
        <Text
          style={[styles.text, pressed ? {color: "#ffffff"} : {color: "#000000"}]}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    fontSize: 30,
    width: 102,
    height: 48,
    marginHorizontal: 8,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1.5},
    shadowRadius: 3,
  },
  text: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
  },
});
