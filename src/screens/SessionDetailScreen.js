import {SafeAreaView, ScrollView, Text} from "react-native";

const SessionDetailScreen = ({route}) => {
  const sessionObj = route.params;
  console.log(sessionObj);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>SessionDetailScreen</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SessionDetailScreen