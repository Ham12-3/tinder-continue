import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Header from "./components/Header";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {};
  return (
    <SafeAreaView className="flex-1">
      <Header title="Elon Musk" callEnabled />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View className="bg-white flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
        <TextInput
          style={{}}
          className="h-10 text-lg"
          placeholder="Send Message..."
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />
        <Button onPress={sendMessage} title="Send" color="#FF5864" />
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
