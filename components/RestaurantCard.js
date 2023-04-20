import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import tw from "twrnc";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../feature/RestaurantSlice";
import { selectBasketItems } from "../feature/BasketSlice";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
        dispatch(
          setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
          })
        );
      }}
      style={tw`mr-3 bg-white shadow w-64 mb-0.5`}>
      <Image
        style={tw`h-36 rounded-sm`}
        source={{
          uri: urlFor(imgUrl).url(),
        }}
      />
      <View style={tw`pb-4 px-3`}>
        <Text style={tw`text-lg font-bold pt-2 pb-1`}>{title}</Text>
        <View style={tw`flex-row items-center pb-1`}>
          <StarIcon color="green" opacity={0.5} size={18} style={tw`mr-2`} />
          <Text style={tw`text-gray-500 text-xs`}>
            <Text style={{ color: "green", fontWeight: "400" }}>{rating}</Text>{" "}
            · {genre}
          </Text>
        </View>
        <View style={tw`flex-row`}>
          <MapPinIcon size={18} color="gray" opacity={0.5} style={tw`mr-2`} />
          <View style={tw`flex-1`}>
            <Text style={tw`text-xs text-gray-500`}>Nearby · {address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
