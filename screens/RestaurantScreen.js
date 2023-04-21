import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import tw from "twrnc";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import {
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems } from "../feature/BasketSlice";
import BasketTotalBar from "../components/BasketTotalBar";
import { setRestaurant } from "../feature/RestaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);
  const {
    params: {
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
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Deliveroo : ${title}`,
      headerShown: false,
    });
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <>
      {items.length === 0 ? null : <BasketTotalBar />}
      <ScrollView style={tw`${items.length === 0 ? `pb-36` : `pb-0`}`}>
        {/* Main Image */}
        <View style={tw`relative`}>
          <Image
            style={tw`w-full h-56`}
            source={{
              uri: urlFor(imgUrl).url(),
            }}
          />
          <TouchableOpacity
            style={tw`absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon color="#00CCBB" size={20} />
          </TouchableOpacity>
        </View>
        {/* Information  of Restaurant*/}
        <View style={tw`bg-white`}>
          <View style={tw`px-4 pt-4`}>
            <Text style={tw`text-3xl font-bold mb-1`}>{title}</Text>
            <View style={tw`flex-row`}>
              <StarIcon
                color="green"
                opacity={0.5}
                size={18}
                style={tw`mr-2`}
              />
              <Text style={tw`text-gray-400 text-xs`}>
                <Text style={{ color: "green", fontWeight: "400" }}>
                  {rating}
                </Text>{" "}
                · {genre}
              </Text>
            </View>
            <View style={tw`flex-row mb-1`}>
              <MapPinIcon
                size={18}
                color="gray"
                opacity={0.5}
                style={tw`mr-2`}
              />
              <View style={tw`flex-1`}>
                <Text style={tw`text-xs text-gray-400`}>
                  Nearby · {address}
                </Text>
              </View>
            </View>
            <Text style={tw`text-gray-500 mt-1 pb-4 pl-1 leading-5`}>
              {short_description}
            </Text>
          </View>
        </View>
        {/* Question Box */}
        <TouchableOpacity
          style={tw`bg-white p-4 border-t border-gray-100 flex-row items-center`}
        >
          <QuestionMarkCircleIcon color="gray" opacity={0.6} size={22} />
          <Text style={tw`font-bold text-sm pl-2 flex-1`}>
            Have a food allergy?
          </Text>
          <ChevronRightIcon color="#00CCBB" size={20} />
        </TouchableOpacity>
        {/* Menu Title */}
        <View>
          <Text style={tw`px-4 pt-6 mb-3 font-bold text-xl`}>Menu</Text>
        </View>
        {/* DishRow */}
        {dishes?.map((dish) => (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
