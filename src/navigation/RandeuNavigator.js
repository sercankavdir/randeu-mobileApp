import React from "react";
import { Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import SectorsScreen from "../screens/User/SectorsScreen";
import BusinessTypesScreen from "../screens/User/BusinessTypesScreen";
import BusinessesScreen from "../screens/User/BusinessesScreen";
import BusinessDetailScreen from "../screens/User/BusinessDetailScreen";
import BusinessCreateScreen from "../screens/Business/BusinessCreateScreen";
import ProfileScreen from "../screens/User/ProfileScreen";
import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const AppNavigator = createStackNavigator(
  {
    Sectors: SectorsScreen,
    BusinessTypes: BusinessTypesScreen,
    Businesses: BusinessesScreen,
    Business: BusinessDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const BusinessNavigator = createStackNavigator({
  BusinessCreate: BusinessCreateScreen,
});

const tabConfiguration = {
  HomeScreen: {
    screen: AppNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <AntDesign name="home" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Ana Sayfa</Text>
        ) : (
          "Ana Sayfa"
        ),
    },
  },
  Business: {
    screen: BusinessNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialIcons
            name="business-center"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>İş yeri</Text>
        ) : (
          "İş yeri"
        ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <AntDesign name="user" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Profil</Text>
        ) : (
          "Profil"
        ),
    },
  },
};

const RandeuTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabConfiguration, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabConfiguration, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: Colors.primaryColor,
        },
      });

export default createAppContainer(RandeuTabNavigator);
