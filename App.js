import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BasketScreen from "./screens/BasketScreen";
import LoadingScreen from "./screens/LoadingScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
// import "react-native-url-polyfill/auto";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
