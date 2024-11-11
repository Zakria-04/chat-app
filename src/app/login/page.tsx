import "./page.css";
import FormInput from "@/components/FormInput";
import React from "react";

const page = () => {
  return (
    <>
      <p id="logStatusTxt">Login</p>
      <div id="loginContainer">
        <FormInput logStatus="login" />
      </div>
    </>
  );
};

export default page;
