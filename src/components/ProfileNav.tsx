import React, { useState } from "react";
import "./styles/ProfileNav.css";
import Image from "next/image";
import exit from "../assets/images/exit.png";
import { useStore } from "../../store/store";
import EditForm from "./EditForm";
import ProfileAccount from "./ProfileAccount";
import ProfileImgsModal from "./modals/ProfileImgsModal";

interface ProfileNavProps {
  isOpen: boolean;
  toggleNav: () => void;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ isOpen, toggleNav }) => {
  const { user, signoutUser } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`profile-nav ${isOpen ? "open" : ""}`}>
      <div id="nav-header">
        <Image
          onClick={() => setIsModalOpen(!isModalOpen)}
          src={
            user?.profileImg ||
            "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1732177776/wizard_4472179_fvv4gr.png"
          }
          alt="profile"
          className="profile-img"
          width={200}
          height={200}
        />
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
        <button onClick={signoutUser} id="sign-out-btn">
          sign out
        </button>
      </div>

      {/* profile-image modal */}
      {isModalOpen && (
        <ProfileImgsModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default ProfileNav;
