import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ClientItem from "../components/ClientItem";

export default function ClientListScreen({ navigation }) {
  const { userId } = useSelector((state) => state.user);
  const [clientList, setClientList] = useState([]);
  const [filterClientList, setFilterClientList] = useState([]);
  const [search, setSearch] = useState("");

  const getClients = async () => {
    await axios
      .get(`http://localhost:10001/client/getall/${11}`)
      .then((res) => {
        setClientList(res.data);
        setFilterClientList(res.data);
      });
  };

  const handleFilter = () => {
    const filteredList = clientList.filter((client) => {
      return client.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilterClientList(filteredList);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          style={styles.textInput}
          placeholder="Search by name"
          onChangeText={(text) => {
            setSearch(text);
            if (text.length <= 0) {
              setFilterClientList(clientList);
            } else {
              handleFilter();
            }
          }}
        />
        <View style={styles.listWrapper}>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {filterClientList.length ? (
              filterClientList.map((clientObj, index) => (
                <ClientItem
                  key={index}
                  name={clientObj.name}
                  onPress={() =>
                    navigation.navigate("ClientDetailScreen", { clientObj })
                  }
                />
              ))
            ) : (
              <Text style={{ marginTop: 150, fontSize: 20 }}>No Clients</Text>
            )}
          </ScrollView>
        </View>
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
    marginTop: 30,
  },
  textInput: {
    width: 300,
    height: 38,
    fontSize: 18,
    borderRadius: 20,
    paddingHorizontal: 24,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
  },
  listWrapper: {
    height: 600,
    width: 360,
    borderRadius: 16,
    paddingVertical: 10,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 4,
    marginHorizontal: 10,
  },
});
