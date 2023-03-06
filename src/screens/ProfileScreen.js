import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.circle}></View>
        <PrimaryButton
          title={"Update profile picture"}
          fontSize={12}
          fontWeight={500}
          marginTop={10}
          marginBotton={14}
          paddingVertical={4}
          paddingHorizontal={14}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.textInput, { width: 144 }]}
            placeholder={"First Name"}
          />
          <TextInput
            style={[styles.textInput, { width: 144 }]}
            placeholder={"Last Name"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.textInput, { width: 66 }]}
            placeholder={"Age"}
          />
          <TextInput
            style={[styles.textInput, { width: 66 }]}
            placeholder={"Gender"}
          />
          <TextInput
            style={[styles.textInput, { width: 144 }]}
            placeholder={"Email Address"}
          />
        </View>
        <TextInput style={styles.textInput} placeholder={"Password"} />
        <TextInput style={styles.textInput} placeholder={"Phone Number"} />
        <TextInput style={styles.textInput} placeholder={"Address"} />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.textInput, { width: 85 }]}
            placeholder={"City"}
          />
          <TextInput
            style={[styles.textInput, { width: 85 }]}
            placeholder={"State"}
          />
          <TextInput
            style={[styles.textInput, { width: 106 }]}
            placeholder={"Zip Code"}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={"Maximum Travel Distance"}
        />
        <TextInput
          style={styles.textInput}
          placeholder={"Willing to train at home?"}
        />
        <TextInput
          style={styles.textInput}
          placeholder={"Willing to train over Zoom? "}
        />
        <PrimaryButton title={"Save"} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginTop: 20,
    alignItems: "center",
  },
  circle: {
    borderWidth: 0.2,
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
  },
  textInput: {
    borderWidth: 1.8,
    borderRadius: 4,
    textAlign: "center",
    height: 40,
    width: 300,
    marginHorizontal: 6,
    marginVertical: 4,
  },
});
