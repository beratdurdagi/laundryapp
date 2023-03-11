import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { images, FONTS, SIZES, COLORS } from "./../constants";
import { Ionicons } from "@expo/vector-icons";
import { decrementQty, incrementQty } from "../Redux/ProductReducer";
import { cleanCart, decrementQuantity, incrementQuantity } from "../Redux/CartReducer";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../FireBase/Firebase";

const CartScreen = () => {
  const route = useRoute();

  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart
    .map((item) => item.price * item.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userUid=auth.currentUser.uid;

  const placeOrder=async()=>{
    navigation.navigate('order');
    dispatch(cleanCart);
    await setDoc(doc(db,'users',`${userUid}`),{
      orders:{...cart},
      pickUpDetails:route.params
    }
    ,
    {
      marge:true
    }

    )
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={{ ...FONTS.body3 }}>Your Bucket</Text>
      </View>
    );
  }

  function renderCart() {
    return (
      <Pressable style={{ margin: SIZES.padding }}>
        {cart.map((item, key) => (
          <View
            key={key}
            style={{
              backgroundColor: COLORS.white,
              marginVertical: 5,
              paddingVertical: SIZES.padding,

              borderRadius: 7,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              ...styles.shadow,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 50, height: 50, marginLeft: SIZES.padding }}
            />

            {/* Button */}
            <Pressable
              style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.padding,
                margin: 7,
                alignItems: "center",
                borderWidth: 0.7,
                borderRadius: SIZES.padding,
                borderColor: COLORS.secondary,
              }}
            >
              <Pressable
                onPress={() => {
                  {
                    dispatch(decrementQuantity(item));
                    dispatch(decrementQty(item));
                  }
                }}
              >
                <Text
                  style={{
                    ...FONTS.h2,
                    color: "#088F8F",
                    paddingHorizontal: 6,
                    textAlign: "center",
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text style={{ ...FONTS.body2, marginHorizontal: 5 }}>
                  {item.quantity}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  dispatch(incrementQuantity(item));
                  dispatch(incrementQty(item));
                }}
              >
                <Text
                  style={{
                    ...FONTS.h2,
                    color: "#088F8F",
                    paddingHorizontal: 6,
                    textAlign: "center",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
            <View>
              <Text style={{ ...FONTS.h4, marginRight: SIZES.padding2 }}>
                ${item.price * item.quantity}
              </Text>
            </View>
          </View>
        ))}
      </Pressable>
    );
  }

  function renderBillingDetails() {
    return (
      <View style={{ marginHorizontal: SIZES.padding }}>
        <Text style={{ ...FONTS.h2 }}>Billing Details</Text>
        <View
          style={{
            borderRadius: SIZES.radius,
            padding: 10,
            marginTop: SIZES.padding2,
            backgroundColor: "white",
          }}
        >
          <View style={styles.detailsContainers}>
            <Text style={styles.titleGray}>Item Total</Text>
            <Text style={styles.titleGray}>${totalPrice}</Text>
          </View>
          <View
            style={{
              ...styles.detailsContainers,
              marginVertical: SIZES.padding,
            }}
          >
            <Text style={styles.titleGray}>Delivery Fee | 1.2KM</Text>
            <Text style={styles.titleGreen}>FREE</Text>
          </View>
          <View style={styles.detailsContainers}>
            <Text style={styles.titleGray}>Free Delivery on your order</Text>
          </View>

          {/* line */}
          <View style={styles.line} />

          <View
            style={{ ...styles.detailsContainers, marginTop: SIZES.padding }}
          >
            <Text style={styles.titleGray}>selected Date</Text>
            <Text style={styles.titleGreen}>{route.params.pickUpDate}</Text>
          </View>
          <View
            style={{
              ...styles.detailsContainers,
              marginVertical: SIZES.padding,
            }}
          >
            <Text style={styles.titleGray}>No Of Days</Text>
            <Text style={styles.titleGreen}>{route.params.offDays}</Text>
          </View>
          <View style={{ ...styles.detailsContainers }}>
            <Text style={styles.titleGray}>selected Pick Up Time</Text>
            <Text style={styles.titleGreen}>{route.params.selectedTimes}</Text>
          </View>

          {/* line */}
          <View style={styles.line} />

          <View
            style={{
              ...styles.detailsContainers,
              marginVertical: SIZES.padding,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>To Pay</Text>
            <Text style={{ ...FONTS.h4 }}>${totalPrice + 95}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
    <ScrollView
      style={{ marginTop: SIZES.padding * 5, marginBottom: SIZES.padding *2,backgroundColor:'white' }}
    >
      {totalPrice === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginTop: SIZES.padding * 4 }}>
            Your Cart is empyty
          </Text>
        </View>
      ) : (
        <>
          {renderHeader()}

          {/* cart container mapping */}
          {renderCart()}

          {/* Billing Details  */}
          {renderBillingDetails()}
        </>
      )}
    </ScrollView>
    {totalPrice === 0 ? null : (
        <Pressable
          style={{
            flexDirection: "row",
            marginTop:'auto',
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

          <Pressable onPress={placeOrder} >
            <Text style={{ ...FONTS.h4, color: "white" }}>Order Place</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

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

  detailsContainers: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    height: 1,
    // marginHorizontal:SIZES.base,
    backgroundColor: COLORS.gray,
    marginTop: SIZES.padding,
  },
  titleGray: {
    ...FONTS.h4,
    color: COLORS.gray,
  },
  titleGreen: {
    ...FONTS.h4,
    color: COLORS.green,
  },
});
