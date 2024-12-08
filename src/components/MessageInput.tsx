import React from "react";
import styles from "./styles/MessageInput.module.css";
import Image from "next/image";
import sendImg from "../assets/images/send.png";

const MessageInput = () => {
  return (
    <div className={styles.MessageInputContainer}>
      <div className={styles.inputContainer}>
        <input type="text" className={styles.messageInput} />
        <Image
          src={sendImg}
          alt="send message"
          width={40}
          height={40}
          className={styles.sendBtn}
        />
      </div>
    </div>
  );
};

export default MessageInput;
