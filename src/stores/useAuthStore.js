import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isSigningUp: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const user = await axiosInstance.get("/auth/check");
      set({ authUser: user.data });
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const user = await axiosInstance.post("/auth/login", data);
      set({ authUser: user.data });
      get().connectSocket();
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const user = await axiosInstance.post("/auth/signup", data);
      set({ authUser: user.data });
      get().connectSocket();
      toast.success("Account Created Successful");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  profile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const user = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: user.data.updatedUser });
      toast.success("Profile Updated Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io("https://chatapp-backend-v5jc.onrender.com", {
      query: {
        userId: authUser.id || authUser._id,
      },
    });

    socket.connect();

    set({ socket: socket });

    socket.on("onlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
