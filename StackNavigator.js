import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationContainer from "./node_modules/@react-navigation/native/lib/module/NavigationContainer";
import { HomeScreen, CartScreen, PickupScreen, LoginScreen, RegisterScreen, ProfileScreen, OrderScreen } from "./screens";

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"login"}>
        <Stack.Screen
          name={"login"}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name={"register"}
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"profile"}
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name={"order"}
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"home"}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Cart"}
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"picking"}
          component={PickupScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
