import {Dimensions, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import AvailabilityItem from "../../components/AvailabilityItem";
import WEEKDAY from "../../constant/WEEKDAY";
import PrimaryButton from "../../components/PrimaryButton";

const screenWidth = Dimensions.get("window").width;
const AvailabilityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {
          WEEKDAY.map((day, index) => (
            <AvailabilityItem day={Object.keys(day)[0]} color={Object.values(day)[0]} key={index}/>
          ))
        }
        <PrimaryButton title={"Save"} fontSize={20} fontWeight={"700"} paddingVertical={12}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
    marginTop: 30,
    width: screenWidth,
  },
});
export default AvailabilityScreen;