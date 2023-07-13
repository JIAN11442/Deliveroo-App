import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectRestaurantInfo } from "../feature/RestaurantSlice";
import { LinearProgress } from "react-native-elements";
import MapView from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurantInfo);

  return (
    <View
      style={tw`flex-1 bg-[#00CCBB] 
      ${Platform.OS === "android" ? `mt-[${StatusBar.currentHeight}px]` : ``}`}
    >
      <View>
        {/* turn back Xmark & Order Help */}
        <View style={tw`flex-row justify-between items-center p-5`}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Basket");
            }}
          >
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`font-light text-white text-lg`}>Order Help</Text>
          </TouchableOpacity>
        </View>
        {/* Delivery Time Box*/}
        <View
          style={tw`bg-white mx-5 rounded-md
           py-6 pl-6 pr-2 shadow-md flex-row items-center justify-between`}
        >
          <View style={tw`w-50`}>
            <Text style={tw`text-base text-gray-400`}>Estimated Arrival</Text>
            <Text style={tw`text-3xl font-bold`}>45-55 Minutes</Text>
            {/* LinearProgress */}
            <View style={tw`py-2`}>
              <LinearProgress color="#00CCBB" />
            </View>
            <View>
              <Text style={tw`text-gray-500`}>
                Your order at {restaurant.title} is being prepared
              </Text>
            </View>
          </View>
          <View>
            <Image
              style={tw`w-25 h-25 mb-1`}
              source={require("../assets/delivering.gif")}
            />
          </View>
        </View>
        {/* MapView */}
        <MapView
          style={tw`flex-1`}
          mapType="standard"
          initialRegion={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.05,
          }}
        ></MapView>
      </View>
    </View>
  );
};

export default DeliveryScreen;
