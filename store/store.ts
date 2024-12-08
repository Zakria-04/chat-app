import {
  CheckIfServerLive,
  createNewUserChat,
  createNewUserFromAPI,
  getProfileImageFromDB,
  loginUserFromAPI,
  updateUserData,
  updateUserProfileImage,
} from "@/res/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  UpdatedData,
  UpdateUserDataType,
  UserDataType,
  UserLoginProps,
} from "./type";
import { updateStatus } from "@/res/socket";
import { produce } from "immer";

type StoreData = {
  //* store
  error: null | string;
  isLoading: boolean;
  live: boolean;
  avatar: Array<string>;

  //* user
  auth: boolean;
  user: null | UserDataType;
  chats: any;

  //* functions
  checkIfServerLiveFromAPI: () => Promise<void>;
  createNewUserToDB: (blog: UserLoginProps) => Promise<void>;
  loginUserFromDB: (blog: UserLoginProps) => Promise<void>;
  handleUpdatedForm: (blog: UpdatedData) => Promise<void>;
  updateUserStatus: (
    id: string | undefined,
    status: string | undefined
  ) => void;
  getProfileAvatars: () => void;
  updateAvatar: (avatar: { _id: string; profileImg: string }) => void;
  signoutUser: () => void;
  userChats: (chats: any) => void;
  createChat: (body: any) => Promise<void>;
};

export const useStore = create<StoreData>()(
  persist(
    (set) => ({
      //* store
      isLoading: false,
      error: null,
      live: false,
      avatar: [],

      //* user
      auth: false,
      user: null,
      chats: [],

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

      // handle updated form
      handleUpdatedForm: async (body) => {
        set({ isLoading: true, error: null });
        try {
          const response = await updateUserData(body);
          set({ isLoading: false, user: response.user });
          console.log("user has been updated successfully");
        } catch (error) {
          set({ isLoading: false, error: "error on update user data" });
        }
      },

      // handle user updated status
      updateUserStatus: (id, status) => {
        set(
          produce((state: StoreData) => {
            if (state.user) {
              updateStatus(id, status);
              state.user.status = status as string;
            }
          })
        );
      },

      // fetch profile images from server
      getProfileAvatars: async () => {
        set({ error: null });
        try {
          const data = await getProfileImageFromDB();
          set({ avatar: data });
        } catch (error) {
          set({ error: "error on update user data" });
          console.error("error ", error);
        }
      },

      // change avatar image
      updateAvatar: async (body) => {
        set({ isLoading: true, error: null });
        try {
          const response = await updateUserProfileImage(body);
          set({ isLoading: false, error: null, user: response.response });
          console.log("user profile image has been updated successfully");
        } catch (error) {
          set({ isLoading: false, error: "password is not valid" });
          // console.error("error", error);
        }
      },

      // sign out the user
      signoutUser: () => {
        set({ user: null, auth: false, error: null });
      },

      // store user chats
      userChats: (chats) => {
        set({ chats });
      },

      // create new user chat
      createChat: async (body) => {
        try {
          const response = await createNewUserChat(body);
        } catch (error) {}
      },
    }),
    {
      name: "chat_user_storage",
      storage: createJSONStorage(() => localStorage),
      partialize(state) {
        // what not to show on local storage
        const { avatar, ...rest } = state;
        return rest;
      },
    }
  )
);
