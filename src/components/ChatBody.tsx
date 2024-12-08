"use client";
import React, { useEffect } from "react";
import styles from "./styles/ChatBody.module.css";
import Link from "next/link";
import { getTest, renderUserChatMessages } from "@/res/socket";
import { useStore } from "../../store/store";
import Image from "next/image";

const ChatBody = () => {
  const { user, userChats, chats } = useStore();

  console.log("chats are ", chats);

  useEffect(() => {
    const x = renderUserChatMessages(user?._id);
    console.log("x response ", x);
    const test = getTest();

    test.on("user_chat_response", (data) => {
      userChats(data);
    });

    console.log("it works?", test.connected);
  }, [user?._id, userChats]);

  return (
    <div className={styles.container}>
      {/* <Link
        href={{
          pathname: "/messages",
          query: { chatID: "123456789", userID: "6743462ed8a499ea80a1c7c0" },
        }}
      >
        click me
      </Link> */}
      {chats.map((chat: any) => (
        <Link
          style={{ textDecoration: "none" }}
          key={chat._id}
          href={{
            pathname: "/messages",
            query: {
              chatID: chat?.chatID,
              userID: user?._id,
              chatProfile: chat.chatProfile,
              chatName: chat.chatName,
            },
          }}
        >
          <div id={styles.chatsContainer}>
            <Image
              src={chat.chatProfile}
              alt="profile image"
              width={50}
              height={50}
            />
            <label>{chat.chatName}</label>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatBody;
