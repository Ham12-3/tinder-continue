import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";

const ModalScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  //   const updateUserProfile = () => {
  //     setDoc(doc(db, "users", user.uid), {
  //       id: user.uid,
  //       displayName: user.displayName,
  //       photoURL: image,
  //       job: job,
  //       age: age,
  //       timestamp: serverTimestamp(),
  //     })
  //       .then(() => {
  //         navigation.navigate("Home");
  //       })
  //       .catch((error) => {
  //         alert(error.message);
  //       });
  //   };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center pt-1">
        <Image
          className="h-20 w-full"
          resizeMode="contain"
          source={{
            uri: "data:image/png;base64,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",
          }}
        />
        <Text className="text-xl text-gray-500 p-2 font-bold">
          Welcome Abdul Sonaike
        </Text>

        <Text className="text-center p-4 font-bold text-red-400">
          Setp 1: The Profile Pic
        </Text>
        <TextInput
          value={image}
          onChangeText={(text) => setImage(text)}
          placeholder="Enter a Profile Pic URL"
        />

        <Text className="text-center p-4 font-bold text-red-400">
          Setp 2: Your Job
        </Text>
        <TextInput
          value={job}
          onChangeText={(text) => setJob(text)}
          placeholder="Enter your occupation"
        />
        <Text className="text-center p-4 font-bold text-red-400">
          Setp 3: Age
        </Text>
        <TextInput
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholder="Enter your age"
          maxLength={2}
          keyboardType="numeric"
        />
        <TouchableOpacity
          disabled={incompleteForm}
          //   onPress={updateUserProfile}
          className="w-64 p-3 rounded-xl absolute bottom-10 bg-red-400"
          style={incompleteForm && { backgroundColor: "#A1A1AA" }}
        >
          <Text className="text-center text-white text-xl">Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ModalScreen;
