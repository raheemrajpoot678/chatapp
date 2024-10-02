import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || ""
  );

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
