import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
export default function LocationItem({
                                       locationId,
                                       name,
                                       addr1,
                                       addr2,
                                       city,
                                       state,
                                       zipcode,
                                       locationType, // [Gym, Home]
                                       handleRemove,
                                     }) {
  return (
    <View style={styles.container}>
      {/* Left Part */}
      <View style={{marginLeft: 24}}>
        <Text
          style={[
            styles.text,
            {fontSize: 18, fontWeight: "700", marginLeft: 0},
          ]}
        >
          {name}
        </Text>
        <Text style={styles.text}>{(addr1 + " " + addr2).trimStart()}</Text>
        <Text style={styles.text}>{city}</Text>
        <Text style={styles.text}>{state}</Text>
        <Text style={styles.text}>{zipcode}</Text>
      </View>
      {/* Right Part */}
      <View style={{marginRight: 10, alignItems: "flex-end"}}>
        <Text
          style={{
            fontStyle: "italic",
            color: "#fff",
            marginBottom: 100,
            fontSize: 20,
            fontWeight: "500",
            marginRight: 10,
          }}
        >
          {locationType}
        </Text>
        <TouchableOpacity
          style={{
            width: 78,
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() => handleRemove(locationId)}
        >
          <MaterialIcons name="delete" size={18} color="#fff"/>
          <Text style={styles.btnText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151515",
    width: 0.825 * screenWidth,
    height: 200,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 5,
  },
  text: {
    color: "#ffffff",
    marginVertical: 5,
    fontSize: 16,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
