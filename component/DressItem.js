import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import React from 'react'
import {
    images,
    FONTS,
    SIZES,
    COLORS,

  } from "./../constants";
  import { useDispatch, useSelector, } from "react-redux";
  
import { decrementQit, decrementQty, incrementQty } from "../Redux/ProductReducer";
import { addToCart, decrementQuantity, incrementQuantity } from "../Redux/CartReducer";

const DressItem = ({item}) => {

    const cart=useSelector((state)=>state.cart.cart);
    const product=useSelector((state)=>state.product.product);
    const dispatch=useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart(item));
        dispatch(incrementQty(item));
      };




  return (
    <View
    
    style={{
      backgroundColor: COLORS.white,

      paddingVertical: SIZES.padding * 2,
      margin: 10,
      borderRadius: 7,
      justifyContent: "space-around",
      flexDirection: "row",
      alignItems: "center",
      ...styles.shadow,
    }}
  >
    <Image
      source={{ uri: item.image }}
      style={{ width: 50, height: 50 }}
    />
    <View>
      <Text style={{ ...FONTS.h3 }}>{item.name} </Text>
      <Text style={{ ...FONTS.h4 }}>{item.price}$</Text>
    </View>

    {cart.some((c) => c.id === item.id) ? (
      <Pressable
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          paddingVertical: 5,
        }}
      >
        <Pressable
         onPress={()=>{
            {
                dispatch(decrementQuantity(item))
               dispatch(decrementQty(item))
               
            }
           
         }}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderColor: "#BEBEBE",
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.body2,
              color: "#088F8F",
              paddingHorizontal: 6,
              textAlign: "center",
            }}
          >
            -
          </Text>
        </Pressable>

        <Pressable>
          <Text style={{...FONTS.body2}}>{item.quantity}</Text>
        </Pressable>

        <Pressable
        onPress={()=>{dispatch(incrementQuantity(item))
        dispatch(incrementQty(item))}}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderColor: "#BEBEBE",
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.body2,
              color: "#088F8F",
              paddingHorizontal: 6,
              textAlign: "center",
            }}
          >
            +
          </Text>
        </Pressable>
      </Pressable>
    ) : (
      <Pressable
        onPress={addItemToCart}
        style={{
          width: 80,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: COLORS.darkgray,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.green }}>Add</Text>
      </Pressable>
    )}
  </View>
  )
}

export default DressItem

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