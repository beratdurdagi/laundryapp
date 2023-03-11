import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState,useEffect } from "react";
import { FONTS, SIZES } from "../constants";
import { COLORS } from "./../constants/theme";
import { useNavigation,useRoute } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { PhoneAuthCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase/Firebase";
import { ActivityIndicator } from "react-native";


const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigation = useNavigation();

 const route=useRoute()  

  const login=()=>{
    signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      const user=userCredential._tokenResponse.email;
      const myUserUid=auth.currentUser.uid;
      
   
      
      
      
    })

  }

  useEffect(() => {
    const unSubscribe= auth.onAuthStateChanged((authUser) => {
       
     setLoading(true)
     if (!authUser){
       setLoading(false);
     };
     console.log(authUser)
       if(authUser){
         navigation.navigate('home',);
       }
     });
     return unSubscribe;
   }, [])
  

  function renderHeader() {
    return (
      <>
        <Text style={{ ...FONTS.h1, color: "#8632a6" }}>Sign in</Text>
        <Text style={{ ...FONTS.h2, marginTop: SIZES.radius }}>
          Sign In to your Account
        </Text>
      </>
    );
  }

  function renderInput() {
    return (
      <>
        <View style={{ marginTop: SIZES.padding * 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="email" size={24} color="black" />
            <TextInput
              placeholder="email"
              style={styles.TextInputstyle}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
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
        </View>
      </>
    );
  }
  
  function renderButton(){
    return(
    <>
     <Pressable
     onPress={login}
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
              Logn In
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("register")}
            style={{ marginTop: SIZES.padding2 }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
              Don't have a account? Sign Up
            </Text>
          </Pressable></>
    )
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
      {loading ? (
        <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',flex:1}}>
          <Text>loading</Text>
          <ActivityIndicator color={COLORS.primary} size={'large'} />
        </View>
      )
      :
      (
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

      )
        
      }
      
    </SafeAreaView>
  );
};

export default LoginScreen;

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
