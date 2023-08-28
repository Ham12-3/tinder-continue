import React, { createContext, useContext, useEffect } from "react";

import { View, Text } from "react-native";

// import * as Google from "expo-google-app-auth";
import * as Google from "expo-auth-session/providers/google";

const AuthContext = createContext({});

const config = {
  androidClientId:
    "288801621989-sdsjqs8vn9osn1aje5s8slqqfba4uhot.apps.googleusercontent.com",
  iosClientId:
    "288801621989-kljhh2pt9d1t8h5em7nk2e0b9f4fcvl5.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
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
  });
  useEffect(() => {
    if (response?.type === "success") {
      //login....
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user: null,
        promptAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
