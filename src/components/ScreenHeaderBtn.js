import { TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
const styles = StyleSheet.create({
  logo: {
    width: 25,
    height: 25,
  },
  btnContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ScreenHeaderBtn = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Entypo name="home" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
