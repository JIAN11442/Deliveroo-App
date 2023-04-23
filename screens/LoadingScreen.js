import { View, Text, Modal } from "react-native";
import React from "react";
import tw from "twrnc";

const LoadingScreen = () => {
  return (
    <Modal>
      <View style={tw`flex-1 bg-[#00CCBB] items-center justify-center z-10`}>
        <Text>LoadingScreen</Text>
      </View>
    </Modal>
  );
};

export default LoadingScreen;
