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
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "./components/Header";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import SenderMessage from "./components/SenderMessage";
import ReceiverMessage from "./components/ReceiverMessage";
import { FontAwesome } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
} from "@firebase/firestore";
import db from "../firebase";
const MessageScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, "matches", matchDetails.id, "messages"),
  //         orderBy("timestamp", "desc")
  //       ),
  //       (snaphot) =>
  //         setMessages(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             ...doc.data(),
  //           }))
  //         )
  //     );
  // }, [matchDetails, db]);
  const sendMessage = () => {
    // addDoc(collection(db, "matches", matchDetails.id, "messages"), {
    //   timestamp: serverTimestamp(),
    //   userId: user.uid,
    //   displayName: user.displayName,
    //   photoURL: matchDetails.users[user.uid].photoURL,
    //   message: input,
    // });
    // setInput("");
  };
  return (
    <SafeAreaView className="flex-1">
      <Header title="Elon Musk" callEnabled />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      ></KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <SenderMessage />
          <ReceiverMessage />
        </View>
      </TouchableWithoutFeedback>

      <View className="bg-white flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
        <TextInput
          style={{}}
          className="h-10 text-lg"
          placeholder="Send Message..."
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />
        {/* <Button onPress={sendMessage} title="Send" color="#FF5864" />
         */}
        <TouchableOpacity>
          <FontAwesome name="send" size={24} color="#FF5864" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
