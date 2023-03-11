import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
  Alert
} from "react-native";
import React, { useState } from "react";
import { FONTS, SIZES } from "../constants";
import { COLORS } from "./../constants/theme";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Feather 
} from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FireBase/Firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userName,setUserName]=useState("")
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const register=()=>{
    if(email===""  || password==="" || phone===""){
      Alert.alert('Invalid Details', 'Please fill all the details', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

    }
    createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      
      const user=userCredential._tokenResponse.email;
      console.log("user:",user);
      const userNames=userCredential._tokenResponse.displayName
      const myUserUid=auth.currentUser.uid;
      console.log("uid:",myUserUid)
      console.log(userName)

      console.log()

      setDoc(doc(db,"users",`${myUserUid}`),{
        email:user,
        phone:phone,
        password:password,
        userNames:userName
       

      })

    })
    navigation.navigate('login');
  }

  function renderHeader() {
    return (
      <>
        <Text style={{ ...FONTS.h1, color: "#8632a6" }}>Sign Up</Text>
        <Text style={{ ...FONTS.h2, marginTop: SIZES.radius }}>
        Create a new Account
        </Text>
      </>
    );
  }

  function renderInput() {
    return (
      <>
      
        
        <View style={{ marginTop: SIZES.padding * 5 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="user" size={24} color="black" />
            <TextInput
              placeholder="User Name"
              style={styles.TextInputstyle}
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center",marginVertical:SIZES.padding }}>
            <MaterialCommunityIcons name="email" size={24} color="black" />
            <TextInput
              placeholder="email"
              style={styles.TextInputstyle}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>


          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: SIZES.padding,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Ionicons name="key-outline" size={24} color="black" />
                <TextInput
                  placeholder="password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.TextInputstyle}
                  secureTextEntry={showPassword}
                />
              </View>
              <Pressable
                onPress={() => {
                  setShowPassword(!showPassword);
                  console.warn(
                    showPassword
                      ? "your password showed"
                      : "Your Password is safe"
                  );
                }}
              >
                <AntDesign
                  name="eye"
                  size={24}
                  color="black"
                  style={{ position: "absolute", right: -10, top: -15 }}
                />
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={24} color="black" />
              <TextInput
                placeholder="phone"
                style={styles.TextInputstyle}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType='phone-pad'
              />
            </View>
          </View>
        </View>
      </>
    );
  }

  function renderButton() {
    return (
      <>
        <Pressable
          onPress={register}
          style={{
            marginTop: SIZES.padding * 3,
            backgroundColor: COLORS.green,
            borderRadius: SIZES.padding,
            width: 200,
            padding: SIZES.padding2,
            marginLeft: "auto",
            marginRight: "auto",
            ...styles.shadow,
          }}
        >
          <Text
            style={{ ...FONTS.h4, textAlign: "center", color: COLORS.white }}
          >
            Register
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: SIZES.padding2 }}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
            Don you have a account? Sign In
          </Text>
        </Pressable>
      </>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: SIZES.padding * 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderHeader()}
          {renderInput()}
          {renderButton()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  TextInputstyle: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: 300,
    marginVertical: SIZES.padding,
    marginLeft: SIZES.base,
    ...FONTS.h4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 12,
  },
});
