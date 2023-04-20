import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketItemsTotalPrice,
} from "../feature/BasketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketTotalBar = () => {
  const totalPrice = useSelector(selectBasketItemsTotalPrice);
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();

  return (
    <View style={tw`absolute bottom-10 w-full z-50`}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Basket");
        }}
        style={tw`mx-6 bg-[#00CCBB] px-4 py-3 rounded-lg flex-row items-center gap-2`}>
        <Text
          style={tw`bg-[#01A296] py-1 px-2 text-white font-bold text-lg rounded-lg`}>
          {items.length}
        </Text>
        <Text style={tw`text-white font-bold text-lg flex-1 text-center`}>
          View Basket
        </Text>
        <Text style={tw`text-white font-bold text-lg`}>
          <Currency quantity={totalPrice} currency="TWD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketTotalBar;
