"use client";
import React from "react";
import "./page.css";
import Header from "@/components/Header";
import { useStore } from "../../../store/store";
import { redirect } from "next/navigation";

const Page = () => {
  const { auth } = useStore();
  if (!auth) {
    redirect("/login");
  }
  return (
    <>
      <Header />
    </>
  );
};

export default Page;
