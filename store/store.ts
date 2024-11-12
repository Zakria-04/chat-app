import {
  CheckIfServerLive,
  createNewUserFromAPI,
  loginUserFromAPI,
} from "@/res/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserDataType, UserLoginProps } from "./type";

type StoreData = {
  //* store
  error: null | string;
  isLoading: boolean;
  live: boolean;

  //* user
  auth: boolean;
  user: null | UserDataType;

  //* functions
  checkIfServerLiveFromAPI: () => Promise<void>;
  createNewUserToDB: (blog: UserLoginProps) => Promise<void>;
  loginUserFromDB: (blog: UserLoginProps) => Promise<void>;
};

export const useStore = create<StoreData>()(
  persist(
    (set) => ({
      //* store
      isLoading: false,
      error: null,
      live: false,

      //* user
      auth: false,
      user: null,

      //* functions

      // check if the server is live to start the app
      checkIfServerLiveFromAPI: async () => {
        set({ isLoading: true, error: null, live: false });
        try {
          const response = await CheckIfServerLive();
          set({ isLoading: false, live: true });
          return response;
        } catch (error) {
          set({
            error: "error with server connection",
            isLoading: false,
          });
          console.error("errorMessage ", error);
        }
      },

      // create new user and save it to the db
      createNewUserToDB: async (blog) => {
        set({ isLoading: true, auth: false, error: null });
        try {
          const data = await createNewUserFromAPI(blog);
          set({ isLoading: false, auth: true, user: data.user });
          console.log("new user created successfully");
        } catch (error) {
          set({ isLoading: false, error: "error while creating new user" });
          console.error("errorMessage", error);
        }
      },

      // login user from db
      loginUserFromDB: async (blog) => {
        set({ isLoading: true, error: null, auth: false });
        try {
          const data = await loginUserFromAPI(blog);
          set({ isLoading: false, auth: true, user: data.user });
          console.log("user logged in successfully");
        } catch (error) {
          set({ isLoading: false, error: "error on login user" });
          console.error("errorMessage", error);
        }
      },
    }),
    {
      name: "chat_user_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
