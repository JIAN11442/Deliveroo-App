import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
// import styles from "../style";
import tw from "twrnc";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { selectRestaurantInfo } from "../feature/RestaurantSlice";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurantInfo);

  // style={styles.AndroidSafeAreaStyle}

  return (
    <View style={tw`flex-1 bg-[#00CCBB]`}>
      <View>
        {/* turn back Xmark & Order Help */}
        <View style={tw`flex-row justify-between items-center p-5`}>
          <TouchableOpacity>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`font-light text-white text-lg`}>Order Help</Text>
          </TouchableOpacity>
        </View>
        {/* Delivery Time Box*/}
        <View
          style={tw`bg-white mx-5 my-2 rounded-md py-6 pl-6 pr-2 z-50 shadow-md`}
        >
          <View style={tw`flex-row`}>
            <View style={tw`flex-1 pr-5`}>
              <Text style={tw`text-base text-gray-400`}>Estimated Arrival</Text>
              <Text style={tw`text-2xl font-bold`}>45-55 Minutes</Text>
              {/* <LinearProgress
                sx={{
                  width: "80%",
                  mt: 1,
                  backgroundColor: "white",
                  border: 1,
                  borderRadius: 2,
                  borderColor: "#00CCBB",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#00CCBB",
                  },
                }}
              /> */}
            </View>
            <Image
              style={tw`w-25 h-20 mb-1`}
              source={require("../assets/delivering.gif")}
            />
          </View>
          <View style={tw`pr-4`}>
            <Text style={tw`text-gray-500`}>
              Your order at {restaurant.title} is being prepared
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryScreen;
