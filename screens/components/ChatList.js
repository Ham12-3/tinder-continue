import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import ChatRow from "./ChatRow";
const ChatList = () => {
  //   const [matches, setMatches] = useState([]);
  //   const { user } = useAuth();
  //   useEffect(() => {
  //     onSnapshot(
  //       query(
  //         collection(db, "matches"),
  //         where("userMatched", "array-contains", use.uid)
  //       ),
  //       (snapshot) =>
  //         setMatches(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             ...doc.data(),
  //           }))
  //         )
  //     );
  //   }, [user]);

  return (
    <View className="">
      <ChatRow />
    </View>
  );
};

export default ChatList;
