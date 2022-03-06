import React, { useContext, useState, useEffect } from "react";

const AuthenticationContext = React.createContext();

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [currentUserEmail, setCurrentUserEmail] = useState();
  const value = {
    currentUserEmail,
    setCurrentUserEmail,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
