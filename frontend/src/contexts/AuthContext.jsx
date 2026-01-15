import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'; // <--- The bridge file we made earlier

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// ✅ Change AuthProvider to DEFAULT export

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const signup = async (name, email, password, role) => {
   
    const data = await authService.register({ name, email, password, role });
    // Update State
    setCurrentUser(data); 
    return data;
  };


  const login = async (email, password , role ) => {
    const data = await authService.login({ email, password, role});
    setCurrentUser(data);
    return data;
  };

  
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signup,
    login,
    isAuthenticated: !!currentUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}