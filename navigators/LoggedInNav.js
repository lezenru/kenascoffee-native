import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import {Ionicons} from "@expo/vector-icons";





const Tabs = createBottomTabNavigator();

export default function LoggedInNav(){
    return  <Tabs.Navigator
        screenOptions={{
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerShown: false,

            tabBarActiveTintColor: "white",
            showLabel: false,
            tabBarStyle: {
                borderTopColor: "rgba(255, 255, 255, 0.3)",
                backgroundColor: "black",
            },
        }}
    >
        <Tabs.Screen
            name="Home"
            component={Home}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="home" color={color} size={focused ? 24 : 20} />
                ),
            }}
        />
        <Tabs.Screen
            name="Search"
            component={Search}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="search" color={color} size={focused ? 24 : 20} />
                ),
            }}
        />
        <Tabs.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="person" color={color} size={focused ? 22 : 18} />
                ),
            }}
        />
    </Tabs.Navigator>
}