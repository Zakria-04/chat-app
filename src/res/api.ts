import axios from "axios";
import {
  UpdatedData,
  UpdateUserDataType,
  UserLoginProps,
} from "../../store/type";

const MainUrl = "https://chat-server-btsf.onrender.com";

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
  return appFetch(route, "POST", body);
};

const appFetch = async (
  route: string,
  method: "GET" | "POST" | "PATCH",
  body?: UserLoginProps | UpdateUserDataType | UpdatedData
) => {
  try {
    const response = await axios({
      method: method,
      url: MainUrl + route,
      data: method !== "GET" ? body : null,
    });

    return response.data;
  } catch (error) {
    console.error(`Error on fetching the route, ${route} `, error);
    return null;
  }
};

export {
  CheckIfServerLive,
  createNewUserFromAPI,
  loginUserFromAPI,
  updateUserData,
};
