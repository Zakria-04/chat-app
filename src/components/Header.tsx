"use client";
import "./styles/Header.css";
import React, { useState } from "react";
import { useStore } from "../../store/store";
import { io } from "socket.io-client";
import ProfileNav from "./ProfileNav";
import EditForm from "./EditForm";
import Image from "next/image";
import profile from "../assets/images/user.png";

const Header = () => {
  const { user } = useStore();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // const socket = io("http://localhost:8080");
  const socket = io("https://chat-server-btsf.onrender.com");

  socket.on("connect", () => {
    // check if socket is connected
    console.log(`socket connected ${socket.connected}`);

    // send the _id from user mongoDB
    socket.emit("active", user?._id);
  });

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
        src={profile}
        alt="profile"
        className="profile-img"
      />
      <ProfileNav isOpen={isOpen} toggleNav={toggleNav} />
    </div>
  );
};

export default Header;
