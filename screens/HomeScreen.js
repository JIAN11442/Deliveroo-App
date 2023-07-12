import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import styles from "../style";
import LoadingScreen from "./LoadingScreen";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Deliveroo",
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'featured']{
      ...,
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView style={styles.AndroidSafeAreaStyle}>
      <View style={tw`flex-row pb-3 items-center mx-4`}>
        <Image
          style={tw`w-7 h-7 p-6 mr-3 rounded-full bg-gray-300`}
          source={{
            uri: "https://i.ibb.co/B6bNtqh/Homepage-Logo.png",
          }}
        />
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-gray-400 text-xs`}>Deliver Now!</Text>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`font-bold text-lg pr-1`}>Current Location</Text>
            <ChevronDownIcon size={15} color="#00CCBB" />
          </View>
        </View>
        {/* UserIcon */}
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* SearchBar */}
      <View style={tw`flex-row items-center pb-2 mx-4`}>
        <View style={tw`flex-row flex-1 bg-gray-200 p-2 mr-2 items-center`}>
          <MagnifyingGlassIcon color="gray" size={20} style={tw`mr-2`} />
          <TextInput
            style={tw`text-base text-gray-500`}
            placeholder="Restaurants and cuisines"
            keyboardType="default"
            selectionColor={"gray"}
          />
        </View>
        <AdjustmentsVerticalIcon size={25} color="#00CCBB" />
      </View>
      {/* Body */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* FeaturedRow */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
