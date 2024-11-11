import "./styles/FormInputs.css";
import React from "react";

interface FormInputProps {
  logStatus: "login" | "register";
}

const FormInput: React.FC<FormInputProps> = ({ logStatus }) => {
  // render text message based on logStatus
  const logStatusMsgRender = (login: string, register: string) => {
    return logStatus === "login" ? login : register;
  };

  return (
    <>
      <form id="loginForm">
        <label>{logStatusMsgRender("UserName or Email", "UserName")}</label>
        <input type="text" />
        {logStatus === "register" && (
          <>
            <label>Email</label>
            <input type="text" />
          </>
        )}
        <label>Password</label>
        <input type="password" />
        <button id="loginBtn">
          {logStatusMsgRender("Login", "Create New Account")}
        </button>
        <p>
          {`${logStatusMsgRender(
            "not a member yet?",
            "already have an account?"
          )} `}
          <a id="loginLink" href={logStatusMsgRender("/register", "/login")}>
            {logStatusMsgRender("register", "login")}
          </a>
        </p>
      </form>
    </>
  );
};

export default FormInput;
