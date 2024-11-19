import React, { useRef, useState } from "react";
import "./styles/ProfileAccount.css";
import { useStore } from "../../store/store";

const ProfileAccount = () => {
  const { user } = useStore();
  const [status, setStatus] = useState(user?.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <div id="account-nav">
        <div>
          <label>status</label>
          <select value={status} onChange={handleStatusChange}>
            <option value={"online"}>online</option>
            <option value={"away"}>away</option>
          </select>
        </div>
        <div
          className={`status ${status === "online" ? "online" : "away"}`}
        ></div>
      </div>
      <p className="account-status">
        You can set your availability status to 'Online' or 'Away,' allowing
        others to see whether you're currently available.
      </p>
    </div>
  );
};

export default ProfileAccount;
