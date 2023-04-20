import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { urlFor } from "../sanity";
import { XMarkIcon } from "react-native-heroicons/outline";
import Currency from "react-currency-formatter";
import MinusPlusButton from "./MinusPlusButton";

const DishPopUp = ({
  selected_id,
  selected_name,
  selected_description,
  selected_price,
  selected_image,
  setLongSelected,
  items,
  addItemToBasket,
  removeItemFromBasket,
}) => {
  const [modalStatus, setModalStatus] = useState(true);
  const closePopUpModal = () => {
    setModalStatus(false);
    setLongSelected(false);
  };

  return (
    <Modal
      statusBarTranslucent={true}
      animationType="fade"
      transparent={true}
      visible={modalStatus}
      onRequestClose={closePopUpModal}
    >
      <View
        onStartShouldSetResponder={closePopUpModal}
        style={tw`bg-[#000000aa] flex-1 justify-center items-center`}
      >
        <View
          style={tw`bg-white w-6/7 max-w-screen-sm rounded-md shadow-xl shadow-white`}
        >
          <View>
            {selected_image && (
              <Image
                style={tw`relative w-full h-54 bg-gray-400 rounded-t-md`}
                source={{
                  uri: urlFor(selected_image).url(),
                }}
              />
            )}

            <TouchableOpacity
              onPress={closePopUpModal}
              style={tw`absolute right-3 top-3 p-1.5 bg-white rounded-full`}
            >
              <XMarkIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>
          <View style={tw`px-5 mt-4 mb-4`}>
            <Text style={tw`font-bold text-xl mb-4`}>{selected_name}</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-gray-600 mb-4 flex-1`}>
                {selected_price && (
                  <Currency quantity={selected_price} currency="TWD" />
                )}
              </Text>
              <MinusPlusButton
                items={items}
                addItemToBasket={addItemToBasket}
                removeItemFromBasket={removeItemFromBasket}
              />
            </View>
            {selected_description && (
              <Text
                style={tw`text-sm text-gray-400 pt-4 border-t border-gray-100`}
              >
                {selected_description}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DishPopUp;
