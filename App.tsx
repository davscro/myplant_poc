import React, { useEffect } from "react";
import { Text, View } from "react-native";
// @ts-ignore
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import HomeScreen from "./screens/HomeScreen";
import registerForPushNotifications from "./registerForPushNotifications";

function Settings() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>About Screen</Text>
    </View>
  );
}

function History() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>History Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "History") {
              iconName = focused ? "barschart" : "barschart";
            } else if (route.name === "Settings") {
              iconName = focused ? "setting" : "setting";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} type={"AntDesign"} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
