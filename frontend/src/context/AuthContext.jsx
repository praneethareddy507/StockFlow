import { createContext, useContext, useState } from "react";
import {
  login as loginUser,
  signup as signupUser,
  logout as logoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("access_token")
  );

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem("access_token", data.access_token);
    setToken(data.access_token);

    return data;
  };

  const signup = async (userData) => {
    return await signupUser(userData);
  };

  const logout = () => {
    logoutUser();
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token),
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};