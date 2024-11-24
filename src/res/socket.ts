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
