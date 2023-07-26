import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

export default function CertificationItem({
                                            CertificationId,
                                            type,
                                            number,
                                            handleRemove,
                                          }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>TYPE : {type}</Text>
        <Text></Text>
        <Text style={styles.text}>NUM : {number}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleRemove(CertificationId)}>
          <MaterialIcons name="cancel" size={24} color="red"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 320,
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(160,160,160,0.5)",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 6,
    backgroundColor: "rgba(160,160,160,0.1)",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    color: "#000000",
    fontSize: 17,
  },
});
