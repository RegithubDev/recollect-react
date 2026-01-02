import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const TOKEN_KEY = "userToken";
const ROLE_KEY = "userRole";

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * LOGIN
   * token → JWT from backend
   * role  → "customer" | "organisation" | "provider"
   */
  const login = async (token, role) => {
    try {
      if (!token || !role) {
        console.log("Login failed: token or role missing");
        return;
      }

      setUserToken(token);
      setUserRole(role);

      await AsyncStorage.multiSet([
        [TOKEN_KEY, token],
        [ROLE_KEY, role],
      ]);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  /**
   * LOGOUT
   */
  const logout = async () => {
    try {
      setUserToken(null);
      setUserRole(null);

      await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY]);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  /**
   * CHECK LOGIN STATUS (APP START)
   */
  const checkLoginStatus = async () => {
    try {
      const [[, storedToken], [, storedRole]] =
        await AsyncStorage.multiGet([TOKEN_KEY, ROLE_KEY]);

      if (storedToken && storedRole) {
        setUserToken(storedToken);
        setUserRole(storedRole);
      } else {
        setUserToken(null);
        setUserRole(null);
      }
    } catch (error) {
      console.log("Check login error:", error);
    } finally {
      setIsLoading(false);
    }
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
