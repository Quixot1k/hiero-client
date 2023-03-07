import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { avatarChanged } from "../features/userSlice";

export default function AvatarScreen({ navigation }) {
  const dispatch = useDispatch();
  const { avatar } = useSelector((state) => state.user);
  const openMediaLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      alert("Please go to settings and allow this app to access your library!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(avatarChanged(result.assets[0].uri));
    }
  };
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted === false) {
      alert("Please go to settings and allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(avatarChanged(result.assets[0].uri));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Show the world who you are</Text>
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{ width: 240, height: 240, borderRadius: 120 }}
          />
        ) : (
          <View style={styles.circle}></View>
        )}
        <View style={{ marginTop: 6 }}>
          <SecondaryButton
            title={"Choose from library"}
            fontWeight={500}
            onPress={openMediaLibrary}
          />
          <SecondaryButton
            title={"Open camera"}
            fontWeight={500}
            marginTop={-8}
            onPress={openCamera}
          />
        </View>
        <PrimaryButton
          title="Next"
          marginTop={14}
          onPress={() => {
            console.log("goto ProfileScreen");
            navigation.navigate("ProfileScreen");
          }}
        />
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
    marginTop: 90,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 40,
  },
  circle: {
    height: 240,
    width: 240,
    borderWidth: 0.2,
    borderRadius: 250,
    backgroundColor: "#ccc",
  },
});
