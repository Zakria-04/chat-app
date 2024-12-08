import { getUserChatFromDB } from "@/res/api";
import axios from "axios";
import styles from "./page.module.css";
import ChatHeader from "@/components/ChatHeader";
import { initializeSocket } from "@/res/socket";
import { MainDomain } from "@/res/domains";
import MessageBody from "@/components/MessageBody";
import MessageInput from "@/components/MessageInput";

interface SearchParams {
  userID: string;
  chatID: string;
  chatName: string;
  chatProfile: string;
}

interface MessageParams {
  searchParams: SearchParams;
}

const page: React.FC<MessageParams> = ({ searchParams }) => {
  // const [chat, setChat] = useState<any>([]);

  const getCurrentChat = async () => {
    try {
      const x = {
        chatID: searchParams.chatID,
        userID: searchParams.userID,
      };
      const getChat = await getUserChatFromDB(x);
      // setChat(getChat.findChat);
    } catch (error) {
      console.error("error", error);
    }
  };

  // useEffect(() => {
  //   getCurrentChat();
  // }, []);

  // console.log("chat is", chat);

  // const socket = initializeSocket(MainDomain);

  // socket.emit("getChatID", searchParams.chatID);

  return (
    <>
      <ChatHeader
        chatID={searchParams.chatID}
        userID={searchParams.userID}
        chatName={searchParams.chatName}
        chatProfile={searchParams.chatProfile}
      />
      {/* {chat.map((chat: any) => (
        <div className={styles.chatContainer}>
          <p id={styles.message}>{chat.message}</p>
        </div>
      ))} */}
      <MessageBody
        chatID={searchParams.chatID}
        userID={searchParams.userID}
        chatName={searchParams.chatName}
      />
      <MessageInput />
    </>
  );
};

export default page;
