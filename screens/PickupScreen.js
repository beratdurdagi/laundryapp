import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView,Pressable,Alert } from "react-native";
import React, { useState } from "react";
import { SIZES,deliveryTime } from "../constants";
import { COLORS, FONTS } from "./../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import HorizontalDatePicker from "@logisticinfotech/react-native-horizontal-date-picker";
import { useNavigation } from "@react-navigation/native";

const PickupScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDeliveryTime,setSelectedDeliveryTime]= useState("");
  const [deliveryTimes, setDeliveryTime] = useState(deliveryTime)
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const totalPrice = cart
    .map((item) => item.price * item.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log(cart);




  function renderHeader() {
    return (
      <View>
        <Text style={styles.titleText}>Adress</Text>
        <TextInput
          editable
          multiline={true}
          numberOfLines={8}
          maxLength={1000}
          clearButtonMode="while-editing"
          style={{
            borderRadius: SIZES.radius,
            borderWidth: 0.8,
            margin: 10,
            fontFamily: "Roboto-Italic",
          }}
        />
      </View>
    );
  }

  function renderPickUpDates() {
    return (
      <View>
        <HorizontalDatePicker
        isShowYear={false}
          datePickerContainerStyle={{
          ...styles.container,
            ...styles.shadow
          }}
          timePickerContainerStyle={{ ...styles.container,
            ...styles.shadow }}
          yearTextStyle={{ ...FONTS.h3 }}
          yearContainerStyle={{  ...styles.container,
            ...styles.shadow }}
          timeStep={60}
          yearFormat={"YY"}
          pickerType={"datetime"}
          dayFormat={"DD"}
          monthFormat={"MMM"}
          timeFormat={"HH:mm a"}
          onDateSelected={(date) => setSelectedDate(date)}
          onTimeSelected={(time) => setSelectedTime(time)}
        />
      </View>
    );
  }

  function renderDeliveryTime(){
    return(
      <>
      <Text style={{...styles.titleText,marginTop:SIZES.padding,marginHorizontal:SIZES.padding}}>Delivery Tİme</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      
        {deliveryTimes.map(
          (item,key)=>(
            <Pressable onPress={()=>setSelectedDeliveryTime(item.name)} key={key} style={selectedDeliveryTime.includes(item.name)? {
              margin:SIZES.padding,
              
              borderRadius:7,
              borderColor:COLORS.red,
              padding:7,
              borderWidth:0.3,
              height:50,
              width:100,
              alignItems:'center'
              ,
              justifyContent:'center'
              
            }
            :
            {
              margin:SIZES.padding,
              
              borderRadius:SIZES.radius,
              borderColor:COLORS.gray,
              borderWidth:0.3,
              height:50,
              width:100,
            alignItems:'center',
            justifyContent:'center'
              

            }}>
              <Text style={{...FONTS.body3}}>{item.name}</Text>
            </Pressable>
          )
        )}
      </ScrollView>
      </>
    )
  }
  console.log(selectedDate);
  console.log(selectedTime);
  console.log(selectedDeliveryTime)
  const navigation=useNavigation();

  function checkAlert(){
    if(!selectedDeliveryTime){
      Alert.alert('Empty or Invalid', 'Plese select all the fields', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
  
    }
    else{
      navigation.replace('Cart',{
        pickUpDate:selectedDate,
        selectedTimes:selectedTime,
        offDays:selectedDeliveryTime,
      });
    }
  }
  
  return (
    <>
    <SafeAreaView style={{ flex: 1, marginTop: SIZES.padding * 5 }}>
      {renderHeader()}
      {renderPickUpDates()}
      {renderDeliveryTime()}
    </SafeAreaView>
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

          <Pressable onPress={()=>{checkAlert()}}>
            <Text style={{ ...FONTS.h4, color: "white" }}>Proceed to cart</Text>
          </Pressable>
        </Pressable>
      )}
    </>
    
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  titleText: {
    marginHorizontal: SIZES.padding,
    ...FONTS.h3,
  },
  container: {
    backgroundColor: COLORS.lightGray,
  borderRadius: SIZES.radius,
  marginHorizontal: SIZES.padding,
  marginTop: SIZES.padding,
  borderWidth: 0.3,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 5,
  },
});
