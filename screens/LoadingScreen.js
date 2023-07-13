import { View, Text, Modal } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";
// import { CircularProgress } from "@mui/material/CircularProgress";
import { ActivityIndicator } from "@react-native-material/core";

const LoadingScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 3000);
  }, []);

  return (
    <View style={tw`flex-1 bg-[#00CCBB] items-center justify-center z-10`}>
      <Animatable.Image
        source={require("../assets/loadingGif.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={tw`h-90 w-90`}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={tw`text-base my-10 text-white font-bold text-center`}
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      {/* Progress Circular */}
      <ActivityIndicator size={60} color="white" />
    </View>
  );
};

export default LoadingScreen;
