import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  ArrowRightIcon,
  ArrowRightCircleIcon,
} from "react-native-heroicons/solid";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";
// import "react-native-url-polyfill/auto";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'featured' && _id == $id]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type->{...,}
          }
        }[0]`,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);

  return (
    <View style={tw`mx-4`}>
      <View style={tw`flex-row mt-4 justify-between items-center`}>
        <View>
          <Text style={tw`font-bold text-lg`}>{title}</Text>
          <Text style={tw`text-xs text-gray-500`}>{description}</Text>
        </View>
        <ArrowRightCircleIcon color="#00CCBB" opacity={0.45} size={40} />
      </View>

      <ScrollView
        style={tw`mt-4`}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* RestaurantCard */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating.toFixed(1)}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
