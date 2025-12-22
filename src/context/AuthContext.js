import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null); // 👈 NEW
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token, role) => {
    try {
      setUserToken(token);
      setUserRole(role);
      await AsyncStorage.multiSet([
        ["userToken", token],
        ["userRole", role],
      ]);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      setUserToken(null);
      setUserRole(null);
      await AsyncStorage.multiRemove(["userToken", "userRole"]);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const [[, token], [, role]] = await AsyncStorage.multiGet([
        "userToken",
        "userRole",
      ]);

      if (token && role) {
        setUserToken(token);
        setUserRole(role);
      }
    } catch (error) {
      console.log("Check login error:", error);
    }
    setIsLoading(false);
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
        userRole,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
