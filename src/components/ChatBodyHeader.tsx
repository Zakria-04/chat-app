"use client";
import React, { useState } from "react";
import styles from "./styles/ChatBodyHeader.module.css";
import { useStore } from "../../store/store";
import NewChatModal from "./modals/NewChatModal";
const ChatBodyHeader = () => {
  const { createChat } = useStore();
  const [isOpen, setIsOpen] = useState(true);
  const handleBtn = () => {};
  return (
    <div className={styles.container}>
      <input type="text" />
      <button onClick={handleBtn}>New Chat</button>
      {isOpen && <NewChatModal />}
    </div>
  );
};

export default ChatBodyHeader;
