import { getUserChatFromDB } from "@/res/api";
import axios from "axios";
// import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ChatHeader from "@/components/ChatHeader";
import { initializeSocket } from "@/res/socket";
import { MainDomain } from "@/res/domains";

interface SearchParams {
  userID: string;
  chatID: string;
}

interface MessageParams {
  searchParams: SearchParams;
}

const page: React.FC<MessageParams> = ({ searchParams }) => {
  // const [chat, setChat] = useState<any>([]);

  const getCurrentChat = async () => {
    try {
      const x = {
        chatID: searchParams.chatID,
        userID: searchParams.userID,
      };
      const getChat = await getUserChatFromDB(x);
      // setChat(getChat.findChat);
    } catch (error) {
      console.error("error", error);
    }
  };

  // useEffect(() => {
  //   getCurrentChat();
  // }, []);

  // console.log("chat is", chat);

  // const socket = initializeSocket(MainDomain);

  // socket.emit("getChatID", searchParams.chatID);

  return (
    <>
      <ChatHeader chatID={searchParams.chatID} userID={searchParams.userID} />
      {/* {chat.map((chat: any) => (
        <div className={styles.chatContainer}>
          <p id={styles.message}>{chat.message}</p>
        </div>
      ))} */}
    </>
  );
};

export default page;
