import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import ClientItem from "../components/ClientItem";
import useClient from "../hooks/useClient";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");
export default function ClientListScreen({navigation}) {
  const [filteredClientList, setFilteredClientList] = useState([]);
  const [search, setSearch] = useState("");

  const handleFilter = () => {
    const filteredList = clients.filter((client) => {
      return client.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredClientList(filteredList);
  };

  const {data: clients, isLoading, error} = useClient();

  useEffect(() => {
    setFilteredClientList(clients);
  }, [clients]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          style={styles.textInput}
          placeholder="Search by name"
          onChangeText={(text) => {
            setSearch(text);
            if (text.length <= 0) {
              setFilteredClientList(clients);
            } else {
              handleFilter();
            }
          }}
        />
        <View style={styles.listWrapper}>
          <ScrollView contentContainerStyle={{alignItems: "center"}}>
            {isLoading && <Text>Loading...</Text>}
            {error && <Text>{error.message}</Text>}
            {
              filteredClientList?.map((clientObj, index) => (
                <ClientItem
                  key={index}
                  name={clientObj.name}
                  onPress={() =>
                    navigation.navigate("ClientDetailScreen", {clientObj})
                  }
                />)
              )
            }
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
    width: screenWidth,
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
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
  },
  listWrapper: {
    height: 0.675 * screenHeight,
    width: 0.875 * screenWidth,
    borderRadius: 16,
    paddingVertical: 10,
    backgroundColor: "#fcfcfc",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
  },
});
