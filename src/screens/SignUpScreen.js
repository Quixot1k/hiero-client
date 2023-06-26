import {CommonActions} from "@react-navigation/native";
import {CheckBox} from "@rneui/themed";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import {useStore} from "../store";
import validator from "validator";
import {useState} from "react";

const {width: screenWidth} = Dimensions.get("window");
export default function LoginScreen({navigation}) {
  const role = useStore((state) => state.role);
  const updateRole = useStore((state) => state.updateRole);
  const email = useStore((state) => state.email);
  const updateEmail = useStore((state) => state.updateEmail);
  const password = useStore((state) => state.password);
  const updatePassword = useStore((state) => state.updatePassword);
  const password2 = useStore((state) => state.password2);
  const updatePassword2 = useStore((state) => state.updatePassword2);

  const [hidden, setHidden] = useState({
    password: true,
    password2: true,
  });
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
            style={styles.textInput}
            onChangeText={(text) => {
              updateEmail(text);
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
            }]}>
            <TextInput
              value={password}
              placeholder="8 to 12 characters"
              style={{width: 180, fontSize: 17, marginLeft: 10}}
              maxLength={16}
              textContentType={"password"}
              secureTextEntry={hidden.password}
              onChangeText={(text) => {
                updatePassword(text);
              }}
            />
            <TouchableOpacity onPress={() => {
              setHidden({...hidden, password: !hidden.password});
            }}>
              <Text style={{fontWeight: "500"}}>{hidden.password ? "Show" : "Hide"}</Text>
            </TouchableOpacity>
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
            }]}>
            <TextInput
              value={password}
              placeholder="Enter your passowrd again"
              style={{width: 180, fontSize: 17, marginLeft: 10}}
              maxLength={16}
              textContentType={"password"}
              secureTextEntry={hidden.password2}
              onChangeText={(text) => {
                updatePassword2(text);
              }}
            />
            <TouchableOpacity onPress={() => {
              setHidden({...hidden, password2: !hidden.password2});
            }}>
              <Text style={{fontWeight: "500"}}>{hidden.password2 ? "Show" : "Hide"}</Text>
            </TouchableOpacity>
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
            checkedColor="#000"
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
    shadowColor: "black",
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
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  }
});
