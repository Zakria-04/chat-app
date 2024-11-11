import FormInput from "@/components/FormInput";
import React from "react";
import "./page.css"

const page = () => {
  return (
    <>
      <p id="logStatusTxt">register</p>
      <div id="loginContainer">
        <FormInput logStatus="register" />
      </div>
    </>
  );
};

export default page;
