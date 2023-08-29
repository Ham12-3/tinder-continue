import React, { createContext, useContext, useEffect, useState } from "react";

import { ActivityIndicator, View, Text } from "react-native";
import { auth } from "../firebase";
// import * as Google from "expo-google-app-auth";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = createContext({});

// const config = {
//   androidClientId:
//     "288801621989-sdsjqs8vn9osn1aje5s8slqqfba4uhot.apps.googleusercontent.com",
//   iosClientId:
//     "288801621989-kljhh2pt9d1t8h5em7nk2e0b9f4fcvl5.apps.googleusercontent.com",
//   scopes: ["profile", "email"],
//   permissions: ["public_profile", "email", "gender", "location"],
// };

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  //   const signInWithGoogle = async () => {
  //     await Google.logInAsync(config).then(async (logInResult) => {
  //       if (logInResult.type === "success") {
  //         //login....
  //       }
  //     });
  //   };

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "288801621989-sdsjqs8vn9osn1aje5s8slqqfba4uhot.apps.googleusercontent.com",
    iosClientId:
      "288801621989-kljhh2pt9d1t8h5em7nk2e0b9f4fcvl5.apps.googleusercontent.com",
    expoClientId:
      "288801621989-r8kio9g2ie8e02elejs4jp8302gb4sj2.apps.googleusercontent.com",
  });
  console.log(response);
  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log("user not authenticated");
      }
    });
    return unsub();
  }, []);
  useEffect(() => {
    if (response?.type === "success") {
      //login....
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user: "Sonny",
        promptAsync,
      }}
    >
      {/* {!loadingInitial && */}
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
