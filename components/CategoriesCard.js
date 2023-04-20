import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { urlFor } from "../sanity";

const CategoriesCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity style={tw`w-20 mr-2 bg-white shadow mb-0.3 rounded`}>
      <Image
        style={tw`h-12 rounded-t`}
        source={{
          uri: urlFor(imgUrl).url(),
        }}
      />
      <View style={tw`w-20 p-1`}>
        <Text style={tw`font-bold text-xs text-gray-700`}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
