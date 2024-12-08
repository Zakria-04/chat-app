import React, { useRef, useState } from "react";
import styles from "./style/NewChatModal.module.css";
import { createNewUserChat } from "@/res/api";

const NewChatModal = () => {
  const [participants, setParticipants] = useState<any>([]);
  const [participantsInput, setParticipantsInput] = useState("");
  const [chatID, setChatID] = useState("");

  const addParticipants = () => {
    let addNewParticipant = participants;
    addNewParticipant.push(participantsInput);
    setParticipants(addNewParticipant);
    setParticipantsInput("");
  };

  const handleCreateNewChat = () => {
    const body = {
      chatID: chatID,
      participants: participants,
    };
    createNewUserChat(body);
    setParticipants([]);
    setChatID("");
  };

  return (
    <div className={styles.container}>
      <div>
        <label>Chat ID</label>
        <input type="text" onClick={(e: any) => setChatID(e.target.value)} />
        <div>
          <label>participants id</label>
          <input
            type="text"
            value={participantsInput}
            onChange={(e) => setParticipantsInput(e.target.value)}
          />
          {participants.map((users: any, index: string) => (
            <div key={index} className={styles.participantsContainer}>
              <p>{users}</p>
            </div>
          ))}
          <button onClick={addParticipants}>Add</button>
        </div>
        <div>
          <button>cancel</button>
          <button onClick={handleCreateNewChat}>create</button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
