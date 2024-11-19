import React, { useState } from "react";
import "./styles/ProfileNav.css";
import Image from "next/image";
import profile from "../assets/images/user.png";
import editing from "../assets/images/editing.png";
import exit from "../assets/images/exit.png";
import { useStore } from "../../store/store";
import EditForm from "./EditForm";
import ProfileAccount from "./ProfileAccount";

interface ProfileNavProps {
  isOpen: boolean;
  toggleNav: () => void;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ isOpen, toggleNav }) => {
  const { user } = useStore();

  return (
    <div className={`profile-nav ${isOpen ? "open" : ""}`}>
      <div id="nav-header">
        <Image src={profile} alt="profile-image" id="profile-img" />
        <Image onClick={toggleNav} src={exit} alt="exit" id="exit-nav" />
      </div>
      <hr />
      <p className="profile-section">profile</p>
      <EditForm />
      <hr />
      <p className="profile-section">account</p>
      <ProfileAccount />
      <hr />
      <div className="test">
        <button id="sign-out-btn">sign out</button>
      </div>
    </div>
  );
};

export default ProfileNav;
