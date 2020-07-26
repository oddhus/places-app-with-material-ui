import React, { useState, useCallback, createContext } from 'react';

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsloggedin] = useState(false);
 
    const login = useCallback(() => {
        setIsloggedin(true);
    }, []);
 
    const logout = useCallback(() => {
        setIsloggedin(false);
    }, []);

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
} 