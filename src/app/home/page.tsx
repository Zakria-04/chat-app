import React from "react";
import "./page.css";
import Header from "@/components/Header";
// import { useStore } from "../../../store/store";
// import { redirect } from "next/navigation";
import ChatBody from "@/components/ChatBody";
import ChatBodyHeader from "@/components/ChatBodyHeader";

const Page = () => {
  // const { auth } = useStore();
  // if (!auth) {
  //   redirect("/login");
  // }
  return (
    <>
      <Header />
      {/* <ChatBodyHeader /> */}
      <ChatBody />
    </>
  );
};

export default Page;
