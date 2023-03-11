import {
  StyleSheet,
  Text,
  View,

  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import { SliderBox } from "react-native-image-slider-box";
import {
  images,
  FONTS,
  SIZES,
  COLORS,
  services,
  productData,
} from "./../constants";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../Redux/ProductReducer";

import DressItem from "../component/DressItem";
import { useNavigation,useRoute } from "@react-navigation/native";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../FireBase/Firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [serviceData, setServiceData] = useState(services);
 const [items,setItems]=useState([]);

  // STATE MANEGEMENT

  // first cart is in store and second one is in reducer name
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const totalPrice = cart
    .map((item) => item.price * item.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log(cart);




  //for product detection
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      try {
        const freeTimeRef = collection(db, 'types');
        const q = query(freeTimeRef);
        const querySnap = await getDocs(q);
        
        
        
        querySnap.forEach((d) => {
         items.push(d.data())
        });
        
        await Promise.all(items);
        items?.map((service)=>dispatch(getProducts(service)))
        console.log("Documents updated")
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  });

  //get location coordinat
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        let response = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        for (let item of response) {
          let adress = ` ${item.name} ${item.district} ${item.postalCode}`;
          setLocation(adress);
        }
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    {
      text = location;
    }
  }
  const route=useRoute()

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: SIZES.padding,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <MaterialIcons name="location-on" size={24} color={"#fd5c63"} />
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ ...FONTS.h3 }}>Home</Text>
            <Text style={{ ...FONTS.body3, color: COLORS.gray }}>{text}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profile'
        

          
      )}>
          <Image
            source={require("../assets/Profiles/profile.jpg")}
            resizeMode="contain"
            style={{ height: 50, width: 50, borderRadius: 15 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderTextInput() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding * 2,
          backgroundColor: COLORS.white,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: SIZES.base,
          borderColor: COLORS.gray,
        }}
      >
        <TextInput
          placeholder="Seach for Items or Store"
          editable
          multiline
          numberOfLines={2}
          style={{ padding: 5 }}
        />
        <AntDesign
          name="search1"
          size={24}
          style={{
            position: "absolute",
            right: 0,
            marginRight: SIZES.padding,
            color: COLORS.secondary,
          }}
        />
      </View>
    );
  }

  function renderCarousel() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <SliderBox
          images={images}
          circleloop
          autoPlay
          sliderBoxHeight={200}
          ImageComponentStyle={{
            width: "94%",
            borderRadius: 6,
          }}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 15,
            marginHorizontal: 10,
            padding: 0,
            margin: 0,
          }}
        />
      </View>
    );
  }

  function renderServices() {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ ...FONTS.h3 }}>Services Available</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {serviceData.map((item, key) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={key}
              style={{
                backgroundColor: COLORS.white,
                margin: SIZES.padding,
                padding: SIZES.padding * 2,
                borderRadius: 7,
                alignItems: "center",
                ...styles.shadow,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 70, height: 70 }}
              />
              <Text style={{ textAlign: "center", ...FONTS.body3 }}>
                {item.name}{" "}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  function renderProductService() {
    return (
      <View style={{ padding: SIZES.padding }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {product.map((item, key) => (
            <DressItem item={item} key={key} />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={{ marginTop: SIZES.padding * 5 }}>
        {renderHeader()}
        {renderTextInput()}
        {renderCarousel()}
        {renderServices()}
        {renderProductService()}
      </ScrollView>
      {totalPrice === 0 ? null : (
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: SIZES.padding2 * 2,
            margin: SIZES.padding * 1.5,
            backgroundColor: COLORS.cartBackground,
            borderRadius: SIZES.radius,
            padding: SIZES.padding,
          }}
        >
          <View>
            <Text style={{ ...FONTS.h4, color: "white" }}>
              {cart.length} Items | {totalPrice}
            </Text>
            <Text style={{ ...FONTS.p, color: "white" }}>
              Extra Charges May Apply!
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate("picking")}>
            <Text style={{ ...FONTS.h4, color: "white" }}>Proceed to cart</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

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

    elevation: 12,
  },
});
