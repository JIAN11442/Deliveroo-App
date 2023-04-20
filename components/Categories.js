import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import CategoriesCard from "./CategoriesCard";
import sanityClient from "../sanity";
// import "react-native-url-polyfill/auto";

const Categories = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[(_type == 'category' && name == 'Offers')]{
          ...,
        } + *[(_type == 'category' && name != 'Offers')]{
          ...,
        }`
      )
      .then((data) => {
        setMenuCategories(data);
      });
  }, []);
  // console.log(menuCategories);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        // 猜測 paddingHorizontal == padding left
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {menuCategories?.map((category) => (
        <CategoriesCard
          key={category._id}
          imgUrl={category.image}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
