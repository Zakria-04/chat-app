import React, { SetStateAction, useState } from "react";
import "./style/ProfileImgsModal.css";
import Image from "next/image";
import { useStore } from "../../../store/store";
interface ProfileImgsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ProfileImgsModal: React.FC<ProfileImgsModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { avatar, user, updateAvatar } = useStore();
  const [profileAvatar, setProfileAvatar] = useState<string>(
    user?.profileImg as string
  );

  const handleProfileAvatarChange = () => {
    const body = {
      _id: user?._id as string,
      profileImg: profileAvatar,
    };
    updateAvatar(body);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div id="ProfileImgsModal">
      <div id="modal">
        <div id="modal-avatars">
          {avatar.map((item, index) => (
            <div key={index}>
              <div
                id={profileAvatar === item ? "selectedImg" : "unSelectedImg"}
              >
                <Image
                  key={index}
                  onClick={() => setProfileAvatar(item)}
                  src={item}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="avatar"
                />
              </div>
              {user?.profileImg === item && (
                <p id="selected-avatar">selected</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => handleProfileAvatarChange()}
          id="save-profile-img-btn"
        >
          save
        </button>
      </div>
    </div>
  );
};

export default ProfileImgsModal;
