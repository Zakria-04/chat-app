import axios from "axios";
import {
  UpdatedData,
  UpdateProfileImgType,
  UpdateUserDataType,
  UserLoginProps,
} from "../../store/type";
import { MainDomain } from "./domains";

const CheckIfServerLive = () => {
  const route = "/live";
  return appFetch(route, "GET");
};

const createNewUserFromAPI = (body: UserLoginProps) => {
  const route = "/create_new_user";
  return appFetch(route, "POST", body);
};

const loginUserFromAPI = (body: UserLoginProps) => {
  const route = "/login_user";
  return appFetch(route, "POST", body);
};

const updateUserData = (body: UpdatedData) => {
  const route = "/update_profile";
  return appFetch(route, "PATCH", body);
};

const getProfileImageFromDB = () => {
  const route = "/get_profile_images";
  return appFetch(route, "GET");
};

const updateUserProfileImage = (body: UpdateProfileImgType) => {
  const route = "/update_profile_img";
  return appFetch(route, "PATCH", body);
};

const appFetch = async (
  route: string,
  method: "GET" | "POST" | "PATCH",
  body?:
    | UserLoginProps
    | UpdateUserDataType
    | UpdatedData
    | UpdateProfileImgType
) => {
  try {
    const response = await axios({
      method: method,
      url: MainDomain + route,
      data: method !== "GET" ? body : null,
    });

    return response.data;
  } catch (error) {
    console.error(`Error on fetching the route, ${route}`, error);
    return null;
  }
};

export {
  CheckIfServerLive,
  createNewUserFromAPI,
  loginUserFromAPI,
  updateUserData,
  getProfileImageFromDB,
  updateUserProfileImage,
};
