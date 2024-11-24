"use client";
import "./styles/Header.css";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import ProfileNav from "./ProfileNav";
import Image from "next/image";
import { initializeSocket } from "@/res/socket";
import { MainDomain } from "@/res/domains";

const Header = () => {
  const { user, getProfileAvatars, updateUserStatus } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [connected, setIsConnected] = useState(false);

  const socket = initializeSocket(MainDomain);

  // check if user is connected to the server
  socket.on("connect", () => {
    // console.log(`socket connected: ${socket.connected}`);
    if (user?._id) {
      // Emit the user's _id when connected
      socket.emit("active", user._id);

      if (socket.connected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    } else {
      console.warn("User ID is not available for socket emission.");
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });

  useEffect(() => {
    if (connected) {
      updateUserStatus(user?._id, "online");
    }
  }, [connected]);

  // get avatars on mount
  useEffect(() => {
    getProfileAvatars();
  }, [getProfileAvatars]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="headerContainer">
      {/* greeting div */}
      <div>
        <span id="greetingTxt">Hello,</span>
        <p id="userName">
          {"\u00A0"}
          {user?.userName}
        </p>
      </div>
      <Image
        onClick={toggleNav}
        src={
          user?.profileImg ||
          "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1732177776/wizard_4472179_fvv4gr.png"
        }
        alt="profile"
        className="profile-img"
        width={200}
        height={200}
      />
      <ProfileNav isOpen={isOpen} toggleNav={toggleNav} />
    </div>
  );
};

export default Header;
