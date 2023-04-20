import { TouchableOpacity, View, Text } from "react-native";
import tw from "twrnc";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const MinusPlusButton = ({ items, addItemToBasket, removeItemFromBasket }) => {
  return (
    <View style={tw`flex-row items-center gap-2 pb-3`}>
      <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
        <MinusCircleIcon size={40} color={items.length ? "#00CCBB" : "gray"} />
      </TouchableOpacity>
      <Text>{items.length}</Text>
      <TouchableOpacity onPress={addItemToBasket}>
        <PlusCircleIcon size={40} color="#00CCBB" />
      </TouchableOpacity>
    </View>
  );
};

export default MinusPlusButton;
