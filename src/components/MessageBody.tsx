"use client";
import { getMessages } from "@/res/socket";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import styles from "./styles/MessageBody.module.css";

interface MessageBodyProps {
  userID: string;
  chatID: string;
  chatName: string;
}

const MessageBody: React.FC<MessageBodyProps> = (props) => {
  const [messages, setMessages] = useState([]);
  const { user, chats } = useStore();

  useEffect(() => {
    const msgs = getMessages();
    msgs.emit("get_user_messages", props.chatID, props.userID);
    msgs.on("user_message_response", (data) => {
      setMessages(data);
    });
  }, [user]);

  console.log(messages);

  if (messages.length === 0) {
    return (
      <div className={styles.noChatMessage}>
        <p>You don't have any chat with user {props.chatName}</p>
      </div>
    );
  }

  return (
    <div>
      {messages.map((msg: any) => (
        <div key={msg._id} id={styles.messageContainer}>
          <div
            className={
              msg.senderID === user?._id ? styles.senderMsg : styles.receiverMsg
            }
          >
            <p>{msg.message}</p>
            <p>{msg.timeStamp.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageBody;
