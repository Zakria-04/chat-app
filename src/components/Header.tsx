"use client";
import "./styles/Header.css";
import React from "react";
import { useStore } from "../../store/store";
import Image from "next/image";
import profile from "../assets/images/user.png";

const Header = () => {
  const { user } = useStore();

  return (
    <div id="headerContainer">
      <div>
        <span id="greetingTxt">Hello,</span>
        <p id="userName">{'\u00A0'}{user?.userName}</p>
      </div>
      <Image src={profile} alt="profile" width={50} height={50} />
    </div>
  );
};

export default Header;
