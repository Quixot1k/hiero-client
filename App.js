import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import StackNavigatorScreen from "./src/screens/StackNavigatorScreen";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigatorScreen />
      </NavigationContainer>
    </Provider>
  );
}
