import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { auth } from "../FireBase/Firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { Pressable } from "react-native";
import { SIZES, FONTS, COLORS } from "../constants";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Zustand from "zustand";
import HomeScreen from './HomeScreen';

const ProfileScreen = () => {
  const user = auth.currentUser;
  console.log("user: ", user);
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View>
          <Feather name="edit-3" size={24} color="black" />
        </View>
      </View>
    );
  }

  function renderUserAbout() {
    return (
      <View style={{ marginHorizontal: SIZES.padding2, flexDirection: "row" }}>
        <Image
          source={require("../assets/Profiles/profile.jpg")}
          style={{ height: 100, width: 100, borderRadius: 50 }}
          resizeMode="contain"
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ ...FONTS.h2 }}>Welcome to Your Profile</Text>
          <Text style={{ ...FONTS.h4, color: COLORS.gray }}>
            You can everythink what you want
          </Text>
        </View>
      </View>
    );
  }


  console.log(user.phoneNumber);
  function renderPhoneMail() {
    return (
      <View
        style={{ marginTop: SIZES.padding * 2, marginLeft: SIZES.padding * 3 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="email" size={17} color={COLORS.gray} />

          <Text style={{ marginLeft: 5, ...FONTS.h4, color: COLORS.gray }}>
            {user.email}
          </Text>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ marginTop: SIZES.padding * 3 }}>
        <View
          style={{
            padding: 10,
            borderWidth: 0.8,
            borderRadius: 10,
            borderColor: COLORS.gray,
            marginVertical:SIZES.padding
          }}
        >
          <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={()=>navigation.navigate('Cart')}>
            <Feather name={"heart"} size={17} color="black" />
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: SIZES.padding,
                color: COLORS.cartBackground,
              }}
            >
              Your Cart Screen
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            borderWidth: 0.8,
            borderRadius: 10,
            borderColor: COLORS.gray,
            marginVertical: SIZES.padding,
          }}
        >
          <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={()=>navigation.navigate('home')}>
            <Feather name={"home"} size={17} color="black" />
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: SIZES.padding,
                color: COLORS.cartBackground,
              }}
            >
             HomeScreen
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            borderWidth: 0.8,
            borderRadius: 10,
            borderColor: COLORS.gray,
            marginVertical: SIZES.padding,
          }}
        >
          <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name={"settings"} size={17} color="black" />
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: SIZES.padding,
                color: COLORS.cartBackground,
               
              }}
            >
             Settings
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            borderWidth: 0.8,
            borderRadius: 10,
            borderColor: COLORS.gray,
            marginVertical:SIZES.padding,
            
          }}
        >
          <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={signOutUser}>
            <Feather name={"log-out"} size={17} color="black" />
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: SIZES.padding,
                color: COLORS.cartBackground,
              }}
            >
              Sign-out
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{ marginTop: SIZES.padding * 5 }}>
      {renderHeader()}
      {renderUserAbout()}
      {renderPhoneMail()}
      {renderButton()}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,


  },
});

