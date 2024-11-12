"use client";
import "./styles/FormInputs.css";
import { redirect } from "next/navigation";
import { useStore } from "../../store/store";
import React, { useEffect, useRef } from "react";
import { UserLoginProps } from "../../store/type";
import LoadingItem from "./LoadingItem";

interface FormInputProps {
  logStatus: "login" | "register";
}

const FormInput: React.FC<FormInputProps> = ({ logStatus }) => {
  const { createNewUserToDB, loginUserFromDB, auth, isLoading } = useStore();

  // redirect the page to home if the user authorization is true
  console.log("auth", auth);

  useEffect(() => {
    if (auth) {
      redirect("/home");
    }
  }, [auth]);

  // inputs values stored inside a useRef
  const formRef = useRef<UserLoginProps>({
    userName: "",
    email: "",
    userPass: "",
  });

  // handle inputs text change
  const handleInputChange = (key: string, value: string) => {
    formRef.current = {
      ...formRef.current,
      [key]: value,
    };
  };

  // render text message based on logStatus
  const logStatusMsgRender = (login: string, register: string) => {
    return logStatus === "login" ? login : register;
  };

  // handle form onsubmit the data
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check which function should work based on logStatus
    return logStatus === "login"
      ? loginUserFromDB(formRef.current)
      : createNewUserToDB(formRef.current);
  };

  return (
    <>
      {isLoading && <LoadingItem />}
      <form id="loginForm" onSubmit={handleFormSubmit}>
        <label>{logStatusMsgRender("UserName or Email", "UserName")}</label>
        <input
          type="text"
          onChange={(e) => handleInputChange("userName", e.target.value)}
        />
        {logStatus === "register" && (
          <>
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => {
                handleInputChange("email", e.target.value);
              }}
            />
          </>
        )}
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => handleInputChange("userPass", e.target.value)}
        />
        <button disabled={isLoading ? true : false} id="loginBtn">
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
