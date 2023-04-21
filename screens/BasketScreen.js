import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurantInfo } from "../feature/RestaurantSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
} from "../feature/BasketSlice";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import DishPopUp from "../components/DishPopUp";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurantInfo);
  const items = useSelector(selectBasketItems);
  const [basketItemsGroup, setBasketItemsGroup] = useState([]);
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImageInfo, setSelectedImageInfo] = useState([]);
  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        id: selectedImageInfo.id,
        name: selectedImageInfo.name,
        description: selectedImageInfo.description,
        price: selectedImageInfo.price,
        image: selectedImageInfo.image,
      })
    );
  };
  const removeItemFromBasket = () => {
    if (!items.length) return;
    dispatch(removeFromBasket({ id: selectedImageInfo.id }));
  };

  console.log(selectedImageInfo);

  useMemo(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setBasketItemsGroup(groupItems);
  }, [items]);

  // console.log(basketItemsGroup);

  return (
    <>
      <View>
        <View
          style={tw`bg-white p-5 border-b border-[#00CCBB] border-opacity-30 shadow-md`}
        >
          <Text style={tw`font-bold text-lg text-center`}>Basket</Text>
          <Text style={tw`text-gray-400 text-center`}>{restaurant.title}</Text>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw`absolute top-5 right-4`}
          >
            <XCircleIcon size={45} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center my-5 bg-white px-4 py-3 gap-5`}>
          <Image
            style={tw`h-7 w-7 p-4 rounded-full bg-gray-300`}
            source={{
              uri: "https://i.ibb.co/B6bNtqh/Homepage-Logo.png",
            }}
          />
          <Text style={tw`flex-1`}>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text style={tw`text-[#00CCBB]`}>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(basketItemsGroup).map(([key, items]) => (
            <View
              key={key}
              style={tw`relative flex-row pt-3 pb-3 px-5 bg-white 
            items-center gap-3 ${
              key === Object.keys(basketItemsGroup).pop()
                ? `border-b-0`
                : `border-b border-gray-200`
            }`}
            >
              {/* Items Number */}
              {items.length > 1 && (
                <Text
                  style={tw`absolute top-1.5 left-3 z-50 px-1.5 py-1 bg-[#00CCBB] 
              text-white text-xs font-bold rounded-full`}
                >
                  {items.length}x
                </Text>
              )}
              {/* Picture & Dish Info */}
              <View style={tw`flex-row flex-1 items-center gap-3`}>
                {/* Dish Picture */}
                <TouchableOpacity
                  onPress={() => {
                    setIsSelected(true);
                    setSelectedImageInfo({
                      id: key,
                      name: items[0]?.name,
                      description: items[0]?.description,
                      price: items[0]?.price,
                      image: items[0]?.image,
                    });
                  }}
                >
                  <Image
                    style={tw`w-15 h-15 rounded-full`}
                    source={{
                      uri: urlFor(items[0]?.image).url(),
                    }}
                  />
                </TouchableOpacity>
                {/* Dish Info */}
                <View style={tw`w-2/3 gap-1`}>
                  <Text>{items[0]?.name}</Text>
                  <Text style={tw`text-gray-400`}>
                    <Currency quantity={items[0]?.price} currency="TWD" />
                  </Text>
                </View>
              </View>
              {/* Dish Total Price & Remove/Add Operation */}
              <View style={tw`items-end gap-1`}>
                {/* Total Price */}
                <Text style={tw`font-bold`}>
                  <Currency
                    quantity={items.reduce(
                      (total, item) => (total += item.price),
                      0
                    )}
                    currency="TWD"
                  />
                </Text>
                {/* Add & Remove Operation */}
                <View style={tw`flex-row gap-2.5`}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        addToBasket({
                          id: key,
                          name: items[0]?.name,
                          description: items[0]?.description,
                          price: items[0]?.price,
                          image: items[0]?.image,
                        })
                      );
                    }}
                  >
                    <Text style={tw`text-[#00CCBB] text-sm`}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(removeFromBasket({ id: key }));
                    }}
                  >
                    <Text style={tw`text-[#00CCBB] text-sm`}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {isSelected && selectedImageInfo && (
        <DishPopUp
          selected_id={selectedImageInfo.id}
          selected_name={selectedImageInfo.name}
          selected_description={selectedImageInfo.description}
          selected_price={selectedImageInfo.price}
          selected_image={selectedImageInfo.image}
          setLongSelected={setIsSelected}
          items={items.filter((item) => item.id === selectedImageInfo.id)}
          addItemToBasket={addItemToBasket}
          removeItemFromBasket={removeItemFromBasket}
        />
      )}
    </>
  );
};

export default BasketScreen;
