import { View, Text } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={{ alignSelf: "flex-start", marginLeft: "auto" }}
      className="bg-purple-600 rounded-lg rounded-tr-noen px-5 py-3 mx-3 my-2"
    >
      <Text className="text-white">Message</Text>
    </View>
  );
};

export default SenderMessage;
