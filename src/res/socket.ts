import { io } from "socket.io-client";
import { MainDomain } from "./domains";

const socket = io(MainDomain);

export const initializeSocket = (url: string) => {
  const socket = io(url);
  return socket;
};

export const updateStatus = (
  _id: string | undefined,
  status: string | undefined
) => {
  socket.emit("status-change", _id, status);
};

export const renderUserChatMessages = (userID: string | undefined) => {
  socket.emit("get_user_chat", userID);
  // socket.on("user_chat_response", (data) => {
  
  // });
};

export const getTest = () => {
  return socket
}

export const getMessages = () => {
  return socket
}