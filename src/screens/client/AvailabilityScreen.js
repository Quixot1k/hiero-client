import {Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import useAvailability from "../../hooks/useAvailability";
import AvailabilityItem from "../../components/AvailabilityItem";
import WEEKDAY from "../../constant/WEEKDAY";
import useUpdateAvailability from "../../hooks/useUpdateAvailability";
import {useStore} from "../../store";
import {useEffect, useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const AvailabilityScreen = () => {
  const {userId} = useStore((state) => state);
  const {data: availabilities, error, isLoading} = useAvailability();
  const updateAvailability = useUpdateAvailability();
  const [localAvailabilities, setLocalAvailabilities] = useState(availabilities || []);
  const handleSave = () => {
    updateAvailability.mutate({
      "clientId": userId,
      "dayStartEndTimeList": localAvailabilities
    });
  }

  useEffect(() => {
    setLocalAvailabilities(availabilities);
  }, [availabilities]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {
          localAvailabilities?.map((ava, index) => (
            <AvailabilityItem day={ava.day} color={WEEKDAY[ava.day]} key={index}/>))
        }
        <TouchableOpacity>
          <MaterialIcons name="add-circle" size={32} color="#252525" marginVertical={20}/>
        </TouchableOpacity>
        <PrimaryButton title={"Save"}
                       paddingVertical={10}
                       paddingHorizontal={30}
                       marginTop={25}
                       fontSize={17}
                       fontWeight={"500"}
                       onPress={handleSave}/>
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
    paddingTop: 20,
    width: screenWidth,
  },
});
export default AvailabilityScreen;