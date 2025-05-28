import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import { useAuthStore } from "./useAuthStore";

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
}

export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiError {
  message: string;
}

export interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  subscribeMessage: () => void;
  unSubscribeMessage: () => void;
  getUsers: () => void;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: { content: string }) => Promise<void>;
  setSelectedUser: (selectedUser: User) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data.data });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const apiError = error.response.data as ApiError;
        toast.error(apiError.message);
      } else {
        toast.error("Failed to fetch users");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const apiError = error.response.data as ApiError;
        toast.error(apiError.message);
      } else {
        toast.error("Failed to fetch messages");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const apiError = error.response.data as ApiError;
        toast.error(apiError.message);
      } else {
        toast.error("Failed to send message");
      }
    }
  },

  subscribeMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage: any) => {
      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (isMessageFromSelectedUser) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unSubscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
