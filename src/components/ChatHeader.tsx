"use client";
import React, { useEffect } from "react";
import styles from "./styles/ChatHeader.module.css";
import backBtn from "../assets/images/back.png";
import Image from "next/image";
import Link from "next/link";
import { getUserChatFromDB } from "@/res/api";
import { initializeSocket } from "@/res/socket";
import { MainDomain } from "@/res/domains";

interface ChatHeaderParams {
  userID: string;
  chatID: string;
}

const ChatHeader: React.FC<ChatHeaderParams> = ({ chatID, userID }) => {
  const socket = initializeSocket(MainDomain);

  console.log(socket.connected);
  

  useEffect(() => {
    console.log("hr");
  });

  return (
    <div className={styles.container}>
      <Link href={"/home"}>
        <Image src={backBtn} alt="back-btn" className={styles.backBtn} />
      </Link>
    </div>
  );
};

export default ChatHeader;
