import axios from "axios";
import { UserLoginProps } from "../../store/type";

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

const appFetch = async (
  route: string,
  method: "GET" | "POST",
  body?: UserLoginProps
) => {
  try {
    const response = await axios({
      method: method,
      url: MainUrl + route,
      data: method === "POST" ? body : null,
    });

    return response.data;
  } catch (error) {
    console.error(`Error on fetching the route, ${route} `, error);
    return null;
  }
};

export { CheckIfServerLive, createNewUserFromAPI, loginUserFromAPI };
