import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Currency from "react-currency-formatter";
import { Image } from "react-native";
import { urlFor } from "../sanity";
import DishPopUp from "./DishPopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../feature/BasketSlice";
import MinusPlusButton from "./MinusPlusButton";

const DishRow = ({ id, name, description, price, image }) => {
  const [longSelected, setLongSelected] = useState(false);
  const [shortSelected, setShortSelected] = useState(false);
  const [selectedDish, setSelectedDish] = useState([]);
  const longPress = () => {
    setLongSelected(true);
    setSelectedDish({ id, name, description, price, image });
  };

  // Redux
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasket = () => {
    if (!items.length) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        delayLongPress={150}
        onLongPress={longPress}
        onPress={() => {
          setShortSelected(!shortSelected);
        }}
        style={tw`p-4 bg-white border-b border-gray-200 rounded ${
          shortSelected ? "border-b-0" : ""
        }`}
      >
        <View style={tw`flex-row`}>
          <View style={tw`flex-1 mr-10`}>
            <Text style={tw`text-base mb-1`}>{name}</Text>
            <Text style={tw`text-gray-400`}>{description}</Text>
            <Text style={tw`text-gray-400 mt-2`}>
              <Currency quantity={price} currency="TWD" />
            </Text>
          </View>
          <View>
            <Image
              style={tw`h-30 w-30`}
              source={{
                uri: urlFor(image).url(),
              }}
            />
          </View>
        </View>
        {longSelected && selectedDish && (
          <DishPopUp
            selected_id={selectedDish.id}
            selected_name={selectedDish.name}
            selected_description={selectedDish.description}
            selected_price={selectedDish.price}
            selected_image={selectedDish.image}
            setLongSelected={setLongSelected}
            items={items}
            addItemToBasket={addItemToBasket}
            removeItemFromBasket={removeItemFromBasket}
          />
        )}
      </TouchableOpacity>
      {shortSelected && (
        <View style={tw`bg-white px-4 border-b -border-gray-200`}>
          <MinusPlusButton
            items={items}
            addItemToBasket={addItemToBasket}
            removeItemFromBasket={removeItemFromBasket}
          />
        </View>
      )}
    </>
  );
};

export default DishRow;
