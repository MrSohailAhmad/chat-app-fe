import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
}

interface ApiError {
  message: string;
}

export interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  socket: any;
  onLineUser: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
  checkAuth: () => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onLineUser: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", { data });
      set({ authUser: res.data });
      toast.success("Account created successfully");
      //   get().connectSocket();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const apiError = error.response.data as ApiError;
        toast.error(apiError.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.data });
      toast.success("Logged in successfully");

      //   get().connectSocket();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const apiError = error.response.data as ApiError;
        toast.error(apiError.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const apiError = error.response.data as ApiError;
        toast.error(apiError.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const apiError = error.response.data as ApiError;
        toast.error(apiError.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: async () => {
    console.log("try to connect");
    const { authUser } = get();
    console.log("get().socket");
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser?.data?._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUser", (userIds) => {
      set({ onLineUser: userIds });
    });
  },
  disconnectSocket: async () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
