import {CommonActions} from "@react-navigation/native";
import {CheckBox} from "@rneui/themed";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import {useStore} from "../../store";
import validator from "validator/es";
import {useEffect, useState} from "react";
import DeviceInfo from "react-native-device-info";

const {width: screenWidth} = Dimensions.get("window");
export default function LoginScreen({navigation}) {
  const {deviceIds, role, email, password, password2} = useStore((state) => state);
  const {updateDeviceIds, updateRole, updateEmail, updatePassword, updatePassword2} = useStore((state) => state);

  const [hidden, setHidden] = useState({
    password: true,
    password2: true,
  });
  const [warning, setWarning] = useState({
    email: false,
    password: false,
    password2: false,
  })
  const handleSignUp = () => {
    if (!validator.isEmail(email)) {
      console.log("email is not valid");
    } else if (!validator.isStrongPassword(password)) {
      console.log("password is not valid");
    } else if (password !== password2) {
      console.log("passwords do not match");
    } else {
      console.log("goto InfoScreen and clear navigation stack");
      navigation.navigate("InfoScreen");
    }
  };

  useEffect(() => {
    const getDeviceId = async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      updateDeviceIds(deviceId);
      console.log(deviceIds);
    };
    getDeviceId().catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {role === "client" ? (
          <View>
            <Text style={styles.header}>Get Connected</Text>
            <Text style={[styles.header, {marginBottom: 14}]}>
              With The Best!
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.header}>Optimize your</Text>
            <Text
              style={[styles.header, {marginBottom: 14, textAlign: "center"}]}
            >
              TIME!
            </Text>
          </View>
        )}

        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            value={email}
            placeholder="Email"
            textContentType={"emailAddress"}
            keyboardType={"email-address"}
            style={[styles.textInput, {shadowColor: warning.email ? "red" : "black"}]}
            onChangeText={(text) => {
              updateEmail(text);
              if (!text || validator.isEmail(text)) {
                setWarning({...warning, email: false});
              } else {
                setWarning({...warning, email: true});
              }
            }}
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Password</Text>
          <View
            style={[styles.textInputView, {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 14,
              shadowColor: warning.password ? "red" : "black",
            }]}>
            <TextInput
              value={password}
              placeholder="8 to 16 characters"
              style={{width: 180, fontSize: 17, marginLeft: 10}}
              maxLength={16}
              textContentType={"password"}
              secureTextEntry={hidden.password}
              onChangeText={(text) => {
                updatePassword(text);
                if (!text || validator.isStrongPassword(text)) {
                  setWarning({...warning, password: false});
                } else {
                  setWarning({...warning, password: true});
                }
              }}
            />
            {password && <TouchableOpacity onPress={() => {
              setHidden({...hidden, password: !hidden.password});
            }}>
              <Text style={{fontWeight: "500"}}>{hidden.password ? "Show" : "Hide"}</Text>
            </TouchableOpacity>}
          </View>
        </View>
        <View style={[styles.textInputGroup, {marginBottom: 20}]}>
          <Text style={styles.text}>Password</Text>
          <View
            style={[styles.textInputView, {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 14,
              shadowColor: warning.password2 ? "red" : "black",
            }]}>
            <TextInput
              value={password2}
              placeholder="Your passowrd again"
              style={{width: 180, fontSize: 17, marginLeft: 10}}
              maxLength={16}
              textContentType={"password"}
              secureTextEntry={hidden.password2}
              onChangeText={(text) => {
                updatePassword2(text);
                if (!text || text === password) {
                  setWarning({...warning, password2: false});
                } else {
                  setWarning({...warning, password2: true});
                }
              }}
            />
            {password2 && <TouchableOpacity onPress={() => {
              setHidden({...hidden, password2: !hidden.password2});
            }}>
              <Text style={{fontWeight: "500"}}>{hidden.password2 ? "Show" : "Hide"}</Text>
            </TouchableOpacity>}
          </View>
        </View>
        <View>
          <CheckBox
            title={"I'm a client"}
            size={24}
            textStyle={{fontSize: 18, fontWeight: 500, color: "#000"}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role === "client"}
            checkedColor="#000"
            onPress={() => {
              updateRole("client");
            }}
          />
          <CheckBox
            title={"I'm a trainer"}
            size={24}
            textStyle={{fontSize: 18, fontWeight: 500, color: "#000"}}
            wrapperStyle={{marginTop: -10}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role === "trainer"}
            checkedColor="#000000"
            onPress={() => {
              updateRole("trainer");
            }}
          />
        </View>
        <PrimaryButton title={"Sign Up"} onPress={handleSignUp}/>
        <TouchableOpacity
          onPress={() => {
            console.log("goto LoginScreen and clear navigation stack");
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: "LoginScreen"}],
              })
            );
          }}
        >
          <Text
            style={[
              styles.text,
              {marginTop: 10, textDecorationLine: "underline"},
            ]}
          >
            Already on Kairos?
          </Text>
        </TouchableOpacity>
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
    alignItems: "center",
    marginTop: 40,
    width: screenWidth,
  },
  header: {
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 10,
  },
  textInputGroup: {
    flexWrap: "wrap",
    margin: 10,
  },
  text: {
    fontSize: 16,
    paddingLeft: 3,
    fontWeight: "500",
  },
  textInput: {
    borderRadius: 10,
    height: 50,
    width: 260,
    marginTop: 5,
    paddingLeft: 10,
    fontSize: 17,
    backgroundColor: "#fefefe",
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
  textInputView: {
    borderRadius: 10,
    height: 50,
    width: 260,
    marginTop: 5,
    backgroundColor: "#fefefe",
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  }
});
