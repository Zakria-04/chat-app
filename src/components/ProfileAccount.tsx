import React, { useEffect, useState } from "react";
import "./styles/ProfileAccount.css";
import { useStore } from "../../store/store";

const ProfileAccount = () => {
  const { user, updateUserStatus } = useStore();
  const [status, setStatus] = useState(user?.status);


  useEffect(() => {
    if (user?.status) {
      setStatus(user.status);
    }
  }, [user]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const changeStatus = () => {
    // updateStatus(user?._id, status);
    if (user) {
      updateUserStatus(user._id, status);
    }
  };

  return (
    <div>
      <div id="account-nav">
        <div>
          <label>status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            onClick={changeStatus}
          >
            <option value={"online"}>online</option>
            <option value={"away"}>away</option>
          </select>
        </div>
        <div
          className={`status ${status === "online" ? "online" : "away"}`}
        ></div>
      </div>
      <p className="account-status">
        You can set your availability status to Online or Away, allowing others
        to see whether you are currently available.
      </p>
    </div>
  );
};

export default ProfileAccount;
