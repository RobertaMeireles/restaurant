import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user");

    const hasUser = JSON.parse(userToken)

    setUser(hasUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};