// props
export type UserLoginProps = {
  userName: string;
  userPass: string;
  email?: string;
};

// types
export type UserDataType = {
  userName: string;
  userPass: string;
  email: string;
  __v: number;
  _id: string;
  status: string;
  profileImg: string;
};

export type UpdateUserDataType = {
  userName: string;
  userPass: string;
  email: string;
};

export type UpdatedData = {
  _id: string | null;
  password: string;
  updatedData: UpdateUserDataType;
};

export type UpdateProfileImgType = {
  _id: string;
  profileImg: string;
};
