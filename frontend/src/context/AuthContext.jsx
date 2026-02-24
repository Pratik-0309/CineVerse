import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import {toast} from "react-hot-toast"

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in authProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);


  const checkAuthStatus = async () => {
    try {
      const res = await axiosInstance.get("/api/user/profile");
      if (res.data.success) {
        setUser(res.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(`Auth check failed:`, error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/user/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally{
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const updateUser = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(
        "/api/user/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) {
        setUser(res.data.user);
        return { success: true };
      }
    } catch (error) {
      console.error("Update profile failed:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isLoggedIn,
    login,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
