"use client";
import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import { redirect } from "next/navigation";
import LoadingItem from "@/components/LoadingItem";

const Page = () => {
  const { checkIfServerLiveFromAPI, isLoading, live } = useStore();
  useEffect(() => {
    checkIfServerLiveFromAPI();
  }, [checkIfServerLiveFromAPI]);

  console.log("server is live", live);

  useEffect(() => {
    if (live) {
      redirect("/login");
    }
  }, [live]);

  return (
    <>
      <div id="authorize_details">
        <h1>Chat-App</h1>
        <p>by zakaria</p>
      </div>
      {isLoading && <LoadingItem />}
    </>
  );
};

export default Page;
