import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //  Save token and mark user as logged-in
  const login = async (token) => {
    try {
      setUserToken(token);
      await AsyncStorage.setItem("userToken", token);
    } catch (error) {
      console.log("Error saving token:", error);
    }
  };

  // 🔹 Remove token and logout
  const logout = async () => {
    try {
      setUserToken(null);
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.log("Error removing token:", error);
    }
  };

  //  Check login state on app start
  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) {
        setUserToken(storedToken); // User is already logged-in
      }
    } catch (error) {
      console.log("Error reading token:", error);
    }
    setIsLoading(false); // Done loading
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userToken,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
