import React, { useEffect, useRef, useState } from "react";
import "./styles/EditForm.css";
import { useStore } from "../../store/store";
import { UpdatedData, UpdateUserDataType } from "../../store/type";

const EditForm = () => {
  const { user, handleUpdatedForm } = useStore();

  // new updated inputs values
  const [updateUserForm, setUpdateUserForm] = useState<UpdateUserDataType>({
    userName: user?.userName || "",
    userPass: "",
    email: user?.email || "",
  });

  // hold of the current password
  const password = useRef("");

  const handleUpdateForm = (key: string, value: string) => {
    setUpdateUserForm((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setUpdateUserForm({
        userName: user.userName || "",
        email: user.email || "",
        userPass: "",
      });
    }
  }, [user]);

  const handleUpdatedFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const blog: UpdatedData = {
      _id: user?._id || null,
      password: password.current,
      updatedData: updateUserForm,
    };

    console.log(blog);

    return await handleUpdatedForm(blog);
  };

  return (
    <div>
      <form id="profile-form" onSubmit={handleUpdatedFormSubmit}>
        <label>User</label>
        <input
          type="text"
          value={updateUserForm.userName}
          onChange={(e) => handleUpdateForm("userName", e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={updateUserForm.email}
          onChange={(e) => handleUpdateForm("email", e.target.value)}
        />
        <label>New Password</label>
        <input
          type="password"
          onChange={(e) => handleUpdateForm("userPass", e.target.value)}
          placeholder="enter your new password if needed"
        />
        <label>password</label>
        <input
          type="password"
          placeholder="enter your current password for confirmation"
          onChange={(e) => (password.current = e.target.value)}
          required
        />
        <button>save</button>
      </form>
    </div>
  );
};

export default EditForm;
